import { PlacedTile } from '@/components/game/Game';
import lemmatizer from 'lemmatizer';
import { ThemeData, TypeData } from './themesTypes';
import { dictionary, WordData } from './dictionaryService';


// ===================================================================
// NEW CONTEXT AND INTERFACE FOR CONNECTOR RULES
// ===================================================================
export interface ConnectionContext {
    wordToTilesMap: Map<string, PlacedTile[]>; // All valid words and their tiles
    wordScores: Map<string, number>;          // The calculated score for each word BEFORE connection bonuses
    dictionary: Map<string, WordData>;        // The main dictionary for checking themes/types
    dailyRules: AnyRule[]; // All rules that apply to the current game
}

// The result of a connector rule: a list of word groups that were connected.
// Example: [['CAT', 'TRAMP'], ['DOG', 'GOD']] means CAT/TRAMP are a combo, and DOG/GOD are a combo.

export interface ConnectorRule {
    type: 'connector';
    id: string;
    description: () => string;
    apply: (context: ConnectionContext) => ConnectionResult;
}

export interface ConnectionResult {
    ruleId: string;
    connectedGroups: string[][];
}

// ===================================================================
// WORD CONTEXT: The data passed to EVERY rule for a SINGLE word.
// ===================================================================
export interface WordContext {
    word: string;
    tiles: PlacedTile[];
    bonusLetterData?: BonusLetterData; // Optional data for bonus letter, if applicable`
    themeOfTheDay?: ThemeData | null; // Optional theme of the day, if applicable
    typeOfTheDay?: TypeData | null; // Optional type of the day, if applicable
}

// ===================================================================
// BOARD CONTEXT: The data passed to rules that need to see the WHOLE board.
// ===================================================================
export interface BoardContext {
    wordToTilesMap: Map<string, PlacedTile[]>; // All valid words on the board
    handIsEmpty: boolean; // Whether the player's hand is empty
}

// ===================================================================
// THE UNIFIED RULE INTERFACE
// ===================================================================

export interface DescriptionContext {
    bonusLetterData?: BonusLetterData;
    themeOfTheDay?: ThemeData;
    typeOfTheDay?: TypeData;
}

type BonusLetterData = {
    letter: string;
    value: number;
};
// export interface Rule {
//     id: string;
//     description: (bonusLetterData?: { letter: string, value: number }) => string;
//     // Each rule's 'apply' function will have a signature that matches its type.
//     apply: (context: WordContext) => RuleApplicationResult;// 'any' is used here, but we'll cast it inside the game logic
// }

export interface RuleApplicationResult {
    bonus: number; // For BasePointRules, this is the flat bonus. For SkillMultiplierRules, it's the multiplier value (e.g., 0.5).
    achievementCount: number;
    contributingTileIds: Set<number>;
}

export interface BasePointRule {
    type: 'base';
    id: string;
    scope: 'word' | 'board';
    description: (context: DescriptionContext) => string; // Use the context object
    apply: (context: WordContext | BoardContext) => RuleApplicationResult;
}

export interface SkillMultiplierRule {
    type: 'skill';
    id: string;
    description: (context: DescriptionContext) => string; // Use the context object
    apply: (context: WordContext) => RuleApplicationResult;
}

export type AnyRule = BasePointRule | SkillMultiplierRule | ConnectorRule;



// We define our new category of rules
export const BasePointRules: BasePointRule[] = [
    {
        type: 'base',
        scope: 'word', // FIX #1: Added scope property
        id: 'base_bonus_letter',
        description: ({ bonusLetterData }) => {
            if (bonusLetterData?.letter) {
                return `+${bonusLetterData.value * 10} points for using the bonus letter '${bonusLetterData.letter}'`;
            }
            return "+0 points for using the bonus letter (no bonus letter set)";
        },
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('word' in context) { // This checks if it's a WordContext
                const { word, tiles, bonusLetterData } = context;
                if (!bonusLetterData || !word.toUpperCase().includes(bonusLetterData.letter)) {
                    return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
                }
                const contributingTiles = tiles.filter(t => t.letter === bonusLetterData.letter);
                return {
                    bonus: 10 * contributingTiles.length,
                    achievementCount: contributingTiles.length,
                    contributingTileIds: new Set(contributingTiles.map(t => t.id))
                };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'word', // FIX #1
        id: 'base_double_letters',
        description: () => '+30 points if a word has back-to-back letters (e.g., "BOOK").',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('word' in context) {
                if (/(.)\1/i.test(context.word)) {
                    return { bonus: 30, achievementCount: 1, contributingTileIds: new Set(context.tiles.map(t => t.id)) };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'word', // FIX #1
        id: 'base_all_one_pointers',
        description: () => '+20 points if all letters in a word are worth 1 point.',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('word' in context && context.tiles.every(t => t.value === 1)) {
                return {
                    bonus: 20,
                    achievementCount: 1,
                    contributingTileIds: new Set(context.tiles.map(t => t.id))
                };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'word', // FIX #1
        id: 'base_ends_in_s',
        description: () => '+25 points if a word ends in an "S".',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('word' in context && context.word.toUpperCase().endsWith('S')) {
                return {
                    bonus: 25,
                    achievementCount: 1,
                    contributingTileIds: new Set(context.tiles.map(t => t.id))
                };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },

    // --- BOARD-WIDE RULES ---
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_longest_word',
        description: () => '+10 points for every letter in the longest word.',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('wordToTilesMap' in context) {
                const words = Array.from(context.wordToTilesMap.keys());
                if (words.length === 0) return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
                const longestWord = words.reduce((a, b) => a.length >= b.length ? a : b);
                const bonus = longestWord.length * 10;
                const contributingTiles = context.wordToTilesMap.get(longestWord)!;
                return { bonus, achievementCount: longestWord.length, contributingTileIds: new Set(contributingTiles.map(t => t.id)) };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_word_count',
        description: () => '+5 points for every valid word on the board.',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('wordToTilesMap' in context) {
                const wordCount = context.wordToTilesMap.size;
                if (wordCount === 0) return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
                const bonus = wordCount * 5;
                const allTileIds = Array.from(context.wordToTilesMap.values()).flat().map(t => t.id);
                return { bonus, achievementCount: wordCount, contributingTileIds: new Set(allTileIds) };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_full_clear',
        description: () => '+250 points for using every tile from your hand.',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('handIsEmpty' in context && context.handIsEmpty) {
                const allTileIds = Array.from(context.wordToTilesMap.values()).flat().map(t => t.id);
                return { bonus: 250, achievementCount: 1, contributingTileIds: new Set(allTileIds) };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_unique_first_letters',
        description: () => '+75 points if every word starts with a different letter.',
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('wordToTilesMap' in context) {
                const words = Array.from(context.wordToTilesMap.keys());
                if (words.length < 2) return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
                const firstLetters = words.map(w => w.charAt(0).toUpperCase());
                if (firstLetters.length === new Set(firstLetters).size) {
                    const allTileIds = Array.from(context.wordToTilesMap.values()).flat().map(t => t.id);
                    return { bonus: 75, achievementCount: 1, contributingTileIds: new Set(allTileIds) };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_all_the_vowels',
        description: () => "+100 points for using 'A', 'E', 'I', 'O', and 'U' at least once.",
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('wordToTilesMap' in context) {
                const allLetters = new Set(Array.from(context.wordToTilesMap.values()).flat().map(t => t.letter.toUpperCase()));
                const vowels = ['A', 'E', 'I', 'O', 'U'];
                if (vowels.every(v => allLetters.has(v))) {
                    const allTileIds = Array.from(context.wordToTilesMap.values()).flat().map(t => t.id);
                    return { bonus: 100, achievementCount: 1, contributingTileIds: new Set(allTileIds) };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board', // FIX #1
        id: 'base_rare_letter_bonus',
        description: () => "+50 points for each 'J', 'Q', 'X', or 'Z' played.",
        apply: (context: WordContext | BoardContext) => {
            // FIX #2: Type guard
            if ('wordToTilesMap' in context) {
                const rareLetters = ['J', 'Q', 'X', 'Z'];
                const allTiles = Array.from(context.wordToTilesMap.values()).flat();
                const contributingTiles = allTiles.filter(t => rareLetters.includes(t.letter.toUpperCase()));
                if (contributingTiles.length > 0) {
                    return {
                        bonus: contributingTiles.length * 50,
                        achievementCount: contributingTiles.length,
                        contributingTileIds: new Set(contributingTiles.map(t => t.id))
                    };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
        {
        type: 'base',
        scope: 'word',
        id: 'base_vowel_ends',
        description: () => '+10 points for each word that starts and ends with a vowel.',
        apply: (context: WordContext | BoardContext) => {
            if ('word' in context) { // Type guard for WordContext
                const word = context.word.toUpperCase();
                const vowels = 'AEIOU';
                if (word.length > 1 && vowels.includes(word[0]) && vowels.includes(word[word.length - 1])) {
                    return {
                        bonus: 10,
                        achievementCount: 1,
                        contributingTileIds: new Set(context.tiles.map(t => t.id))
                    };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'word',
        id: 'base_symmetrical_word',
        description: () => '+15 points for each word that is a palindrome.',
        apply: (context: WordContext | BoardContext) => {
            if ('word' in context) {
                const isPalindrome = context.word.toLowerCase() === [...context.word.toLowerCase()].reverse().join('');
                if (context.word.length > 1 && isPalindrome) {
                    return {
                        bonus: 15,
                        achievementCount: 1,
                        contributingTileIds: new Set(context.tiles.map(t => t.id))
                    };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'word',
        id: 'base_three_of_a_kind',
        description: () => '+20 points for each word with the same letter three times.',
        apply: (context: WordContext | BoardContext) => {
            if ('word' in context) {
                const letterCounts = [...context.word.toUpperCase()].reduce((acc, char) => {
                    acc[char] = (acc[char] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                const hasThreeOfAKind = Object.values(letterCounts).some(count => count >= 3);
                if (hasThreeOfAKind) {
                    return {
                        bonus: 20,
                        achievementCount: 1,
                        contributingTileIds: new Set(context.tiles.map(t => t.id))
                    };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },

    // --- NEW BOARD-WIDE RULES ---
    {
        type: 'base',
        scope: 'board',
        id: 'base_numerical_word',
        description: () => 'Spell a number (1-100) to earn that number in bonus points.',
        apply: (context: WordContext | BoardContext) => {
            if ('wordToTilesMap' in context) {
                // A pre-defined map for number words and their values.
                const numberWords: Record<string, number> = {
                    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 
                    'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
                    'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18,
                    'nineteen': 19, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 
                    'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90, 'hundred': 100
                };
                
                let totalBonus = 0;
                let achievementCount = 0;
                const contributingTileIds = new Set<number>();
                
                for (const word of context.wordToTilesMap.keys()) {
                    const value = numberWords[word.toLowerCase()];
                    if (value) {
                        totalBonus += value;
                        achievementCount++;
                        context.wordToTilesMap.get(word)!.forEach(tile => contributingTileIds.add(tile.id));
                    }
                }
                
                return {
                    bonus: totalBonus,
                    achievementCount: achievementCount,
                    contributingTileIds: contributingTileIds
                };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    {
        type: 'base',
        scope: 'board',
        id: 'base_no_three_letter_words',
        description: () => '+50 points if there are no 3-letter words on the board.',
        apply: (context: WordContext | BoardContext) => {
            if ('wordToTilesMap' in context) {
                const words = Array.from(context.wordToTilesMap.keys());
                const hasThreeLetterWord = words.some(word => word.length === 3);

                if (words.length > 0 && !hasThreeLetterWord) {
                    const allTileIds = Array.from(context.wordToTilesMap.values()).flat().map(t => t.id);
                    return { bonus: 50, achievementCount: 1, contributingTileIds: new Set(allTileIds) };
                }
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
];

export const skillMultiplierRules: SkillMultiplierRule[] = [
    // Example TYPE Multiplying Rule
    {
        type: 'skill',
        id: 'skill_daily_type',
        description: ({ typeOfTheDay }) =>
            `Forming a ${typeOfTheDay?.name || 'designated'} adds +${typeOfTheDay?.multiplier || 'X'}x to your score multiplier!`,
        apply: ({ word, tiles, typeOfTheDay }) => {

            if (!typeOfTheDay) {
                return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
            }

            const wordData = dictionary.get(word.toLowerCase());
            if (wordData?.type && wordData.type.includes(typeOfTheDay.name as any)) {
                // Here, the 'bonus' is the multiplier value.
                return { bonus: typeOfTheDay.multiplier, achievementCount: 1, contributingTileIds: new Set(tiles.map(t => t.id)) };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    // Example THEME Multiplying Rule
    {
        type: 'skill',
        id: 'skill_daily_theme',
        // The description is a function that dynamically creates the text
        description: ({ themeOfTheDay }) =>
            `Forming a ${themeOfTheDay?.name || 'designated'} themed word adds +${themeOfTheDay?.multiplier || 'X'}x to your score multiplier!`,
        apply: (context: WordContext) => {
            const { word, tiles, themeOfTheDay } = context;
            // If there is no theme for the day, this rule does nothing.
            if (!themeOfTheDay) {
                return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
            }


            const wordData = dictionary.get(word.toLowerCase());
            console.log(`Checking word: ${word} and theme: ${themeOfTheDay.name}`);
            console.log('Word data from dictionary:', wordData);
            // Check if the word's theme matches the theme of the day
            if (
                wordData?.theme &&
                wordData.theme.includes(themeOfTheDay.name as any) // Cast to any or WordTheme
            ) {
                return {
                    bonus: themeOfTheDay.multiplier, // The 'bonus' is the multiplier value
                    achievementCount: 1,
                    contributingTileIds: new Set(tiles.map(t => t.id))
                };
            }

            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
];
// {
//     type: 'skill',
//     id: 'skill_no_vowels',
//     description: () => 'A word with no vowels adds a massive +1.5x to your score multiplier!',
//     apply: (context: WordContext) => {
//         const vowels = ['A', 'E', 'I', 'O', 'U'];
//         const hasNoVowels = ![...context.word.toUpperCase()].some(char => vowels.includes(char));
//         if (hasNoVowels) {
//             return {
//                 bonus: 1.5,
//                 achievementCount: 1,
//                 contributingTileIds: new Set(context.tiles.map(t => t.id))
//             };
//         }
//         return {
//             bonus: 0,
//             achievementCount: 0,
//             contributingTileIds: new Set()
//         };
//     }
// }
// ];

export const connectorRules: ConnectorRule[] = [
    {
        type: 'connector',
        id: 'connect_anchor',
        description: () => "If a word's first or last letter is part of another word, their scores are combined and multiplied!",
        apply: ({ wordToTilesMap }) => {
            const connectedGroups: string[][] = [];
            const words = Array.from(wordToTilesMap.keys());

            for (let i = 0; i < words.length; i++) {
                for (let j = i + 1; j < words.length; j++) {
                    const wordA = words[i];
                    const wordB = words[j];
                    const tilesA = new Set(wordToTilesMap.get(wordA)!.map(t => `${t.gridX},${t.gridY}`));
                    const tilesB = wordToTilesMap.get(wordB)!;

                    // Check if the first or last tile of word B is in the set of tiles for word A
                    const firstTileBPos = `${tilesB[0].gridX},${tilesB[0].gridY}`;
                    const lastTileBPos = `${tilesB[tilesB.length - 1].gridX},${tilesB[tilesB.length - 1].gridY}`;

                    if (tilesA.has(firstTileBPos) || tilesA.has(lastTileBPos)) {
                        // Found a connection!
                        connectedGroups.push([wordA, wordB]);
                    }
                }
            }
            return { ruleId: 'connect_anchor', connectedGroups };
        },
    },
    {
        type: 'connector',
        id: 'connect_same_length',
        description: () => "If two intersecting words have the same length, their scores are combined and multiplied!",
        apply: ({ wordToTilesMap }) => {
            const connectedGroups: string[][] = [];
            const words = Array.from(wordToTilesMap.keys());

            for (let i = 0; i < words.length; i++) {
                for (let j = i + 1; j < words.length; j++) {
                    const wordA = words[i];
                    const wordB = words[j];

                    if (wordA.length !== wordB.length) continue; // Skip if lengths don't match

                    const tilesA = wordToTilesMap.get(wordA)!;
                    const tilePositionsB = new Set(wordToTilesMap.get(wordB)!.map(t => `${t.gridX},${t.gridY}`));

                    // Check for any intersection
                    if (tilesA.some(t => tilePositionsB.has(`${t.gridX},${t.gridY}`))) {
                        connectedGroups.push([wordA, wordB]);
                    }
                }
            }
            return { ruleId: 'connect_same_length', connectedGroups };;
        },
    },
    {
        type: 'connector',
        id: 'connect_same_theme',
        description: () => 'If two intersecting words share the same theme, their scores are combined and multiplied!',
        apply: ({ wordToTilesMap, dictionary }) => {
            const connectedGroups: string[][] = [];
            const words = Array.from(wordToTilesMap.keys());

            for (let i = 0; i < words.length; i++) {
                for (let j = i + 1; j < words.length; j++) {
                    const wordA = words[i];
                    const wordB = words[j];

                    const dataA = dictionary.get(wordA.toLowerCase());
                    const dataB = dictionary.get(wordB.toLowerCase());

                    // Check if they have at least one matching, defined theme
                    if (!dataA?.theme || !dataB?.theme) continue;
                    const themesA = Array.isArray(dataA.theme) ? dataA.theme : [dataA.theme];
                    const themesB = Array.isArray(dataB.theme) ? dataB.theme : [dataB.theme];
                    const hasCommonTheme = themesA.some(theme => themesB.includes(theme));
                    if (!hasCommonTheme) continue;

                    const tilesA = wordToTilesMap.get(wordA)!;
                    const tilePositionsB = new Set(wordToTilesMap.get(wordB)!.map(t => `${t.gridX},${t.gridY}`));

                    // Check for intersection
                    if (tilesA.some(t => tilePositionsB.has(`${t.gridX},${t.gridY}`))) {
                        // If both conditions are met, this pair is a "connection".
                        connectedGroups.push([wordA, wordB]);
                    }
                }
            }
            return { ruleId: 'connect_same_theme', connectedGroups };
        },
    },
];

// export interface RuleContext {
//     validWords: string[];
//     wordToTilesMap: Map<string, PlacedTile[]>;
//     allValidTiles: Map<number, PlacedTile>;
//     basePoints: number;
//     totalLengths: number;
// }

// export interface RuleApplicationResult {
//     bonus: number;
//     contributingTileIds: Set<number>;
//     achievementCount: number;
// }

// export interface Rule {
//     id: string;
//     description: string;
//     apply: (context: RuleContext) => RuleApplicationResult;
// }

// export interface RuleCategory {
//     id: string;
//     name: string;
//     rules: Rule[];
// }

// export const RuleCategories: RuleCategory[] = [
//     {
//         id: 'cat_length',
//         name: 'Word Length Bonuses',
//         rules: [
//             {
//                 id: 'len_3',
//                 description: 'Double points for each 3-letter word formed.',
//                 apply: ({ wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     const contributingTileIds = new Set<number>();
//                     for (const [word, tiles] of wordToTilesMap.entries()) {
//                         if (word.length === 3) {
//                             achievementCount++;
//                             tiles.forEach(tile => {
//                                 bonus += tile.value;
//                                 contributingTileIds.add(tile.id);
//                             });
//                         }
//                     }
//                     return { bonus, contributingTileIds, achievementCount };
//                 },
//             },
//             {
//                 id: 'len_5_plus',
//                 description: '+50 bonus points for each word with 5 or more letters.',
//                 apply: ({ wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     const contributingTileIds = new Set<number>();
//                     for (const [word, tiles] of wordToTilesMap.entries()) {
//                         if (word.length >= 5) {
//                             bonus += 50;
//                             achievementCount++;
//                             tiles.forEach(tile => {
//                                 bonus += tile.value;
//                                 contributingTileIds.add(tile.id);
//                             });
//                         }
//                     }
//                     return { bonus, contributingTileIds, achievementCount };
//                 },
//             },
//             {
//                 id: 'len_7_plus',
//                 description: '+100 bonus points for each word with 7 or more letters.',
//                 apply: ({ wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     const contributingTileIds = new Set<number>();
//                     for (const [word, tiles] of wordToTilesMap.entries()) {
//                         if (word.length >= 7) {
//                             bonus += 100;
//                             achievementCount++;
//                             tiles.forEach(tile => {
//                                 bonus += tile.value;
//                                 contributingTileIds.add(tile.id);
//                             });
//                         }
//                     }
//                     return { bonus, contributingTileIds, achievementCount };
//                 },
//             },
//         ],
//     },
//     {
//         id: 'cat_letters',
//         name: 'Specific Letter Bonuses',
//         rules: [
//             {
//                 id: 'let_rare',
//                 description: "+75 bonus points for using a 'J', 'Q', 'X', or 'Z'.",
//                 apply: ({ allValidTiles }) => {
//                     const rareLetters = ['J', 'Q', 'X', 'Z'];
//                     for (const tile of allValidTiles.values()) {
//                         if (rareLetters.includes(tile.letter.toUpperCase())) {
//                             return { bonus: 75, contributingTileIds: new Set([tile.id]), achievementCount: 1 };
//                         }
//                     }
//                     return { bonus: 0, contributingTileIds: new Set(), achievementCount: 0 };
//                 },
//             },
//             {
//                 id: 'let_no_vowels',
//                 description: 'Spell a word with no vowels (A,E,I,O,U) for a 100 point bonus.',
//                 apply: ({ wordToTilesMap }) => {
//                     const vowels = ['A', 'E', 'I', 'O', 'U'];
//                     const contributingTileIds = new Set<number>();
//                     for (const [word, tiles] of wordToTilesMap.entries()) {
//                         if (![...word.toUpperCase()].some(char => vowels.includes(char))) {
//                             tiles.forEach(t => contributingTileIds.add(t.id));
//                             return { bonus: 100, contributingTileIds, achievementCount: 1 }; // Award once
//                         }
//                     }
//                     return { bonus: 0, contributingTileIds: new Set(), achievementCount: 0 };
//                 },
//             },
//             {
//                 id: 'let_ends_s',
//                 description: 'Words ending with "S" score an extra 50 points.',
//                 apply: ({ wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     const contributingTileIds = new Set<number>();
//                     for (const [word, tiles] of wordToTilesMap.entries()) {
//                         if (word.endsWith('S') || word.endsWith('s')) {
//                             bonus += 50;
//                             achievementCount++;
//                             tiles.forEach(tile => {
//                                 contributingTileIds.add(tile.id);
//                             });
//                         }
//                     }
//                     return { bonus, contributingTileIds, achievementCount };
//                 }
//             },
//         ],
//     },
//     {
//         id: 'cat_word_score',
//         name: 'Word Score Bonuses',
//         rules: [
//             {
//                 id: 'sb_over_20',
//                 description: 'If the total score for a word is over 20, add a bonus of 40 points.',
//                 apply: ({ validWords, wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     for (const word of validWords) {
//                         const tiles = wordToTilesMap.get(word) || [];
//                         const totalScore = tiles.reduce((sum, tile) => sum + tile.value, 0);
//                         if (totalScore > 20) {
//                             bonus += 40;
//                             achievementCount++;
//                         }
//                     }
//                     return { bonus, contributingTileIds: new Set(), achievementCount };
//                 },
//             },
//             {
//                 id: 'sb_all_ones',
//                 description: 'If all tiles in a word are worth 1 point, add a bonus of 20 points.',
//                 apply: ({ wordToTilesMap }) => {
//                     let bonus = 0;
//                     let achievementCount = 0;
//                     const contributingTileIds = new Set<number>();
//                     for (const [, tiles] of wordToTilesMap.entries()) {
//                         if (tiles.every(tile => tile.value === 1)) {
//                             bonus += 20;
//                             achievementCount++;
//                             tiles.forEach(tile => contributingTileIds.add(tile.id));
//                         }
//                     }
//                     return { bonus, contributingTileIds, achievementCount };
//                 },
//             }
//         ]
//     },
//     // {
//     //     id: 'cat_theme',
//     //     name: 'Themed Word Bonuses',
//     //     rules: [
//     //         {
//     //             id: 'nature_double_points',
//     //             description: 'Double points for each word related to nature.',
//     //             apply: ({ wordToTilesMap }) => {
//     //                 let bonus = 0;
//     //                 let achievementCount = 0;
//     //                 const contributingTileIds = new Set<number>();
//     //                 for (const [word, tiles] of wordToTilesMap.entries()) {
//     //                     const lowercasedWord = word.toLowerCase();
//     //                     const lemma = lemmatizer(lowercasedWord);

//     //                     // 2. Look up the LEMMA in our dictionary to get its data.
//     //                     //    We are no longer looking up the inflected word "trees".
//     //                     const wordData = dictionary.get(lemma);
//     //                     if (wordData?.theme === 'Nature') {
//     //                         achievementCount++;
//     //                         const wordBaseValue = tiles.reduce((sum, tile) => sum + tile.value, 0);
//     //                         bonus += wordBaseValue;

//     //                         tiles.forEach(tile => contributingTileIds.add(tile.id));
//     //                     }
//     //                 }

//     //                 return { bonus, contributingTileIds, achievementCount };
//     //             },
//     //         },
//     //         // You can add more theme-based rules here in the future
//     //     ],
//     // },
// ];