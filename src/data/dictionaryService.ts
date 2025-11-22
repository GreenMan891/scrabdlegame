export type WordTheme =
  | "Weather"
  | "Tools"
  | "Time"
  | "Sports"
  | "Space"
  | "Shapes"
  | "Science"
  | "Relationships"
  | "Philosophy"
  | "Personality"
  | "Occupations"
  | "Nature"
  | "Mythology"
  | "Music"
  | "Movement"
  | "Mathematics"
  | "Materials"
  | "Literature"
  | "Language"
  | "Insects"
  | "Health"
  | "Geography"
  | "Food"
  | "Flora"
  | "Fauna"
  | "Emotions"
  | "Education"
  | "Conflict"
  | "Clothing"
  | "Beverages"
  | "Art"
  | "Anatomy";
export type WordType = "noun" | "verb" | "adjective" | "adverb";
export interface WordData {
  theme?: WordTheme[]; // plural, now an array
  type?: WordType[];   // plural, now an array
}

// --- The SINGLE SOURCE OF TRUTH ---
// This is exported directly. Your rules.ts file will import this.
export let dictionary: Map<string, WordData> = new Map();

// --- The Initializer ---
let hasInitialized = false;
const DICTIONARY_URL = 'https://pdsx74vla44vq2mf.public.blob.vercel-storage.com/scrabdledictionary2.json';

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