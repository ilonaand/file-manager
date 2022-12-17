import path from 'path';

import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists } from '../utils/index.js';

import { pipeline }  from 'stream';

import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';

export const mv = async (pathToFile, pathToNewDirectory) => {
  const check = await checkFileExists(pathToFile);
 
  if (!check) { OPERATION_FAILED(); return } 

  const checkDir = await checkFileExists(pathToNewDirectory);
 
  if (!checkDir) { OPERATION_FAILED(); return } 

  const newFile = path.join(pathToNewDirectory, path.basename(pathToFile));

  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(newFile, {flag: 'w+'});
  

  const streams = pipeline(readStream, writeStream, error => {
      if (error) {
        { OPERATION_FAILED(); return } 
      } 
  });
  streams.on('finish', async () => {
    try {
      await unlink(pathToFile);
    } catch {
      OPERATION_FAILED(); return
    }
    
  });
  
}
