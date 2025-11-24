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
  { name: 'Anatomy', multiplier: 3.3, examples: ['skeletal', 'muscular', 'physiology'] },
  { name: 'Art', multiplier: 2.3, examples: ['painting', 'sculpture', 'photography'] },
  { name: 'Beverages', multiplier: 6.3, examples: ['drinking', 'flavored', 'alcohol'] },
  { name: 'Clothing', multiplier: 2.2, examples: ['trousers', 'underwear', 'uniforms'] },
  { name: 'Conflict', multiplier: 3.0, examples: ['fighting', 'struggle', 'violence'] },
  { name: 'Education', multiplier: 4.2, examples: ['teaching', 'students', 'academic'] },
  { name: 'Emotions', multiplier: 2.5, examples: ['feelings', 'excitement', 'sympathy'] },
  { name: 'Fauna', multiplier: 2.9, examples: ['elephant', 'wildlife', 'reptiles'] },
  { name: 'Flora', multiplier: 3.1, examples: ['vegetation', 'woodland', 'flowering'] },
  { name: 'Food', multiplier: 2.3, examples: ['ingredients', 'barbecue', 'breakfast'] },
  { name: 'Geography', multiplier: 6.3, examples: ['landscape', 'geological', 'vegetation'] },
  { name: 'Health', multiplier: 5.7, examples: ['medicine', 'hospital', 'nutrition'] },
  { name: 'Insects', multiplier: 4.1, examples: ['mosquito', 'butterflies', 'cockroach'] },
  { name: 'Language', multiplier: 2.6, examples: ['dialects', 'vocabulary ', 'translation'] },
  { name: 'Literature', multiplier: 4.7, examples: ['biography', 'anthology', 'narrative'] },
  { name: 'Materials', multiplier: 2.5, examples: ['aluminum', 'textiles', 'metallic'] },
  { name: 'Mathematics', multiplier: 5.9, examples: ['arithmetic', 'geometry', 'equation'] },
  { name: 'Movement', multiplier: 2.7, examples: ['direction', 'distance', 'velocity'] },
  { name: 'Music', multiplier: 3.2, examples: ['acoustic', 'recording', 'performed'] },
  { name: 'Mythology', multiplier: 2.8, examples: ['folklore', 'deities', 'supernatural'] },
  { name: 'Nature', multiplier: 3.6, examples: ['wildlife', 'biodiversity', 'environment'] },
  { name: 'Personality', multiplier: 4.8, examples: ['criminal', 'behavior', 'attitude'] },
  { name: 'Philosophy', multiplier: 4.0, examples: ['concepts', 'reasoning', 'theories'] },
  { name: 'Relationships', multiplier: 6.4, examples: ['marriage', 'friendship', 'families'] },
  { name: 'Science', multiplier: 2.1, examples: ['research', 'laboratory', 'experimentS'] },
  { name: 'Space', multiplier: 4.6, examples: ['universe', 'orbiting', 'galactic'] },
  { name: 'Sports', multiplier: 4.6, examples: ['football', 'tournament', 'basketball'] },
  { name: 'Time', multiplier: 4.5, examples: ['calendar', 'preceding', 'starting'] },
  { name: 'Tools', multiplier: 3.4, examples: ['instrument', 'hardware', 'mechanism'] },
  { name: 'Weather', multiplier: 6.9, examples: ['temperatures', 'rainfall', 'hurricane'] }
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
    examples: ['carefully', 'later', 'quickly']
  }
];