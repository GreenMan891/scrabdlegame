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

// 2. FIX: Changed singular 'verb'/'adjective' to plural to match your JSON
export type WordType = "nouns" | "verbs" | "adjectives" | "adverbs";

export interface WordData {
  theme?: WordTheme[]; 
  type?: WordType[];   
}

// --- The SINGLE SOURCE OF TRUTH ---
export let dictionary: Map<string, WordData> = new Map();

// --- The Initializer ---
let hasInitialized = false;
const DICTIONARY_URL = 'https://pdsx74vla44vq2mf.public.blob.vercel-storage.com/scrabdledictionary5.json';

export async function initializeDictionary(): Promise<void> {
  if (hasInitialized) return;
  hasInitialized = true;

  console.log("Initializing global dictionary...");
  try {
    const response = await fetch(DICTIONARY_URL);
    if (!response.ok) throw new Error("Failed to fetch dictionary");

    // 3. INFO: The JSON is an array of tuples: [string, WordData][]
    // This maps perfectly to the Map constructor.
    const data: [string, WordData][] = await response.json();

    dictionary = new Map(data);

    console.log(`Global dictionary initialized with ${dictionary.size} words.`);
  } catch (error) {
    console.error("Could not initialize dictionary:", error);
    // Optional: Reset initialized flag so we can try again if it failed
    hasInitialized = false; 
  }
}