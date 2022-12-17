import path from 'path';
import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists } from '../utils/index.js';
import  { rename } from 'fs/promises';

export const rn = async (pathToFile, newFileName) => {
   const check = await checkFileExists(pathToFile);
   if (!check)  { OPERATION_FAILED(); return } 

   const fileDir = path.dirname(pathToFile);
   const newPathToFile = path.join(fileDir, newFileName);

   const checkNew = await checkFileExists(newPathToFile);
   if (checkNew)  { OPERATION_FAILED(); return } 

   try {
     return rename(pathToFile, newPathToFile);
   } catch {
    OPERATION_FAILED();
   }
}
