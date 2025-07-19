// --- Define the types that the rest of the app will use ---
// --- Define the types ---
//export type WordType = "adverbs" | "adjectives" | "verbs" | "nouns" | "interjections" | "prepositions" | "conjunctions";
//export type WordTheme = "Animals" | "Food" | "Nature" | "Numbers" | "School" | "Emotions" | "Music" | "Body" | "Books" | "Calendar" | "Colours" | "Transportation" | "Technology" | "Weather" | "Sports" | "Clothing" ;
export type WordTheme = "Nature" | "Weather" | "Flora" | "Fauna" | "Insects" | "Anatomy" | "Perception" | "Health" | "Food" | "Beverages" | "Clothing" | "Housing" | "Tools" | "Technology" | "Science" | "Mathematics" | "Measurement" | "Energy" | "Materials" | "Shapes" | "Time" | "Space" | "Movement" | "Travel" | "Geography" | "Economy" | "Finance" | "Occupations" | "Law" | "Politics" | "Warfare" | "Spirituality" | "Emotions" | "Personality" | "Relationships" | "Etiquette" | "Culture" | "Language" | "Education" | "Philosophy" | "Literature" | "Art" | "Music" | "Performance" | "Sports" | "Recreation" | "Humor" | "Imagination" | "Mythology" | "Danger" | "Safety" | "Death" | "Growth" | "Aging" | "Beauty" | "Strength" | "Weakness" | "Morality" | "Corruption" | "Conflict" | "Cooperation" | "Size" | "Quantity" | "Change" | "Causality" | "Probability" | "Truth" | "Mystery" | "Hope" | "Freedom" | "Ownership" | "Position" | "Existence" | "Abstraction" | "Objects"
// export const TYPES = ["noun", "verb", "adjective", "adverb", "pronoun", "determiner", "preposition", "conjunction", "interjection"];
export type WordType = "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "determiner" | "preposition" | "conjunction" | "interjection";
export interface WordData {
  theme?: WordTheme[]; // plural, now an array
  type?: WordType[];   // plural, now an array
}

// --- The SINGLE SOURCE OF TRUTH ---
// This is exported directly. Your rules.ts file will import this.
export let dictionary: Map<string, WordData> = new Map();

// --- The Initializer ---
let hasInitialized = false;
const DICTIONARY_URL = 'https://pdsx74vla44vq2mf.public.blob.vercel-storage.com/scrabdle-dictionary2-LGI86WUt0K3Q4Cq1as8fhzmcsVMgDg.json';

export async function initializeDictionary(): Promise<void> {
  if (hasInitialized) return;
  hasInitialized = true;

  console.log("Initializing global dictionary...");
  try {
    const response = await fetch(DICTIONARY_URL);
    if (!response.ok) throw new Error("Failed to fetch dictionary");
    const data: [string, WordData][] = await response.json();

    // This MUTATES the exported variable. Any file that imported it
    // will now see the populated data.
    dictionary = new Map(data);

    console.log(`Global dictionary initialized with ${dictionary.size} words.`);
  } catch (error) {
    console.error("Could not initialize dictionary:", error);
  }
}