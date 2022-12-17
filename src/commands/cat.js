import path from 'path';
import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists, readableToString } from '../utils/index.js';

export const cat = async (fileName) => {
  const filePath = path.resolve(fileName);
;
  try {
    const check = await checkFileExists(filePath);
    if (!check) { OPERATION_FAILED(); return } 
  
    const file = await readableToString(filePath, { encoding: 'utf-8'});  
    process.stdout.write(file.toString());
  } catch {
    OPERATION_FAILED(); 
    return;
  }
  
}