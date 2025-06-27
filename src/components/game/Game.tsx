"use client";

import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Tile from './Tile';
import GameOverModal from './GameOverModal';
import { getDictionary, WordData } from '@/data/dictionaryService';
import { Rule, RuleCategories } from '@/data/rules';
import { PlayerStatsContext, PlayerStats, SavedDailyState } from '@/context/PlayerStatsContext';

function mulberry32(seed: number) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4284967296;
    }
}

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
const HandSlots = 24;

// how many of each tile are in the bag
const TileDistribution = {
    A: 13, B: 3, C: 3, D: 6, E: 18, F: 3, G: 4, H: 3, I: 12, J: 2, K: 2, L: 5, M: 3,
    N: 8, O: 11, P: 3, Q: 2, R: 9, S: 6, T: 9, U: 6, V: 3, W: 3, X: 2, Y: 3, Z: 2
}

const TileValues: { [key: string]: number } = {
    A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1, D: 2, G: 2, B: 3, C: 3, M: 3, P: 3,
    F: 4, H: 4, V: 4, W: 4, Y: 4, K: 5, J: 8, X: 8, Q: 10, Z: 10
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
    const [dailyRules, setDailyRules] = useState<Rule[]>([]);
    const [metRuleCounts, setMetRuleCounts] = useState<Map<string, number>>(new Map());
    const [finalScore, setFinalScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60 * 5)
    const [isGameOver, setIsGameOver] = useState(false);
    const [savedDailyState, setSavedDailyState] = useState<SavedDailyState | null>(null);
    const [dictionary, setDictionary] = useState<Map<string, WordData> | null>(null);
    const [isLoadingDictionary, setIsLoadingDictionary] = useState(true);

    const [draggingTile, setDraggingTile] = useState<DraggingTile | null>(null);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const draggingTileRef = useRef<DraggingTile | null>(null);

    const [tileSize, setTileSize] = useState(50);

    const gameBoardRef = useRef<HTMLDivElement>(null);
    const gridContainerRef = useRef<HTMLDivElement>(null);

    const isInitialized = useRef(false);
    const hasSubmittedScore = useRef(false);

    // console.log('[RENDER] Component rendering.', {
    //     isDragging: !!draggingTile,
    //     dragPosition: dragPosition
    // });

    useEffect(() => {
        const loadData = async () => {
            const dict = await getDictionary();
            setDictionary(dict);
            setIsLoadingDictionary(false); // Signal that the dictionary is ready
        };
        loadData();
    }, [])

    useEffect(() => {
        draggingTileRef.current = draggingTile;
    }, [draggingTile]);

    useEffect(() => {
        const savedJSON = localStorage.getItem('dailyWordGameState');
        const todayStr = new Date().toISOString().slice(0, 10);
        if (savedJSON) {
            const data = JSON.parse(savedJSON);
            if (data.saveDate === todayStr) {
                setSavedDailyState(data.gameState);
            }
        }
    }, []);

    useEffect(() => {
        // We only want this effect to run when the game is over.
        if (!isGameOver) {
            return;
        }

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
                        timeTaken: (60 * 5) - timeLeft,
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

                console.log("Scores successfully submitted.");

            } catch (error) {
                console.error("Failed to submit scores to server:", error);
                // Optional: reset the flag if the API call fails, allowing a retry?
                // hasSubmittedScore.current = false;
            }
        };

        submitScores();

    }, [isGameOver, playerStats, finalScore, timeLeft, updateStats]);

    useEffect(() => {
        const container = gridContainerRef.current;
        if (!container) return;

        // Use a ResizeObserver to automatically detect when the container's size changes.
        // This is more efficient than listening to the whole window.
        const resizeObserver = new ResizeObserver(entries => {
            // We only have one entry, which is our grid container
            const entry = entries[0];
            if (entry) {
                const width = entry.contentRect.width;
                // Calculate the new tile size based on container width and update state
                setTileSize(width / GridWidth);
            }
        });

        resizeObserver.observe(container);

        // Cleanup function to stop observing when the component unmounts
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!isInitialized.current || !saveDailyGameState) return;

        const gameState = {
            grid, hand, tileBag, basePoints, totalLengths, finalScore,
            bonusPoints, dailyRules, metRuleCounts: Array.from(metRuleCounts.entries()),
            timeLeft, isGameOver,
        };

        saveDailyGameState(gameState);

    }, [grid, hand, tileBag, timeLeft, isGameOver, finalScore, saveDailyGameState]);

    const initializeGame = useCallback(() => {
        // If there's a valid saved state for today passed down as a prop, load it.
        // Fetch the dictionary when the game starts
        if (savedDailyState) {
            try {
                setGrid(savedDailyState.grid);
                setHand(savedDailyState.hand);
                setTileBag(savedDailyState.tileBag);
                setBasePoints(savedDailyState.basePoints);
                setTotalLengths(savedDailyState.totalLengths);
                setFinalScore(savedDailyState.finalScore);
                setTimeLeft(savedDailyState.timeLeft);
                setIsGameOver(savedDailyState.isGameOver);
                setBonusPoints(savedDailyState.bonusPoints || 0);
                setDailyRules(savedDailyState.dailyRules || []);
                setMetRuleCounts(new Map(savedDailyState.metRuleCounts || []));
                isInitialized.current = true;
                // Rehydrate rules from IDs if loaded from saved state
                if (savedDailyState.dailyRules) {
                    const allRules: Rule[] = RuleCategories.flatMap(cat => cat.rules);
                    const hydratedRules = savedDailyState.dailyRules.map((savedRule: any) => {
                        // Try to find the rule by id
                        return allRules.find(r => r.id === savedRule.id) || savedRule;
                    });
                    setDailyRules(hydratedRules);
                } else {
                    setDailyRules([]);
                }
                setMetRuleCounts(new Map(savedDailyState.metRuleCounts || []));
                isInitialized.current = true;
                return; // Exit here, we are done initializing.
            } catch (error) {
                console.error("Failed to load passed-in saved state, starting fresh.", error);
            }
        }

        setIsGameOver(false);
        setBasePoints(0);
        setBonusPoints(0);
        setTotalLengths(0);
        setFinalScore(0);
        setMetRuleCounts(new Map());
        setTimeLeft(60 * 5);

        const today = new Date();
        const seed = today.setHours(0, 0, 0, 0);
        const seededRandom = mulberry32(seed);

        const selectedRules: Rule[] = [];
        const shuffledCategories = [...RuleCategories].sort(() => seededRandom() - 0.5);
        for (let i = 0; i < 3 && i < shuffledCategories.length; i++) {
            const category = shuffledCategories[i];
            if (category.rules.length > 0) {
                const ruleIndex = Math.floor(seededRandom() * category.rules.length);
                selectedRules.push(category.rules[ruleIndex]);
            }
        }
        setDailyRules(selectedRules);

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
        setHand(initialHand);
        setTileBag(bag);

        //create grid
        const emptyGrid = Array.from({ length: GridHeight }, () =>
            Array(GridWidth).fill(null)
        );
        setGrid(emptyGrid);
        isInitialized.current = true;
    }, [savedDailyState]);

    useEffect(() => {
        // Only initialize the game board AFTER the dictionary is loaded.
        if (!isLoadingDictionary) {
            initializeGame();
        }
    }, [isLoadingDictionary, initializeGame]);

    useEffect(() => {
        // If the game is already over, do nothing. Don't start a timer.
        if (isGameOver) {
            return;
        }

        // If the game is not over, set up the interval.
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                // When the timer is about to hit zero, end the game.
                if (prevTime <= 1) {
                    setIsGameOver(true);
                    return 0;
                }
                // Otherwise, just count down.
                return prevTime - 1;
            });
        }, 1000);

        // The cleanup function will clear the interval when the component
        // unmounts or when isGameOver becomes true.
        return () => {
            clearInterval(timerId);
        };
    }, [isGameOver]);

    const checkForWords = useCallback((currentGrid: (PlacedTile | null)[][]) => {

        if (!dictionary) {
            console.log("Dictionary not loaded yet, skipping word check.");
            return;
        }

        let newTotalLengths = 0;
        const allValidTilesMap = new Map<number, PlacedTile>();
        const wordToTilesMap = new Map<string, PlacedTile[]>();

        const checkLine = (line: (PlacedTile | null)[]) => {
            let currentWord = "";
            let currentTiles: PlacedTile[] = [];

            const processCurrentWord = () => {
                if (currentWord.length > 2 && dictionary.has(currentWord.toLowerCase())) {
                    newTotalLengths += currentWord.length;
                    currentTiles.forEach(tile => allValidTilesMap.set(tile.id, tile));
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

        for (let y = 0; y < GridHeight; y++) {
            checkLine(currentGrid[y]);
        }
        for (let x = 0; x < GridWidth; x++) {
            const column = currentGrid.map((row: any[]) => row[x]);
            checkLine(column);
        }

        let newBasePoints = 0;
        for (const tile of allValidTilesMap.values()) {
            newBasePoints += tile.value;
        }

        const newMetRuleCounts = new Map<string, number>();
        let newBonusPoints = 0;
        const tileToRuleIdsMap = new Map<number, Set<string>>();
        if (dailyRules.length > 0) {
            const ruleContext = {
                validWords: Array.from(wordToTilesMap.keys()),
                wordToTilesMap,
                allValidTiles: allValidTilesMap,
                basePoints: newBasePoints,
                totalLengths: newTotalLengths,
                dictionary: dictionary!, // Add the dictionary property here
            };
            dailyRules.forEach(rule => {
                const { bonus, contributingTileIds, achievementCount } = rule.apply(ruleContext);
                newBonusPoints += bonus;
                if (achievementCount > 0) {
                    newMetRuleCounts.set(rule.id, achievementCount);
                }
                contributingTileIds.forEach(tileId => {
                    if (!tileToRuleIdsMap.has(tileId)) {
                        tileToRuleIdsMap.set(tileId, new Set());
                    }
                    tileToRuleIdsMap.get(tileId)!.add(rule.id);
                });
            });
        }

        const newFinalScore = (newBasePoints * newTotalLengths) + newBonusPoints;

        setBasePoints(newBasePoints);
        setTotalLengths(newTotalLengths);
        setBonusPoints(newBonusPoints);
        setFinalScore(newFinalScore);
        setMetRuleCounts(newMetRuleCounts);

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
    }, [dailyRules, dictionary]);

    const startDrag = (
        e: React.MouseEvent | React.TouchEvent,
        tile: TileData,
        origin: DraggingTile['origin']
    ) => {
        if (isGameOver) return;


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

        // Remove tile from its source visually
        // if (origin.type === 'grid') {
        //     setGrid(g => {
        //         const newG = [...g];
        //         newG[origin.y][origin.x] = null;
        //         return newG;
        //     });
        // } else {
        //     setHand(h => {
        //         const newHand = [...h];
        //         newHand[origin.index] = null;
        //         return newHand;
        //     });
        // }
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

    // const handleDragEnd = useCallback((e: MouseEvent | TouchEvent) => {
    //     if (!draggingTile || !gameBoardRef.current) return;

    //     console.log('[END] handleDragEnd event triggered.');
    //     const currentDraggingTile = draggingTileRef.current;
    //     if (!currentDraggingTile) {
    //         console.log('[END] No tile was being dragged. Cleaning up.');
    //         setDraggingTile(null); // Ensure state is clean
    //         return;
    //     }
    //     const coords = getEventPageCoordinates(e);

    //     if (!coords) {
    //         // If for some reason we can't get coordinates, revert the tile.
    //         if (draggingTile.origin.type === 'grid') {
    //             const { x, y } = draggingTile.origin;
    //             setGrid(g => {
    //                 const newG = g.map(row => [...row]);
    //                 newG[y][x] = { ...draggingTile.tile, gridX: x, gridY: y, isFound: false };
    //                 return newG;
    //             });
    //         } else {
    //             const { index } = draggingTile.origin;
    //             setHand(h => {
    //                 const newH = h.map(item => item);
    //                 newH[index] = draggingTile.tile;
    //                 return newH;
    //             });
    //         }
    //         setDraggingTile(null);
    //         return;
    //     }

    //     const boardRect = gameBoardRef.current.getBoundingClientRect();

    //     // VVVV THIS CALCULATION IS NOW CORRECT VVVV
    //     // It correctly converts the document-relative cursor position
    //     // to a board-relative position by accounting for scroll offset.
    //     const dropX = coords.x - (boardRect.left + window.scrollX);
    //     const dropY = coords.y - (boardRect.top + window.scrollY);

    //     const gridX = Math.floor(dropX / tileSize);
    //     const gridY = Math.floor(dropY / tileSize);

    //     let placedOrSwapped = false;
    //     let finalGridState: (PlacedTile | null)[][] | null = null;

    //     // --- NEW LOGIC START ---

    //     // Check if the drop is within the valid grid boundaries
    //     if (gridX >= 0 && gridX < GridWidth && gridY >= 0 && gridY < GridHeight) {
    //         const targetTile = grid[gridY][gridX];
    //         const newGrid = grid.map(row => [...row]); // Create a mutable copy

    //         if (targetTile === null) {
    //             // --- SCENARIO 1: Dropping on an EMPTY cell ---
    //             // This is the original placement logic.
    //             newGrid[gridY][gridX] = { ...draggingTile.tile, gridX, gridY, isFound: false };
    //             finalGridState = newGrid;
    //             placedOrSwapped = true;

    //         } else {
    //             // --- SCENARIO 2: Dropping on an OCCUPIED cell ---
    //             // Only allow swapping if the dragged tile came from the grid.
    //             if (draggingTile.origin.type === 'grid') {
    //                 const originX = draggingTile.origin.x;
    //                 const originY = draggingTile.origin.y;

    //                 // Perform the swap
    //                 // 1. Move the target tile to the dragged tile's original spot
    //                 newGrid[originY][originX] = { ...targetTile, gridX: originX, gridY: originY };

    //                 // 2. Move the dragged tile to the target's spot
    //                 newGrid[gridY][gridX] = { ...draggingTile.tile, gridX, gridY, isFound: false };

    //                 finalGridState = newGrid;
    //                 placedOrSwapped = true;
    //             }
    //             // If dragged from hand onto an occupied spot, `placedOrSwapped` remains false,
    //             // and the tile will correctly revert to the hand below.
    //         }
    //     }

    //     // --- REVERT LOGIC ---
    //     // If no successful placement or swap occurred, revert the tile to its origin.
    //     if (!placedOrSwapped) {
    //         if (draggingTile.origin.type === 'grid') {
    //             const { x, y } = draggingTile.origin;
    //             const newGrid = grid.map(row => [...row]);
    //             newGrid[y][x] = { ...draggingTile.tile, gridX: x, gridY: y, isFound: false };
    //             // No word check needed on a revert, so we set the grid directly
    //             setGrid(newGrid);
    //         } else {
    //             const { index } = draggingTile.origin;
    //             setHand(h => {
    //                 const newH = [...h];
    //                 newH[index] = draggingTile.tile;
    //                 return newH;
    //             });
    //         }
    //     }

    //     // --- FINAL STATE UPDATE ---
    //     // If a move was successful, update the grid and check for new words.
    //     if (finalGridState) {
    //         setGrid(finalGridState);
    //         checkForWords(finalGridState);
    //     }

    //     // Reset the dragging state
    //     console.log('[END] Drag finished. Clearing dragging state.');
    //     setDraggingTile(null);
    // }, [draggingTile, grid, hand, checkForWords, tileSize]);

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
        if (isGameOver) return;

        // Run a final check for words to update the score to its final state
        checkForWords(grid);

        // End the game
        setIsGameOver(true);

    }, [draggingTile, grid, hand, checkForWords, tileSize]);

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
                <div className="text-base sm:text-xl font-bold text-gray-300 bg-green-950 px-2 sm:px-4 py-2 rounded-lg flex flex-wrap items-center">
                    <span>Points ({basePoints})</span>
                    <span className="mx-1 sm:mx-2">x</span>
                    <span>Lengths ({totalLengths}) +</span>
                    <span className="mx-1 sm:mx-2 text-green-400">Bonus ({bonusPoints})</span>
                    <span className="mx-1 sm:mx-2">=</span>
                    <span className="text-xl sm:text-2xl text-yellow-400">{finalScore}</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono bg-black px-2 sm:px-4 py-2 rounded-lg ml-2">
                    {isGameOver ? "Time's Up!" : formatTime(timeLeft)}
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

                            return (
                                <li
                                    key={rule.id}
                                    style={{ backgroundColor: RuleColours[index] + '20', borderColor: RuleColours[index] }}
                                    className="p-2 rounded-md border-l-4 flex items-center justify-between min-h-[56px]" // min-h for consistent height
                                >
                                    <p className="text-white font-semibold pr-2">{rule.description}</p>

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
                <div ref={gridContainerRef} className="flex-grow w-full">
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
                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        className="w-full h-full border border-gray-100/50 flex items-center justify-center"
                                    >
                                        {tile && (
                                            <div className={isBeingDragged ? 'opacity-0' : 'opacity-100 w-full h-full'}>
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
                    {!isGameOver && (
                        <button
                            onClick={handleDoneClick}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-lg text-white font-bold text-xl transition-colors mt-auto"
                        >
                            Submit Final Board
                        </button>
                    )}
                </div>
            </div>

            {/* Dragging Tile */}
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
                        tileSize={tileSize}
                        dailyRules={dailyRules}
                        onMouseDown={() => { }}
                        onTouchStart={() => { }}
                    />
                </div>
            )}

            {isGameOver && (
                <GameOverModal score={finalScore} />
            )}
        </div>
    );
}
