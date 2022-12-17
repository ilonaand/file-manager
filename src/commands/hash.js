
import { OPERATION_FAILED } from '../constatnts.js'; 

import { readFile } from 'fs/promises'

import { checkFileExists } from '../utils/index.js';

import { createHash } from 'crypto';

export const hash = async (pathToFile) => {
  const check = await checkFileExists(pathToFile);
 
  if (!check) { OPERATION_FAILED(); return } 
  
  try {
    const textFile = await readFile(pathToFile, 'utf-8');
    process.stdout.write(`${createHash('sha256').update(textFile).digest('hex')}\n`);
    
  } catch {
    OPERATION_FAILED(); 
    return; 
  }
  
}



