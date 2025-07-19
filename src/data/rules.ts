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
    description: (context: DescriptionContext) => string; // Use the context object
    apply: (context: WordContext) => RuleApplicationResult;
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
        id: 'base_bonus_letter',
        description: ({ bonusLetterData }) => {
            if (bonusLetterData?.letter) {
                return `+${bonusLetterData.value * 10} points for using the bonus letter '${bonusLetterData.letter}'`;
            }
            return "+0 points for using the bonus letter (no bonus letter set)";
        },
        apply: ({ word, tiles, bonusLetterData }) => {
            if (!bonusLetterData) return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
            if (word.toUpperCase().includes(bonusLetterData.letter)) {
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
        id: 'base_double_letters',
        description: () => '+30 points if a word has back-to-back letters (e.g., "BOOK").',
        apply: ({ word, tiles }) => {
            if (/(.)\1/i.test(word)) {
                return { bonus: 30, achievementCount: 1, contributingTileIds: new Set(tiles.map(t => t.id)) };
            }
            return { bonus: 0, achievementCount: 0, contributingTileIds: new Set() };
        },
    },
    // {
    //     id: 'base_word_length',
    //     description: () => '+20 points per letter for words between 3 and 7 letters long.',
    //     apply: ({ word, tiles }) => {
    //         const len = word.length;
    //         if (len >= 3 && len <= 7) {
    //             return len * 20;
    //         }
    //         return 0;
    //     },
    // },
    {
        type: 'base',
        id: 'base_all_one_pointers',
        description: () => '+20 points if all letters in a word are worth 1 point.',
        apply: (context: WordContext) => {
            if (context.tiles.every(t => t.value === 1)) {
                return {
                    bonus: 20,
                    achievementCount: 1,
                    contributingTileIds: new Set(context.tiles.map(t => t.id))
                };
            }
            return {
                bonus: 0,
                achievementCount: 0,
                contributingTileIds: new Set()
            };
        },
    },
    {
        type: 'base',
        id: 'base_ends_in_s',
        description: () => '+25 points if a word ends in an "S".',
        apply: ({ word, tiles }) => {
            if (word.toUpperCase().endsWith('S')) {
                return {
                    bonus: 25,
                    achievementCount: 1,
                    contributingTileIds: new Set(tiles.map(t => t.id))
                };
            }
            return {
                bonus: 0,
                achievementCount: 0,
                contributingTileIds: new Set()
            };
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

            const lemma = lemmatizer(word.toLowerCase());
            const wordData = dictionary.get(lemma);
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

            const lemma = lemmatizer(word.toLowerCase());
            const wordData = dictionary.get(lemma);
            console.log(`Checking word: ${word} with lemma: ${lemma} and theme: ${themeOfTheDay.name}`);

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

                    const dataA = dictionary.get(lemmatizer(wordA.toLowerCase()));
                    const dataB = dictionary.get(lemmatizer(wordB.toLowerCase()));

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