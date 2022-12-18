import path from 'path';
import { OPERATION_FAILED } from '../constatnts.js'; 

import { writeFile } from 'fs/promises'
import { checkFileExists } from '../utils/index.js';

export const add =  async (newFileName) => {
  const filePath = path.resolve(process.cwd(), newFileName);
  const check = await checkFileExists(filePath);   
  if (check)  { OPERATION_FAILED(); return } 
  try {
    return await writeFile(filePath, '', {  encoding: 'utf8'});
  } catch {
    OPERATION_FAILED();
  };
}
