import path from 'path';
import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists } from '../utils/index.js';

export const cd = async (params) => {
  const newPath = params[1];
  
  const dir = newPath.includes(':') ? 
    path.resolve(process.cwd(), newPath) : 
    path.resolve(newPath);
  
  const check = await checkFileExists(dir);   
  check ? process.chdir(dir) : OPERATION_FAILED();
  return;
}