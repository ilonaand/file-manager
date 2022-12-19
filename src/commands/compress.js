import path from 'path';

import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists } from '../utils/index.js';

import { pipeline }  from 'stream';

import zlib from 'zlib'

import { createReadStream, createWriteStream } from 'fs';

export const compress = async (pathToFile, pathToDestination) => {
  const check = await checkFileExists(pathToFile);
 
  if (!check) { OPERATION_FAILED(); return } 

  const streamRead = createReadStream(pathToFile);

  const streamWrite = createWriteStream(pathToDestination);

  pipeline(
    streamRead,
    zlib.createBrotliCompress({
      chunkSize: 1024,
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT
      }
    }),
    streamWrite,
    (err) => {
      if (err) OPERATION_FAILED(); 
      return;
    }
  );
 

}
