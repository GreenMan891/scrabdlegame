import { PlacedTile } from "@/components/game/Game";

export interface RuleContext {
    validWords: string[];
    wordToTilesMap: Map<string, PlacedTile[]>;
    allValidTiles: Map<number, PlacedTile>;
    basePoints: number;
    totalLengths: number;
}

export interface RuleApplicationResult {
    bonus: number;
    contributingTileIds: Set<number>;
    achievementCount: number;
}

export interface Rule {
    id: string;
    description: string;
    apply: (context: RuleContext) => RuleApplicationResult;
}

export interface RuleCategory {
    id: string;
    name: string;
    rules: Rule[];
}

export const RuleCategories: RuleCategory[] = [
    {
        id: 'cat_length',
        name: 'Word Length Bonuses',
        rules: [
            {
                id: 'len_3',
                description: 'Double points for each 3-letter word formed.',
                apply: ({ wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (word.length === 3) {
                            achievementCount++;
                            tiles.forEach(tile => {
                                bonus += tile.value;
                                contributingTileIds.add(tile.id);
                            });
                        }
                    }
                    return { bonus, contributingTileIds, achievementCount };
                },
            },
            {
                id: 'len_5_plus',
                description: '+50 bonus points for each word with 5 or more letters.',
                apply: ({ wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (word.length >= 5) {
                            bonus += 50;
                            achievementCount++;
                            tiles.forEach(tile => {
                                bonus += tile.value;
                                contributingTileIds.add(tile.id);
                            });
                        }
                    }
                    return { bonus, contributingTileIds, achievementCount };
                },
            },
            {
                id: 'len_7_plus',
                description: '+100 bonus points for each word with 7 or more letters.',
                apply: ({ wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (word.length >= 7) {
                            bonus += 100;
                            achievementCount++;
                            tiles.forEach(tile => {
                                bonus += tile.value;
                                contributingTileIds.add(tile.id);
                            });
                        }
                    }
                    return { bonus, contributingTileIds, achievementCount };
                },
            },
        ],
    },
    {
        id: 'cat_letters',
        name: 'Specific Letter Bonuses',
        rules: [
            {
                id: 'let_rare',
                description: "+75 bonus points for using a 'J', 'Q', 'X', or 'Z'.",
                apply: ({ allValidTiles }) => {
                    const rareLetters = ['J', 'Q', 'X', 'Z'];
                    for (const tile of allValidTiles.values()) {
                        if (rareLetters.includes(tile.letter.toUpperCase())) {
                            return { bonus: 75, contributingTileIds: new Set([tile.id]), achievementCount: 1 };
                        }
                    }
                    return { bonus: 0, contributingTileIds: new Set(), achievementCount: 0 };
                },
            },
            {
                id: 'let_no_vowels',
                description: 'Spell a word with no vowels (A,E,I,O,U) for a 100 point bonus.',
                apply: ({ wordToTilesMap }) => {
                    const vowels = ['A', 'E', 'I', 'O', 'U'];
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (![...word.toUpperCase()].some(char => vowels.includes(char))) {
                            tiles.forEach(t => contributingTileIds.add(t.id));
                            return { bonus: 100, contributingTileIds, achievementCount: 1 }; // Award once
                        }
                    }
                    return { bonus: 0, contributingTileIds: new Set(), achievementCount: 0 };
                },
            },
            {
                id: 'let_ends_s',
                description: 'Words ending with "S" score an extra 50 points.',
                apply: ({ wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (word.endsWith('S') || word.endsWith('s')) {
                            bonus += 50;
                            achievementCount++;
                            tiles.forEach(tile => {
                                contributingTileIds.add(tile.id);
                            });
                        }
                    }
                    return { bonus, contributingTileIds, achievementCount };
                }
            },
        ],
    },
    {
        id: 'cat_word_score',
        name: 'Word Score Bonuses',
        rules: [
            {
                id: 'sb_over_20',
                description: 'If the total score for a word is over 20, add a bonus of 40 points.',
                apply: ({ validWords, wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    for (const word of validWords) {
                        const tiles = wordToTilesMap.get(word) || [];
                        const totalScore = tiles.reduce((sum, tile) => sum + tile.value, 0);
                        if (totalScore > 20) {
                            bonus += 40;
                            achievementCount++;
                        }
                    }
                    return { bonus, contributingTileIds: new Set(), achievementCount };
                },
            },
            {
                id: 'sb_all_ones',
                description: 'If all tiles in a word are worth 1 point, add a bonus of 20 points.',
                apply: ({ wordToTilesMap }) => {
                    let bonus = 0;
                    let achievementCount = 0;
                    const contributingTileIds = new Set<number>();
                    for (const [word, tiles] of wordToTilesMap.entries()) {
                        if (tiles.every(tile => tile.value === 1)) {
                            bonus += 20;
                            achievementCount++;
                            tiles.forEach(tile => contributingTileIds.add(tile.id));
                        }
                    }
                    return { bonus, contributingTileIds, achievementCount };
                },
            }
        ]
    }
];