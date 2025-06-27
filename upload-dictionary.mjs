import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import 'dotenv/config'; // Loads variables from .env.local

async function upload() {
  const filePath = path.join(process.cwd(), 'temp_data', 'dictionary_data.json');
  const fileName = 'scrabdle-dictionary.json'; // The public name of the file

  console.log(`Reading data from: ${filePath}`);
  const fileBuffer = await fs.readFile(filePath);

  console.log(`Uploading ${fileName} to Vercel Blob...`);

  // Upload the file with public access so your game can fetch it.
  const blob = await put(fileName, fileBuffer, {
    access: 'public',
  });

  console.log('✅ Upload Complete!');
  console.log('----------------------------------------------------');
  console.log('Your dictionary is now permanently hosted at this URL:');
  console.log(blob.url);
  console.log('----------------------------------------------------');
  console.log('Copy this URL and paste it into your dictionaryService.ts file.');
}

upload().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});