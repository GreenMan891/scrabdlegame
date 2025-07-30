"use client";

import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Tile from './Tile';
import GameOverModal from './GameOverModal';
import { initializeDictionary, dictionary, WordData } from '@/data/dictionaryService';
import ScoreAnimator from './ScoreAnimator';
import { BasePointRules, AnyRule, skillMultiplierRules, connectorRules, WordContext, BoardContext, ConnectionContext, DescriptionContext, RuleApplicationResult } from '@/data/rules';
import { PlayerStatsContext, PlayerStats, SavedDailyState } from '@/context/PlayerStatsContext';
import PreGameModal from './PreGameModal';
import Tooltip from '../ui/Tooltip';
import { allThemes, ThemeData, allTypes, TypeData } from '@/data/themesTypes';

function mulberry32(seed: number) {
    return function () {
        let t = seed += 0x6D2B79F4;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4284967296;
    }
}
//Things left to do:
//fix word count system so it doesnt work if two valid words are next to each other.
//work on the points system
//make a ton more rules

interface TileData {
    id: number;
    letter: string;
    value: number;
}

export interface PlacedTile extends TileData {
    gridX: number;
    gridY: number;
    isFound: boolean;
    appliedRuleIds?: string[]; // IDs of rules that apply to this tile
}

interface DraggingTile {
    tile: TileData;
    origin: { type: 'grid'; x: number; y: number } | { type: 'hand'; index: number };

    offsetX: number;
    offsetY: number;
    size: number;
}


const GridWidth = 12;
const GridHeight = 12;
const HandSlots = 28;

// how many of each tile are in the bag
const TileDistribution = {
    A: 13, B: 3, C: 3, D: 6, E: 18, F: 3, G: 4, H: 3, I: 12, J: 2, K: 2, L: 5, M: 3,
    N: 8, O: 11, P: 3, Q: 2, R: 9, S: 6, T: 9, U: 6, V: 3, W: 3, X: 2, Y: 3, Z: 2
}

const TileValues: { [key: string]: number } = {
    A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3,
    F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
}

interface GameProps {
    gameContentWrapperRef?: React.RefObject<HTMLDivElement | null>;
}

function getEventPageCoordinates(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
    // For touch events, use the pageX/pageY from the touch object
    if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].pageX, y: e.touches[0].pageY };
    }
    if ('changedTouches' in e && e.changedTouches.length > 0) {
        return { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
    }
    // For mouse events, use pageX/pageY directly
    if ('pageX' in e) {
        return { x: e.pageX, y: e.pageY };
    }
    return null;
}

export default function Game() {

    const context = useContext(PlayerStatsContext);
    const playerStats = context?.stats;
    const updateStats = context?.updateStats;
    const saveDailyGameState = context?.saveDailyGameState;

    const [grid, setGrid] = useState<(PlacedTile | null)[][]>([]);
    const [hand, setHand] = useState<(TileData | null)[]>([]);
    const [tileBag, setTileBag] = useState<TileData[]>([]);
    const [basePoints, setBasePoints] = useState(0);
    const [totalLengths, setTotalLengths] = useState(0);
    const [bonusPoints, setBonusPoints] = useState(0);
    const [dailyRules, setDailyRules] = useState<AnyRule[]>([]);
    const [metRuleCounts, setMetRuleCounts] = useState<Map<string, number>>(new Map());
    const [finalScore, setFinalScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60 * 5)
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
    const [savedDailyState, setSavedDailyState] = useState<SavedDailyState | null>(null);
    //const [dictionary, setDictionary] = useState<Map<string, WordData> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [gameStatus, setGameStatus] = useState<'pregame' | 'playing' | 'scoring' | 'over'>('pregame');
    const [liveLetterPoints, setLiveLetterPoints] = useState(0);
    const [liveLengthMultiplier, setLiveLengthMultiplier] = useState(1.0);

    // Animation-specific state
    const [isScoring, setIsScoring] = useState(false); // To control the animation loop
    const [scoringQueue, setScoringQueue] = useState<any[]>([]);
    const [currentlyScoringWord, setCurrentlyScoringWord] = useState<string | null>(null);
    const [currentCalculation, setCurrentCalculation] = useState("");
    const [animatedTotalScore, setAnimatedTotalScore] = useState(0);

    const [draggingTile, setDraggingTile] = useState<DraggingTile | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const draggingTileRef = useRef<DraggingTile | null>(null);

    const [bonusLetterData, setBonusLetterData] = useState<{ letter: string; value: number } | null>(null);

    const [tileSize, setTileSize] = useState(50);

    const gameBoardRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = useRef<HTMLDivElement>(null);

    const isInitialized = useRef(false);
    const hasSubmittedScore = useRef(false);
    const finalWordMapRef = useRef<Map<string, PlacedTile[]>>(new Map());

    const wordDetailsMapRef = useRef(new Map());

    const [themeOfTheDay, setThemeOfTheDay] = useState<ThemeData | null>(null);
    const [typeOfTheDay, setTypeOfTheDay] = useState<TypeData | null>(null);
    // const wordDetailsMapRef = useRef<Map<string, {
    //     baseScore: number;
    //     lengthMultiplier: number;
    //     skillMultiplier: number;
    //     tiles: PlacedTile[];
    // }>>(new Map());

    const [scoringBaseScore, setScoringBaseScore] = useState<number>(0);
    const [scoringMultScore, setScoringMultScore] = useState<number>(1);

    // console.log('[RENDER] Component rendering.', {
    //     isDragging: !!draggingTile,
    //     dragPosition: dragPosition
    // });

    // useEffect(() => {
    //     const loadApp = async () => {
    //         await initializeDictionary();
    //         // After the dictionary is loaded, we can proceed.
    //         setIsLoading(false);
    //     };
    //     loadApp();
    // }, []);

    useEffect(() => {
        const loadAndInitialize = async () => {
            console.log('[INIT] Starting application load...');
            await initializeDictionary();
            console.log('[INIT] Dictionary initialized.');
            //setIsLoading(false);

            const savedJSON = localStorage.getItem('dailyWordGameState');
            const todayStr = new Date().toISOString().slice(0, 10);
            let loadedState: SavedDailyState | null = null;

            if (savedJSON) {
                const data = JSON.parse(savedJSON);
                if (data.saveDate === todayStr) {
                    loadedState = data.gameState;
                    console.log('[INIT] Found valid save data for today.');
                    setSavedDailyState(loadedState);
                }
            }

            // --- THIS IS THE CORE CHANGE ---
            // The initializeGame function now TAKES the loaded state and RETURNS the initial state.
            const initialState = initializeGame(loadedState);

            // Now we set all the state at once.
            setGrid(initialState.grid);
            setHand(initialState.hand);
            setTileBag(initialState.tileBag);
            setBasePoints(initialState.basePoints);
            setTotalLengths(initialState.totalLengths);
            setFinalScore(initialState.finalScore);
            setBonusPoints(initialState.bonusPoints);
            setDailyRules(initialState.dailyRules); // This will now be correct
            setBonusLetterData(initialState.bonusLetterData);
            setMetRuleCounts(initialState.metRuleCounts);
            setTimeLeft(initialState.timeLeft);
            setGameStatus(initialState.isGameOver ? 'over' : 'pregame');
            setThemeOfTheDay(initialState.themeOfTheDay);
            setTypeOfTheDay(initialState.typeOfTheDay);

            isInitialized.current = true;
            setIsLoading(false);
            console.log('[INIT] Initialization complete.');
        };

        loadAndInitialize();
    }, []);

    const initializeGame = (savedState: SavedDailyState | null) => {
        const today = new Date();
        const seed = today.setHours(0, 0, 0, 0);
        const seededRandom = mulberry32(seed);
        if (savedState) {
            console.log('[INIT HELPER] Hydrating from saved state.');
            const allPossibleDailyRules: AnyRule[] = [...BasePointRules, ...skillMultiplierRules, ...connectorRules];

            // 2. Rebuild the dailyRules array by finding the full rule object for each saved ID.
            const hydratedRules = (savedState.dailyRuleIds || [])
                .map(ruleId => allPossibleDailyRules.find(r => r.id === ruleId))
                .filter((rule): rule is AnyRule => !!rule); // This filters out any undefined results safely

            if (savedState.themeOfTheDay) {
                setThemeOfTheDay(savedState.themeOfTheDay);
            }
            if (savedState.typeOfTheDay) {
                setTypeOfTheDay(savedState.typeOfTheDay);
            }
            // const validTilesInHand = savedState?.hand.filter(t => t !== null);
            // console.log('[INIT HELPER] Valid tiles in hand:', validTilesInHand.length);
            // let bonusLetterData: { letter: string; value: number } | null = null;
            // if (validTilesInHand.length > 0) {
            //     const randomTile = validTilesInHand[Math.floor(seededRandom() * validTilesInHand.length)];
            //     bonusLetterData = { letter: randomTile.letter, value: randomTile.value };
            // }
            return {
                ...savedState,
                dailyRules: hydratedRules,
                metRuleCounts: new Map(savedState.metRuleCounts || []),
            };

        }



        // --- Path 2: No saved state, create a fresh game state object ---
        console.log('[INIT HELPER] Creating fresh game state.');


        const bag: TileData[] = [];
        let idCounter = 0;
        for (const [letter, count] of Object.entries(TileDistribution)) {
            for (let i = 0; i < count; i++) {
                bag.push({ id: idCounter++, letter, value: TileValues[letter] });
            }
        }
        //shuffle bag
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(seededRandom() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }

        const initialHand = new Array(HandSlots).fill(null);
        for (let i = 0; i < HandSlots; i++) {
            if (bag.length > 0) {
                initialHand[i] = bag.pop()!;
            }
        }

        const randomThemeIndex = Math.floor(seededRandom() * allThemes.length);
        const dailyTheme = allThemes[randomThemeIndex];
        setThemeOfTheDay(dailyTheme);

        const randomTypeIndex = Math.floor(seededRandom() * allTypes.length);
        const dailyType = allTypes[randomTypeIndex];
        setTypeOfTheDay(dailyType);

        const validTilesInHand = initialHand.filter(t => t !== null);
        console.log('[INIT HELPER] Valid tiles in hand2:', validTilesInHand.length);
        let bonusLetterData: { letter: string; value: number } | null = null;
        if (validTilesInHand.length > 0) {
            const randomTile = validTilesInHand[Math.floor(seededRandom() * validTilesInHand.length)];
            bonusLetterData = { letter: randomTile.letter, value: randomTile.value };
        }
        setHand(initialHand);
        setTileBag(bag);

        // Always select one rule from each category: base, skill, connector
        // Pick a base rule, but if it's "base_ends_in_s", ensure there's an "S" in the hand
        let baseRule: AnyRule;
        let attempts = 0;
        do {
            baseRule = BasePointRules[Math.floor(seededRandom() * BasePointRules.length)];
            // Now that initialHand is already created, just check it directly
            const hasS = initialHand.some(tile => tile && tile.letter === 'S');
            if (baseRule.id !== 'base_ends_in_s') break;
            if (hasS) break;
            attempts++;
        } while (attempts < 10);
        const skillRule = skillMultiplierRules[Math.floor(seededRandom() * skillMultiplierRules.length)];
        const connectorRule = connectorRules[Math.floor(seededRandom() * connectorRules.length)];

        const selectedRules = [baseRule, skillRule, connectorRule];

        console.log('[INIT HELPER] Selected daily rules:', selectedRules.map(r => r.id));

        setDailyRules(selectedRules);

        //create grid
        const emptyGrid = Array.from({ length: GridHeight }, () =>
            Array(GridWidth).fill(null)
        );
        setGrid(emptyGrid);

        // Return a complete initial state object
        return {
            grid: emptyGrid,
            hand: initialHand,
            tileBag: bag,
            basePoints: 0,
            totalLengths: 0,
            finalScore: 0,
            bonusPoints: 0,
            dailyRules: selectedRules,
            metRuleCounts: new Map<string, number>(),
            timeLeft: 0,
            isGameOver: false,
            bonusLetterData: bonusLetterData,
            dailyRuleIds: selectedRules.map(r => r.id),
            themeOfTheDay: dailyTheme,
            typeOfTheDay: dailyType,
        };
    };

    useEffect(() => {
        draggingTileRef.current = draggingTile;
    }, [draggingTile]);

    const handleStartGame = () => {
        // This function is called by the "Play" or "Continue" button.
        setGameStatus('playing');
    };

    useEffect(() => {
        // We only want this effect to run when the game is over.
        if (gameStatus !== 'over') return;

        // Use the ref to ensure we only ever submit the score ONCE.
        if (hasSubmittedScore.current) {
            console.log("Score has already been submitted, skipping.");
            return;
        }

        const submitScores = async () => {
            // Check for necessary data before proceeding
            if (!playerStats || !updateStats) {
                console.error("Cannot submit score: playerStats or update function is missing.");
                return;
            }

            console.log("Game over! Submitting scores to server...");

            // Mark as submitted immediately to prevent race conditions.
            hasSubmittedScore.current = true;
            //ISSUE WITH LOADING IN THINGS. WHEN WE LOAD THE BONUS LETTER RULE, THE LETTER IS SET INITIALLY BUT IS FORGOTTEN WHEN WE RELOAD THE GAME
            //ALSO THE GAME DIDNT RESET THE NEXT DAY

            try {
                const todayStr = new Date().toISOString().slice(0, 10);

                // Update local stats for immediate UI feedback
                const newStats: PlayerStats = { ...playerStats };
                let isNewHighScore = false;
                if (finalScore > newStats.highScore) {
                    newStats.highScore = finalScore;
                    isNewHighScore = true;
                }
                newStats.lastGame = { date: todayStr, score: finalScore };
                updateStats(newStats);

                // Submit daily score
                await fetch('/api/submit-score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        playerId: playerStats.username,
                        score: finalScore,
                        timeTaken: timeLeft,
                    }),
                });

                // Submit new high score if applicable
                if (isNewHighScore) {
                    await fetch('/api/update-highscore', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            playerId: playerStats.username,
                            newHighScore: finalScore,
                        }),
                    });
                }
                if (setIsScoreSubmitted) {
                    setIsScoreSubmitted(true);
                }
                console.log("Scores successfully submitted and state updated.");

            } catch (error) {
                console.error("Failed to submit scores to server:", error);
                // Optional: reset the flag if the API call fails, allowing a retry?
                // hasSubmittedScore.current = false;
            }
        };

        submitScores();

    }, [gameStatus, playerStats, finalScore, timeLeft, updateStats]);

    useEffect(() => {
        const container = gridContainerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;

                // On large screens (lg breakpoint, 1024px), we are in a flex-row layout.
                // The grid's width is the primary constraint.
                if (window.innerWidth >= 1024) {
                    setTileSize(width / GridWidth);
                }
                // On smaller screens, we are in a flex-col layout.
                // We must ensure the grid fits both horizontally AND vertically.
                else {
                    const tileSizeBasedOnWidth = width / GridWidth;
                    const tileSizeBasedOnHeight = height / GridHeight;
                    setTileSize(Math.min(tileSizeBasedOnWidth, tileSizeBasedOnHeight));
                }
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!isInitialized.current || !saveDailyGameState) return;

        const gameState: SavedDailyState = {
            grid, hand, tileBag, basePoints, totalLengths, finalScore,
            bonusPoints,
            dailyRuleIds: dailyRules.map(rule => rule.id), // This will now have data
            metRuleCounts: Array.from(metRuleCounts.entries()),
            timeLeft, bonusLetterData: bonusLetterData,
            isGameOver: gameStatus === 'over', themeOfTheDay: themeOfTheDay, typeOfTheDay: typeOfTheDay,
        };

        saveDailyGameState(gameState);
    }, [
        grid, hand, tileBag, timeLeft, gameStatus, finalScore, saveDailyGameState,
        basePoints, bonusPoints, dailyRules, metRuleCounts, totalLengths, themeOfTheDay, typeOfTheDay
    ]);


    useEffect(() => {
        // Only run the timer if the status is 'playing'.
        if (gameStatus !== 'playing') {
            return;
        }

        // Set up the interval that runs every second.
        const timerId = setInterval(() => {
            // Use the functional update form to increment the time.
            setTimeLeft(prevTime => prevTime + 1);
        }, 1000);

        // The cleanup function will clear the interval when the component
        // unmounts or when gameStatus changes (e.g., to 'over').
        return () => {
            clearInterval(timerId);
        };
    }, [gameStatus]);

    const getLengthMultiplier = (length: number): number => {
        if (length >= 8) return 3.0;
        if (length === 7) return 2.5;
        if (length === 6) return 2.0;
        if (length === 5) return 1.75;
        if (length === 4) return 1.5;
        if (length === 3) return 1.25;
        return 1.0; // 4 or fewer letters get no multiplier bonus
    };

    const calculateLiveScore = useCallback((currentGrid: (PlacedTile | null)[][]) => {
        // This function should not run if the dictionary isn't ready or if the game isn't in 'playing' state.
        if (!dictionary || gameStatus !== 'playing') return;

        const wordToTilesMap = new Map<string, PlacedTile[]>();

        // We use the same checkLine helper to find all valid words.
        const checkLine = (line: (PlacedTile | null)[]) => {
            let currentWord = "";
            let currentTiles: PlacedTile[] = [];
            const processCurrentWord = () => {
                if (currentWord.length > 2 && dictionary.has(currentWord.toLowerCase())) {
                    wordToTilesMap.set(currentWord, [...currentTiles]);
                }
                currentWord = "";
                currentTiles = [];
            };
            for (const tile of line) {
                if (tile) {
                    currentWord += tile.letter;
                    currentTiles.push(tile);
                } else {
                    processCurrentWord();
                }
            }
            processCurrentWord();
        };

        for (let y = 0; y < GridHeight; y++) { checkLine(currentGrid[y]); }
        for (let x = 0; x < GridWidth; x++) { checkLine(currentGrid.map(row => row[x])); }

        // --- Live Calculation Logic ---
        let currentLetterPoints = 0;
        let longestWordLength = 0;

        // Iterate through the found words to calculate the live score components.
        for (const [word, tiles] of wordToTilesMap.entries()) {
            // Sum up the letter points of all valid words.
            currentLetterPoints += tiles.reduce((sum, tile) => sum + tile.value, 0);

            // Keep track of the length of the single longest word found.
            if (word.length > longestWordLength) {
                longestWordLength = word.length;
            }
        }

        // Update the state with the new live values.
        setLiveLetterPoints(currentLetterPoints);
        setLiveLengthMultiplier(getLengthMultiplier(longestWordLength));

    }, [dictionary, gameStatus]);

    const checkForWords = useCallback((currentGrid: (PlacedTile | null)[][]) => {
        if (!dictionary) return;

        // Run the live score calculation for the UI
        calculateLiveScore(currentGrid);

        // VVVV INITIALIZE THE MAP HERE VVVV
        const allValidTilesMap = new Map<number, PlacedTile>();
        const wordToTilesMap = new Map<string, PlacedTile[]>();

        const checkLine = (line: (PlacedTile | null)[]) => {
            let currentWord = "";
            let currentTiles: PlacedTile[] = [];
            const processCurrentWord = () => {
                if (currentWord.length > 2 && dictionary.has(currentWord.toLowerCase())) {
                    wordToTilesMap.set(currentWord, [...currentTiles]);
                    currentTiles.forEach(tile => allValidTilesMap.set(tile.id, tile));
                }
                currentWord = "";
                currentTiles = [];
            };
            for (const tile of line) {
                if (tile) {
                    currentWord += tile.letter;
                    currentTiles.push(tile);
                } else {
                    processCurrentWord();
                }
            }
            processCurrentWord();
        };

        for (let y = 0; y < GridHeight; y++) { checkLine(currentGrid[y]); }
        for (let x = 0; x < GridWidth; x++) { checkLine(currentGrid.map(row => row[x])); }

        // --- Scoring Engine Initialization ---
        const wordDetailsMap = new Map<string, {
            baseScore: number;
            lengthMultiplier: number;
            skillMultiplier: number;
            tiles: PlacedTile[];
        }>();
        const tileToRuleIdsMap = new Map<number, Set<string>>();
        const newMetRuleCounts = new Map<string, number>();

        // --- Pass 1: Calculate PER-WORD bonuses and multipliers ---
        for (const [word, tiles] of wordToTilesMap.entries()) {
            const letterScore = tiles.reduce((sum, tile) => sum + tile.value, 0);
            const wordContext: WordContext = { word, tiles, bonusLetterData: bonusLetterData || undefined, themeOfTheDay, typeOfTheDay };

            let perWordFlatBonus = 0;
            let skillMultiplierPool = 1.0;

            dailyRules.forEach(rule => {
                let result: RuleApplicationResult | undefined;
                // Apply 'word' scoped rules
                if (rule.type === 'base' && rule.scope === 'word') {
                    result = rule.apply(wordContext);
                    perWordFlatBonus += result.bonus;
                } else if (rule.type === 'skill') { // Skill rules are always per-word
                    result = rule.apply(wordContext);
                    skillMultiplierPool += result.bonus;
                }

                if (result && result.achievementCount > 0) {
                    const currentCount = newMetRuleCounts.get(rule.id) || 0;
                    newMetRuleCounts.set(rule.id, currentCount + result.achievementCount);
                    result.contributingTileIds.forEach(id => {
                        if (!tileToRuleIdsMap.has(id)) tileToRuleIdsMap.set(id, new Set());
                        tileToRuleIdsMap.get(id)!.add(rule.id);
                    });
                }
            });

            const lengthMultiplier = getLengthMultiplier(word.length);

            // Store the details WITHOUT board-wide bonuses yet.
            wordDetailsMap.set(word, {
                baseScore: letterScore + perWordFlatBonus,
                lengthMultiplier: lengthMultiplier,
                skillMultiplier: skillMultiplierPool,
                tiles: tiles,
            });

            // Update display totals
            // (Note: This will be adjusted later)
        }

        // --- Pass 2: Calculate BOARD-WIDE flat bonuses ---
        const boardContext: BoardContext = {
            wordToTilesMap,
            handIsEmpty: hand.every(tile => tile === null),
        };
        let totalBoardWideBonus = 0;
        dailyRules.forEach(rule => {
            if (rule.type === 'base' && rule.scope === 'board') {
                const result = rule.apply(boardContext);
                totalBoardWideBonus += result.bonus;

                // Update counts and highlights for board-wide rules
                if (result.achievementCount > 0) {
                    const currentCount = newMetRuleCounts.get(rule.id) || 0;
                    newMetRuleCounts.set(rule.id, currentCount + result.achievementCount);
                    result.contributingTileIds.forEach(id => {
                        if (!tileToRuleIdsMap.has(id)) tileToRuleIdsMap.set(id, new Set());
                        tileToRuleIdsMap.get(id)!.add(rule.id);
                    });
                }
            }
        });

        // --- Pass 3: Distribute the board-wide bonus and find COMBO groups ---
        // For simplicity, we'll distribute the board-wide bonus evenly among all words.
        const wordCount = wordToTilesMap.size > 0 ? wordToTilesMap.size : 1;
        const bonusPerWord = totalBoardWideBonus / wordCount;

        // Add the distributed bonus to each word's base score
        for (const [word, details] of wordDetailsMap.entries()) {
            details.baseScore += bonusPerWord;
        }
        const connectionContext: ConnectionContext = {
            wordToTilesMap,
            dictionary,
            dailyRules,
            wordScores: new Map(), // This is vestigial, can be removed from the type later
        };
        const activeConnectorRules = dailyRules.filter(r => r.type === 'connector');
        const allConnectedGroups = groupConnectedWords(wordToTilesMap, activeConnectorRules, connectionContext);
        const wordsInACombo = new Set(allConnectedGroups.flat());

        let finalTurnScore = 0;

        // a) Score the connected groups
        for (const group of allConnectedGroups) {
            let combinedBaseScore = 0;
            let combinedMultiplier = 1.0;

            // Find the connector rule that created this connection to apply its color
            // (This assumes one connector rule per day for simplicity, can be expanded)
            const connectorRule = activeConnectorRules[0];

            for (const word of group) {
                const details = wordDetailsMap.get(word);
                if (details) {
                    combinedBaseScore += details.baseScore;
                    combinedMultiplier *= details.lengthMultiplier * details.skillMultiplier;

                    // Apply highlighting for this combo
                    if (connectorRule) {
                        details.tiles.forEach(tile => {
                            if (!tileToRuleIdsMap.has(tile.id)) tileToRuleIdsMap.set(tile.id, new Set());
                            tileToRuleIdsMap.get(tile.id)!.add(connectorRule.id);
                        });
                    }
                }
            }
            finalTurnScore += combinedBaseScore * combinedMultiplier;
            // Update achievement count for the connector rule
            if (connectorRule) {
                const currentCount = newMetRuleCounts.get(connectorRule.id) || 0;
                newMetRuleCounts.set(connectorRule.id, currentCount + 1);
            }
        }

        // b) Score the remaining, unconnected words
        for (const [word, details] of wordDetailsMap.entries()) {
            if (!wordsInACombo.has(word)) {
                finalTurnScore += details.baseScore * details.lengthMultiplier * details.skillMultiplier;
            }
        }

        // --- Update State ---
        // We only update the display totals here; the real score is finalTurnScore
        const totalLetterPoints = Array.from(wordToTilesMap.values()).flat().reduce((sum, tile) => sum + tile.value, 0);
        setBasePoints(totalLetterPoints);

        setFinalScore(Math.round(finalTurnScore));
        setMetRuleCounts(newMetRuleCounts);

        // Update the grid with all highlighting and found status
        const newGrid = JSON.parse(JSON.stringify(currentGrid));
        for (let y = 0; y < GridHeight; y++) {
            for (let x = 0; x < GridWidth; x++) {
                const tile = newGrid[y][x];
                if (tile) {
                    tile.isFound = allValidTilesMap.has(tile.id);
                    tile.appliedRuleIds = Array.from(tileToRuleIdsMap.get(tile.id) || []);
                }
            }
        }
        setGrid(newGrid);

    }, [dailyRules, dictionary, bonusLetterData, getLengthMultiplier, calculateLiveScore, themeOfTheDay, typeOfTheDay]);

    function findAllValidWords(currentGrid: (PlacedTile | null)[][]) {
        calculateLiveScore(currentGrid);

        const allValidTilesMap = new Map<number, PlacedTile>();
        const wordToTilesMap = new Map<string, PlacedTile[]>();


        // Step 1: Find all valid words and their tiles (this logic is unchanged)
        const checkLine = (line: (PlacedTile | null)[]) => {
            let currentWord = "";
            let currentTiles: PlacedTile[] = [];

            const processCurrentWord = () => {
                // Check if the built-up word is valid according to game rules (e.g., length)
                // and exists in the dictionary.
                if (currentWord.length > 2 && dictionary.has(currentWord.toLowerCase())) {
                    // If valid, add it to our map for this turn's scoring.
                    wordToTilesMap.set(currentWord, [...currentTiles]);
                    // Also add its tiles to a separate map to easily identify all valid tiles later.
                    currentTiles.forEach(tile => allValidTilesMap.set(tile.id, tile));
                }
                // Always reset after processing to start looking for the next word.
                currentWord = "";
                currentTiles = [];
            };

            // Iterate through each cell in the provided line (a row or column).
            for (const tile of line) {
                if (tile) {
                    // If there's a tile, append its letter to the current word string.
                    currentWord += tile.letter;
                    currentTiles.push(tile);
                } else {
                    // If we hit an empty cell, it's a word boundary. Process what we have.
                    processCurrentWord();
                }
            }
            // After the loop finishes, process any word that was at the very end of the line.
            processCurrentWord();
        };
        for (let y = 0; y < GridHeight; y++) { checkLine(currentGrid[y]); }
        for (let x = 0; x < GridWidth; x++) { checkLine(currentGrid.map(row => row[x])); }
        return wordToTilesMap;
    }

    const groupConnectedWords = (
        wordToTilesMap: Map<string, PlacedTile[]>,
        activeConnectorRules: AnyRule[],
        connectionContext: ConnectionContext
    ): string[][] => {
        const words = Array.from(wordToTilesMap.keys());
        if (words.length < 2) return [];

        // Step 1: Build the adjacency list from ALL rule results.
        const adjacencyList = new Map<string, Set<string>>();
        for (const word of words) {
            adjacencyList.set(word, new Set());
        }

        // Apply each active connector rule to the whole board state.
        for (const rule of activeConnectorRules) {
            if (rule.type === 'connector') {
                // The rule's `apply` function now returns ALL pairs it finds.
                const result = rule.apply(connectionContext);
                for (const group of result.connectedGroups) {
                    // For each pair found by the rule (e.g., [WIND, DUNE]),
                    // add a two-way link to our adjacency list.
                    const [wordA, wordB] = group;
                    adjacencyList.get(wordA)!.add(wordB);
                    adjacencyList.get(wordB)!.add(wordA);
                }
            }
        }

        // Step 2: Traverse the graph (DFS). This logic is unchanged and now works correctly.
        const allGroups: string[][] = [];
        const visited = new Set<string>();

        for (const word of words) {
            if (!visited.has(word)) {
                const currentGroup: string[] = [];
                const stack = [word];
                visited.add(word);

                while (stack.length > 0) {
                    const currentWord = stack.pop()!;
                    currentGroup.push(currentWord);
                    const neighbors = adjacencyList.get(currentWord) || new Set();
                    for (const neighbor of neighbors) {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            stack.push(neighbor);
                        }
                    }
                }
                if (currentGroup.length > 1) {
                    allGroups.push(currentGroup);
                }
            }
        }
        return allGroups;
    };



    useEffect(() => {
        if (gameStatus !== 'scoring' || !dictionary) {
            return;
        }

        console.log('[SCORING] Game status is "scoring". Building animation queue...');

        // 1. Find all valid words on the board.
        const wordToTilesMap = findAllValidWords(grid);
        finalWordMapRef.current = wordToTilesMap;

        // 2. Pre-calculate the individual scoring details for EVERY word.
        const wordDetailsMap = new Map<string, {
            baseScore: number;
            lengthMultiplier: number;
            skillMultiplier: number;
            tiles: PlacedTile[];
        }>();

        // VVVV THIS IS THE "EXISTING LOGIC" IMPLEMENTED FULLY VVVV
        for (const [word, tiles] of wordToTilesMap.entries()) {
            const letterScore = tiles.reduce((sum, tile) => sum + tile.value, 0);
            const wordContext: WordContext = { word, tiles, bonusLetterData: bonusLetterData ?? undefined, themeOfTheDay, typeOfTheDay };
            let flatBonus = 0;
            dailyRules.forEach(rule => {
                if (rule.type === 'base') {
                    // We only care about the bonus points here, not the other returned values.
                    flatBonus += rule.apply(wordContext).bonus;
                }
            });

            let skillMultiplierPool = 1.0;
            dailyRules.forEach(rule => {
                if (rule.type === 'skill') {
                    // The 'bonus' property for skill rules is the multiplier value (e.g., 0.5)
                    skillMultiplierPool += rule.apply(wordContext).bonus;
                }
            });

            const lengthMultiplier = getLengthMultiplier(word.length);

            // Store all the calculated components for this word in our map.
            wordDetailsMap.set(word, {
                baseScore: letterScore + flatBonus,
                lengthMultiplier: lengthMultiplier,
                skillMultiplier: skillMultiplierPool,
                tiles: tiles
            });
        }
        // ^^^^ END OF "EXISTING LOGIC" BLOCK ^^^^

        // Store this map in the ref for the animation function to use.
        wordDetailsMapRef.current = wordDetailsMap;


        const connectionContext: ConnectionContext = {
            wordToTilesMap,
            dictionary,
            dailyRules,
            wordScores: new Map(), // This property can be removed from the interface later
        };

        const activeConnectorRules = dailyRules.filter(r => r.type === 'connector');

        // Call our powerful new helper function.
        const allConnectedGroups = groupConnectedWords(
            wordToTilesMap,
            activeConnectorRules,
            connectionContext
        );

        // Create a flat set of all words that are part of any combo for easy lookup.
        const wordsInACombo = new Set(allConnectedGroups.flat());
        // ===================================================================


        // 4. Build the final animation queue. (This part is unchanged and now works correctly).
        const queue: any[] = [];
        for (const group of allConnectedGroups) {
            queue.push({ type: 'score_combo_group', group: group });
        }
        for (const word of wordToTilesMap.keys()) {
            if (!wordsInACombo.has(word)) {
                queue.push({ type: 'score_single_word', word: word });
            }
        }
        queue.push({ type: 'finish_scoring' });

        console.log(`[SCORING] Queue created with ${queue.length - 1} scoring steps.`);
        setScoringQueue(queue);

    }, [gameStatus, grid, dictionary, dailyRules, bonusLetterData]);
    // Helper function to calculate the full score for one word
    const calculateFullScoreForWord = (word: string, tiles: PlacedTile[]) => {
        const wordContext: WordContext = { word, tiles, themeOfTheDay, typeOfTheDay, bonusLetterData: bonusLetterData ?? undefined };
        const letterScore = tiles.reduce((sum, tile) => sum + tile.value, 0);

        let flatBonus = 0;
        dailyRules.forEach(rule => {
            if (rule.type === 'base') flatBonus += rule.apply(wordContext).bonus;
        });

        let skillMultiplierPool = 1.0;
        dailyRules.forEach(rule => {
            if (rule.type === 'skill') skillMultiplierPool += rule.apply(wordContext).bonus;
        });

        const lengthMultiplier = getLengthMultiplier(word.length);
        const baseScore = letterScore + flatBonus;
        // Expose baseScore and multScore as global variables for use in JSX
        setScoringBaseScore(baseScore);
        const multScore = lengthMultiplier * skillMultiplierPool;
        setScoringMultScore(multScore);
        const total = (letterScore + flatBonus) * (lengthMultiplier * skillMultiplierPool);

        return { letterScore, flatBonus, lengthMultiplier, skillMultiplierPool, total, baseScore, multScore };
    };


    const processNextInQueue = () => {
        if (scoringQueue.length === 0) return;
        const nextEvent = scoringQueue[0];
        console.log('[SCORING] Processing event:', nextEvent);

        setTimeout(() => {
            let scoreToAdd = 0;
            let calculationString = "";

            if (nextEvent.type === 'score_combo_group') {
                const group = nextEvent.group;

                // --- Logic for a COMBO ---
                let combinedBaseScore = 0;
                let combinedMultiplier = 1.0;

                // Highlight all words in the group at once
                setCurrentlyScoringWord(group.join(' + '));

                for (const word of group) {
                    const details = wordDetailsMapRef.current.get(word); // Assuming wordDetailsMap is accessible
                    if (details) {
                        combinedBaseScore += details.baseScore;
                        combinedMultiplier *= details.lengthMultiplier * details.skillMultiplier;
                    }
                }
                scoreToAdd = Math.round(combinedBaseScore * combinedMultiplier);
                calculationString = `COMBO: (${combinedBaseScore}) x ${combinedMultiplier.toFixed(2)} = ${scoreToAdd}`;

            } else if (nextEvent.type === 'score_single_word') {
                const word = nextEvent.word;
                const details = wordDetailsMapRef.current.get(word); // Assuming wordDetailsMap is accessible

                if (details) {
                    // --- Logic for a SINGLE word ---
                    setCurrentlyScoringWord(word);
                    scoreToAdd = Math.round(details.baseScore * details.lengthMultiplier * details.skillMultiplier);
                    calculationString = `(${details.baseScore}) x ${details.lengthMultiplier.toFixed(2)} x ${details.skillMultiplier.toFixed(2)} = ${scoreToAdd}`;
                }
            } else if (nextEvent.type === 'finish_scoring') {
                console.log('[SCORING] All steps complete.');
                setGameStatus('over');
                return;
            }

            // Update the UI
            setCurrentCalculation(calculationString);
            setAnimatedTotalScore(prev => prev + scoreToAdd);

            // Schedule the un-highlighting and next step
            setTimeout(() => {
                setCurrentlyScoringWord(null);
                setCurrentCalculation("");
                setScoringQueue(prevQueue => prevQueue.slice(1));
            }, 1500); // Wait 1.5s to show the result before moving on

        }, 750); // 750ms delay to start the next scoring step
    };
    useEffect(() => {
        // Only start processing if we are in the scoring phase and the queue has items.
        if (gameStatus === 'scoring' && scoringQueue.length > 0) {
            processNextInQueue();
        }
    }, [scoringQueue, gameStatus]);

    const startDrag = (
        e: React.MouseEvent | React.TouchEvent,
        tile: TileData,
        origin: DraggingTile['origin']
    ) => {
        if (gameStatus == 'over') return;


        const coords = getEventPageCoordinates(e.nativeEvent);
        if (!coords) {
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();

        const dragSize = origin.type === 'grid' ? tileSize : 48;

        const newDraggingTile: DraggingTile = {
            tile,
            origin,
            offsetX: coords.x - rect.left,
            offsetY: coords.y - rect.top,
            size: dragSize,
        };

        const newDragPosition = { x: coords.x, y: coords.y };


        setDragPosition(newDragPosition);
        setDraggingTile(newDraggingTile);
    };

    const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {

        if (draggingTileRef.current) {
            if (e.cancelable) {
                e.preventDefault();
            }

            const coords = getEventPageCoordinates(e);
            if (coords) {
                setDragPosition({ x: coords.x, y: coords.y });
            }
        }
    }, []);

    const handleDragEnd = useCallback((e: MouseEvent | TouchEvent) => {
        const currentDraggingTile = draggingTileRef.current;
        // If there's no tile being dragged, do nothing and ensure state is clean.
        if (!currentDraggingTile || !gameBoardRef.current) {
            setDraggingTile(null);
            return;
        }

        const coords = getEventPageCoordinates(e);
        let wasSuccessful = false; // We will use this to track if the drop was valid.

        if (coords) {
            const boardRect = gameBoardRef.current.getBoundingClientRect();
            const dropX = coords.x - (boardRect.left + window.scrollX);
            const dropY = coords.y - (boardRect.top + window.scrollY);
            const gridX = Math.floor(dropX / tileSize);
            const gridY = Math.floor(dropY / tileSize);

            if (gridX >= 0 && gridX < GridWidth && gridY >= 0 && gridY < GridHeight) {
                const targetTile = grid[gridY][gridX];

                // --- SCENARIO 1: Drop on an EMPTY cell ---
                if (targetTile === null) {
                    const newGrid = grid.map(r => [...r]);
                    newGrid[gridY][gridX] = { ...currentDraggingTile.tile, gridX, gridY, isFound: false };

                    if (currentDraggingTile.origin.type === 'grid') {
                        newGrid[currentDraggingTile.origin.y][currentDraggingTile.origin.x] = null;
                    } else if (currentDraggingTile.origin.type === 'hand') {
                        setHand(h => {
                            const newHand = [...h];
                            // Type guard ensures .index is only accessed for 'hand' type
                            if (currentDraggingTile.origin.type === 'hand') {
                                newHand[currentDraggingTile.origin.index] = null;
                            }
                            return newHand;
                        });
                    }

                    setGrid(newGrid);
                    checkForWords(newGrid);
                    wasSuccessful = true; // Mark the action as successful.

                    // --- SCENARIO 2: SWAP tiles already on the grid ---
                } else if (currentDraggingTile.origin.type === 'grid') {
                    const newGrid = grid.map(r => [...r]);
                    const originX = currentDraggingTile.origin.x;
                    const originY = currentDraggingTile.origin.y;

                    newGrid[originY][originX] = { ...targetTile, gridX: originX, gridY: originY };
                    newGrid[gridY][gridX] = { ...currentDraggingTile.tile, gridX, gridY, isFound: false };

                    setGrid(newGrid);
                    checkForWords(newGrid);
                    wasSuccessful = true; // Mark the action as successful.
                }
            }
        }

        // --- SCENARIO 3: REVERT if the drop was invalid or unsuccessful ---
        if (!wasSuccessful) {
            // This logic is only for reverting the visual state, no need to call checkForWords.
            if (currentDraggingTile.origin.type === 'grid') {
                const { x, y } = currentDraggingTile.origin;
                setGrid(g => {
                    const newG = g.map(row => [...row]);
                    newG[y][x] = { ...currentDraggingTile.tile, gridX: x, gridY: y, isFound: false };
                    return newG;
                });
            } else {
                const { index } = currentDraggingTile.origin;
                setHand(h => {
                    const newH = h.map(item => item);
                    newH[index] = currentDraggingTile.tile;
                    return newH;
                });
            }
        }

        // Finally, always clear the dragging state.
        setDraggingTile(null);

    }, [grid, hand, tileSize, checkForWords]);


    const handleDoneClick = useCallback(() => {
        // Prevent action if the game is already over
        if (gameStatus !== 'playing') return; // Check gameStatus now
        checkForWords(grid);
        setGameStatus('scoring');

    }, [draggingTile, grid, hand, checkForWords, tileSize, gameStatus]);

    useEffect(() => {
        // Add listeners for both mouse and touch events
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('touchmove', handleDragMove, { passive: false });

        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchend', handleDragEnd);

        // Cleanup function to remove all listeners
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [handleDragMove, handleDragEnd]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // if (isLoadingDictionary) {
    //     return <div className="text-center p-10 text-xl">Loading Dictionary...</div>;
    // }
    const RuleColours = ['#22d3ee', '#d946ef', '#facc15']; // Cyan, Magenta, Yellow

    return (
        <div className="w-full flex flex-col bg-transparent text-white rounded-lg select-none">
            {/* Top Row: Score and Timer (Already responsive, no changes) */}
            <div className="w-full flex justify-between items-center mb-4 px-2 sm:px-4 pt-2 sm:pt-4">
                <div className="flex-grow">
                    {gameStatus === 'playing' ? (
                        <div className="text-base sm:text-xl font-bold text-gray-300 bg-green-950 px-4 py-2 rounded-lg flex items-center justify-center">
                            <span>Base ({liveLetterPoints})</span>
                            <span className="mx-2">x</span>
                            <span>Length ({liveLengthMultiplier.toFixed(2)}x)</span>
                        </div>
                    ) : gameStatus === 'scoring' ? (
                        <ScoreAnimator
                            currentlyScoringWord={currentlyScoringWord}
                            currentCalculation={currentCalculation}
                            animatedTotalScore={animatedTotalScore}
                        />
                    ) : (
                        <div className="text-base sm:text-xl font-bold text-gray-300 bg-green-950 px-4 py-2 rounded-lg flex items-center justify-center">
                            <span>Final Score: <span className="text-xl sm:text-2xl text-yellow-400">{finalScore}</span></span>
                        </div>
                    )}
                </div>
                <div className="text-xl sm:text-2xl font-mono bg-black px-2 sm:px-4 py-2 rounded-lg ml-2">
                    {gameStatus == 'over' ? "Time's Up!" : formatTime(timeLeft)}
                </div>
            </div>

            {/* Middle Row: Rule Display with Colors */}
            <div className="w-full bg-gray-900/50 p-3 rounded-lg mb-4 lg:mx-0">
                <h3 className="text-lg font-bold text-yellow-300 mb-2">Today&apos;s Rules:</h3>
                {dailyRules.length > 0 ? (
                    <ul className="space-y-2">
                        {dailyRules.map((rule, index) => {
                            // VVVV GET THE COUNT FOR THIS RULE VVVV
                            const count = metRuleCounts.get(rule.id) || 0;
                            const isThemeRule = rule.id === 'skill_daily_theme';
                            const isTypeRule = rule.id === 'skill_daily_type';
                            const descriptionText = rule.description({
                                bonusLetterData: bonusLetterData ?? undefined,
                                themeOfTheDay: themeOfTheDay ?? undefined,
                                typeOfTheDay: typeOfTheDay ?? undefined
                            });
                            return (
                                <li
                                    key={rule.id}
                                    style={{ backgroundColor: RuleColours[index] + '20', borderColor: RuleColours[index] }}
                                    className="p-2 rounded-md border-l-4 flex items-center justify-between min-h-[56px]"
                                >
                                    {isThemeRule && themeOfTheDay ? (
                                        // If it's the theme rule, wrap the description in the Tooltip
                                        <Tooltip text={`e.g., ${themeOfTheDay.examples.join(', ')}`}>
                                            <p className="text-white font-semibold pr-2 border-b-2 border-dashed border-gray-500 cursor-help">
                                                {descriptionText}
                                            </p>
                                        </Tooltip>
                                    ) : isTypeRule && typeOfTheDay ? (
                                        // Case 2: It's the TYPE rule
                                        <Tooltip text={`e.g., ${typeOfTheDay.examples.join(', ')}`}>
                                            <p className="text-white font-semibold pr-2 border-b-2 border-dashed border-gray-500 cursor-help">
                                                {descriptionText}
                                            </p>
                                        </Tooltip>
                                    ) : (
                                        // Otherwise, render the description normally
                                        <p className="text-white font-semibold pr-2">
                                            {descriptionText}
                                        </p>
                                    )}
                                    {/* Checkmark container */}
                                    <div className={`
                            flex flex-wrap items-center justify-end gap-1 transition-opacity duration-500
                            ${count > 0 ? 'opacity-100' : 'opacity-0'}
                        `}>
                                        {/* VVVV RENDER 'count' NUMBER OF CHECKMARKS VVVV */}
                                        {Array.from({ length: count }).map((_, i) => (
                                            <svg
                                                key={i}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-black" // Slightly smaller for multiple
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="text-gray-400">Loading rules...</div>
                )}
            </div>

            {/* --- START OF RESPONSIVE CHANGES --- */}

            {/* Bottom Area: Now a column on mobile, a row on large screens */}
            <div className="w-full flex flex-col lg:flex-row gap-4">

                {/* Left Column: Game Board Container */}
                <div ref={gridContainerRef} className="flex-grow w-full flex items-center justify-center">
                    <div
                        ref={gameBoardRef}
                        className="relative bg-green-900 border-y-4 lg:border-4 border-black mx-auto lg:mx-0"// mx-auto centers it if there's extra space
                        // Use the dynamic tileSize from state for sizing
                        style={{
                            width: GridWidth * tileSize,
                            height: GridHeight * tileSize,
                            display: 'grid',
                            gridTemplateColumns: `repeat(${GridWidth}, 1fr)`,
                            gridTemplateRows: `repeat(${GridHeight}, 1fr)`,
                        }}
                    >
                        {grid.map((row, y) =>
                            row.map((tile, x) => {
                                // VVVV ADD THIS LOGIC VVVV
                                const isBeingDragged = draggingTile?.origin.type === 'grid' &&
                                    draggingTile.origin.x === x &&
                                    draggingTile.origin.y === y;

                                let isScoringHighlight = false;
                                if (gameStatus === 'scoring' && currentlyScoringWord && tile) {
                                    const tilesForScoringWord = finalWordMapRef.current.get(currentlyScoringWord);
                                    if (tilesForScoringWord?.some(t => t.id === tile.id)) {
                                        isScoringHighlight = true;
                                    }
                                }

                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        className="w-full h-full border border-gray-100/50 flex items-center justify-center"
                                    >
                                        {tile && (
                                            <div
                                                className={`
                                                    w-full h-full
                                                    ${isBeingDragged ? 'opacity-0' : 'opacity-100'}
                                                    transition-transform duration-300
                                                    ${isScoringHighlight ? 'scale-120' : 'scale-100'}
                                                `}
                                            >
                                                <Tile
                                                    letter={tile.letter}
                                                    value={tile.value}
                                                    isFound={tile.isFound}
                                                    dailyRules={dailyRules}
                                                    appliedRuleIds={tile.appliedRuleIds}
                                                    tileSize={tileSize}
                                                    onMouseDown={(e) => startDrag(e, tile, { type: 'grid', x, y })}
                                                    onTouchStart={(e) => startDrag(e, tile, { type: 'grid', x, y })}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right Column: Hand */}
                {/* Remove fixed pixel width, use responsive Tailwind classes */}
                <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col p-4 bg-green-950 rounded-lg lg:mx-0">
                    <h3 className="text-center text-lg mb-4 font-bold">Your Hand</h3>
                    {/* Center the hand's tile grid */}
                    <div className="grid grid-cols-7 gap-2 mx-auto">
                        {hand.map((tile, index) => {
                            // VVVV ADD THIS LOGIC VVVV
                            const isBeingDragged = draggingTile?.origin.type === 'hand' &&
                                draggingTile.origin.index === index;
                            return (
                                <div key={index} className="w-12 h-12 ...">
                                    {tile && (
                                        <div className={isBeingDragged ? 'opacity-0' : 'opacity-100 w-full h-full'}>
                                            <Tile
                                                letter={tile.letter}
                                                value={tile.value}
                                                isFound={false}
                                                appliedRuleIds={[]}
                                                tileSize={48}
                                                dailyRules={dailyRules}
                                                onMouseDown={(e) => startDrag(e, tile, { type: 'hand', index })}
                                                onTouchStart={(e) => startDrag(e, tile, { type: 'hand', index })}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {gameStatus !== 'over' && (
                        <button
                            onClick={handleDoneClick}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold text-xl transition-colors mt-auto"
                        >
                            Submit Final Board
                        </button>
                    )}
                </div>
            </div>
            {gameStatus === 'pregame' && (
                <PreGameModal
                    playerStats={playerStats ?? null}
                    savedDailyState={savedDailyState}
                    onStartGame={handleStartGame}
                />
            )}

            {/* Dragging Tile */}
            {draggingTile && (
                // We wrap the log in a component-like function to log during render
                (() => {

                    console.log(`%c[RENDER] Applying Styles:`, 'color: #facc15; font-weight: bold;');
                    console.log({
                        position: 'fixed',
                        left: `${dragPosition.x - draggingTile.offsetX}px`,
                        top: `${dragPosition.y - draggingTile.offsetY}px`,
                        width: `${draggingTile.size}px`,
                        height: `${draggingTile.size}px`,
                    });
                    return null;
                })()
            )}
            {draggingTile && (
                <div
                    className="absolute pointer-events-none"
                    // Use the dynamic tileSize from state here too
                    style={{
                        position: 'fixed',
                        left: dragPosition.x - draggingTile.offsetX,
                        top: dragPosition.y - draggingTile.offsetY,
                        zIndex: 100,
                        width: tileSize,
                        height: tileSize,
                    }}
                >
                    <Tile
                        letter={draggingTile.tile.letter}
                        value={draggingTile.tile.value}
                        isDragging={true}
                        isFound={false}
                        appliedRuleIds={[]}
                        tileSize={draggingTile.size}
                        dailyRules={dailyRules}
                        onMouseDown={() => { }}
                        onTouchStart={() => { }}
                    />
                </div>
            )}

            {gameStatus === 'over' && (
                <GameOverModal score={finalScore} isScoreSubmitted={isScoreSubmitted} />
            )}
        </div>
    );
}
