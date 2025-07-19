export interface ThemeData {
  name: string;
  multiplier: number;
  examples: [string, string, string]; // Example words for the theme
}

export interface TypeData {
  name: string;
  multiplier: number;
  examples: [string, string, string]; // Example words for the type
}

// We use an array to make it easy to pick a random one.
export const allThemes: ThemeData[] = [
  { name: 'Abstraction', multiplier: 2.0, examples: ['forgotten', 'planning', 'disappeared'] },
  { name: 'Housing', multiplier: 5.0, examples: ['sleeping', 'everywhere', 'drinking'] },
  { name: 'Recreation', multiplier: 4.3, examples: ['mountain', 'football', 'community'] },
  { name: 'Ownership', multiplier: 5.6, examples: ['director', 'interest', 'responsible'] },
  { name: 'Existence', multiplier: 6.0, examples: ['disappear', 'becoming', 'presence'] },
  { name: 'Movement', multiplier: 2.7, examples: ['operation', 'planning', 'training'] },
  { name: 'Travel', multiplier: 6.1, examples: ['planning', 'universe', 'challenge'] },
  { name: 'Death', multiplier: 2.7, examples: ['birthday', 'watching', 'terrible'] },
  { name: 'Conflict', multiplier: 3.0, examples: ['fighting', 'girlfriend', 'relationship'] },
  { name: 'Freedom', multiplier: 5.0, examples: ['themselves', 'ourselves', 'responsible'] },
  { name: 'Weakness', multiplier: 3.8, examples: ['protection', 'stronger', 'stealing'] },
  { name: 'Change', multiplier: 5.3, examples: ['decision', 'difference', 'promised'] },
  { name: 'Mythology', multiplier: 2.8, examples: ['friendship', 'creature', 'darkness'] },
  { name: 'Language', multiplier: 2.6, examples: ['attention', 'situation', 'government'] },
  { name: 'Anatomy', multiplier: 3.3, examples: ['shoulder', 'studying', 'education'] },
  { name: 'Imagination', multiplier: 3.6, examples: ['situation', 'surprise', 'personal'] },
  { name: 'Mystery', multiplier: 3.1, examples: ['birthday', 'watching', 'security'] },
  { name: 'Danger', multiplier: 4.8, examples: ['screaming', 'involved', 'decision'] },
  { name: 'Perception', multiplier: 2.9, examples: ['feelings', 'narrator', 'language'] },
  { name: 'Objects', multiplier: 3.5, examples: ['planning', 'recognize', 'challenge'] },
  { name: 'Clothing', multiplier: 2.2, examples: ['standing', 'position', 'involved'] },
  { name: 'Shapes', multiplier: 2.4, examples: ['creatures', 'homework', 'construction'] },
  { name: 'Art', multiplier: 2.3, examples: ['watching', 'building', 'information'] },
  { name: 'Beauty', multiplier: 2.1, examples: ['relationship', 'pleasure', 'congratulations'] },
  { name: 'Strength', multiplier: 4.4, examples: ['military', 'practice', 'strength'] },
  { name: 'Tools', multiplier: 3.4, examples: ['professional', 'carefully', 'performance'] },
  { name: 'Technology', multiplier: 4.0, examples: ['computer', 'pictures', 'interest'] },
  { name: 'Energy', multiplier: 5.9, examples: ['powerful', 'breaking', 'universe'] },
  { name: 'Time', multiplier: 4.5, examples: ['speaking', 'happening', 'watching'] },
  { name: 'Emotions', multiplier: 2.5, examples: ['marriage', 'attention', 'situation'] },
  { name: 'Personality', multiplier: 4.8, examples: ['criminal', 'character', 'happiness'] },
  { name: 'Performance', multiplier: 5.4, examples: ['strength', 'powerful', 'operation'] },
  { name: 'Size', multiplier: 6.6, examples: ['comfortable', 'character', 'distance'] },
  { name: 'Health', multiplier: 5.7, examples: ['problems', 'government', 'personal'] },
  { name: 'Economy', multiplier: 5.5, examples: ['military', 'opportunity', 'restaurant'] },
  { name: 'Law', multiplier: 5.4, examples: ['detective', 'fighting', 'decision'] },
  { name: 'Politics', multiplier: 4.4, examples: ['information', 'marriage', 'dangerous'] },
  { name: 'Education', multiplier: 4.2, examples: ['evidence', 'security', 'information'] },
  { name: 'Morality', multiplier: 5.6, examples: ['sacrifice', 'circumstances', 'attitude'] },
  { name: 'Fauna', multiplier: 2.9, examples: ['elephant', 'hercules', 'ancestors'] },
  { name: 'Geography', multiplier: 6.3, examples: ['education', 'politics', 'religion'] },
  { name: 'Spirituality', multiplier: 5.1, examples: ['universe', 'believed', 'happiness'] },
  { name: 'Culture', multiplier: 3.8, examples: ['fighting', 'relationship', 'screaming'] },
  { name: 'Science', multiplier: 2.1, examples: ['watching', 'evidence', 'security'] },
  { name: 'Philosophy', multiplier: 4.0, examples: ['medicine', 'community', 'knowledge'] },
  { name: 'Position', multiplier: 4.2, examples: ['standing', 'lieutenant', 'relationship'] },
  { name: 'Materials', multiplier: 2.5, examples: ['painting', 'chocolate', 'carrying'] },
  { name: 'Corruption', multiplier: 3.9, examples: ['murdered', 'arrested', 'breaking'] },
  { name: 'Space', multiplier: 4.6, examples: ['computer', 'ourselves', 'bathroom'] },
  { name: 'Quantity', multiplier: 3.4, examples: ['numerous', 'plentiful', 'massive'] },
  { name: 'Food', multiplier: 2.3, examples: ['president', 'watching', 'building'] },
  { name: 'Measurement', multiplier: 6.5, examples: ['explanation', 'homework', 'designed'] },
  { name: 'Truth', multiplier: 5.2, examples: ['straight', 'absolute', 'right'] },
  { name: 'Nature', multiplier: 3.6, examples: ['happiness', 'property', 'discovered'] },
  { name: 'Mathematics', multiplier: 5.9, examples: ['students', 'medicine', 'distance'] },
  { name: 'Occupations', multiplier: 5.2, examples: ['training', 'medicine', 'responsibility'] },
  { name: 'Cooperation', multiplier: 3.7, examples: ['opportunity', 'language', 'conversation'] },
  { name: 'Humor', multiplier: 6.7, examples: ['apologize', 'applause', 'conversation'] },
  { name: 'Flora', multiplier: 3.1, examples: ['prescription', 'biological', 'expedition'] },
  { name: 'Literature', multiplier: 4.7, examples: ['knowledge', 'television', 'violence'] },
  { name: 'Music', multiplier: 3.2, examples: ['situation', 'government', 'fighting'] },
  { name: 'Growth', multiplier: 6.2, examples: ['performance', 'technology', 'progress'] },
  { name: 'Finance', multiplier: 5.8, examples: ['criminal', 'training', 'research'] },
  { name: 'Relationships', multiplier: 6.4, examples: ['fighting', 'girlfriend', 'relationship'] },
  { name: 'Sports', multiplier: 4.6, examples: ['starting', 'position', 'boyfriend'] },
  { name: 'Causality', multiplier: 6.7, examples: ['relations', 'conclusion', 'principle'] },
  { name: 'Etiquette', multiplier: 6.8, examples: ['greetings', 'occasion', 'intention'] },
  { name: 'Safety', multiplier: 6.1, examples: ['shooting', 'responsible', 'military'] },
  { name: 'Warfare', multiplier: 4.9, examples: ['powerful', 'soldiers', 'operation'] },
  { name: 'Hope', multiplier: 6.5, examples: ['laughing', 'wonderful', 'chuckles'] },
  { name: 'Probability', multiplier: 7.0, examples: ['generous', 'gambling', 'confident'] },
  { name: 'Aging', multiplier: 6.9, examples: ['survival', 'centuries', 'medication'] },
  { name: 'Weather', multiplier: 6.9, examples: ['temperatures', 'mornings', 'airborne'] },
  { name: 'Insects', multiplier: 4.1, examples: ['servants', 'terrorists', 'aircraft'] },
  { name: 'Beverages', multiplier: 6.3, examples: ['cocktail', 'products', 'umbrella'] }
];

export const allTypes: TypeData[] = [
  {
    name: 'noun',
    multiplier: 2.0,
    examples: ['information', 'community', 'knowledge']
  },
  {
    name: 'verb',
    multiplier: 2.6,
    examples: ['understand', 'continue', 'remember']
  },
  {
    name: 'adjective',
    multiplier: 3.2,
    examples: ['beautiful', 'important', 'different']
  },
  {
    name: 'adverb',
    multiplier: 4.5,
    examples: ['especially', 'actually', 'probably']
  },
  {
    name: 'conjunction',
    multiplier: 5.1,
    // It's extremely rare for conjunctions to be long. Common examples are best.
    examples: ['however', 'although', 'because']
  },
  {
    name: 'interjection',
    multiplier: 5.8,
    // Interjections are almost always short.
    examples: ['congratulations', 'absolutely', 'welcome']
  },
  {
    name: 'preposition',
    multiplier: 6.4,
    // Long prepositions are very rare.
    examples: ['underneath', 'throughout', 'concerning']
  },
  {
    name: 'pronoun',
    multiplier: 7.0,
    // Long pronouns are very rare.
    examples: ['everybody', 'themselves', 'ourselves']
  },
];