// --- Define the types that the rest of the app will use ---
export type WordType = "adverb" | "adjective" | "verb" | "noun" | "interjections" | "prepositions" | "conjunctions";
export type WordTheme = "Animals" | "Food" | "Nature" | "Numbers" | "School" | "Emotions" | "Music" | "Body" | "Books" | "Calendar" | "Colours" | "Transportation" | "Technology" | "Weather" | "Sports" | "Clothing" ;

export interface WordData {
  type?: WordType;
  theme?: WordTheme;
}

// --- THIS IS THE KEY ---
// We create and export an empty Map. Your rules.ts file will import THIS variable.
export let dictionary: Map<string, WordData> = new Map();

let dictionaryCache: Map<string, WordData> | null = null;
const DICTIONARY_URL = 'https://pdsx74vla44vq2mf.public.blob.vercel-storage.com/scrabdle-dictionary.json';
let isFetching = false;

// This function now returns the dictionary. It no longer mutates a global variable.
export async function getDictionary(): Promise<Map<string, WordData>> {
  if (dictionaryCache) {
    return dictionaryCache;
  }

  isFetching = true;
  console.log("Initializing dictionary from Vercel Blob...");

  try {
    const response = await fetch(DICTIONARY_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch dictionary: ${response.statusText}`);
    }
    
    const data: [string, WordData][] = await response.json();
    
    // VVVV THIS IS THE MAGIC VVVV
    // We are not returning the map. We are MUTATING the exported `dictionary` variable.
    // All other files that have imported `dictionary` will now see it populated with data.
    dictionaryCache = new Map(data);
    
    console.log(`Dictionary initialized successfully with ${dictionaryCache.size} words.`);

  } catch (error) {
    console.error(error);
    dictionaryCache = new Map();
  } finally {
    isFetching = false;
  }
  return dictionaryCache!;
}