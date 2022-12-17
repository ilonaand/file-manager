import { access } from 'fs/promises';
import { constants, createWriteStream, createReadStream } from 'fs';

import { once } from 'events';

import { finished } from 'stream';

import { promisify } from 'util';



export const checkFileExists = async (path)  => {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
};

export const readableToString = async (filePath, options) => {
  const readStream = createReadStream(filePath, options);
  const data = [];
  for await (const chunk of readStream) {
    data.push(chunk);
  }
  return data.join('');
};

const finishedPromisify = promisify(finished);

export const writeIterableToFile = async (filePath, data, options) => {
  const writable = createWriteStream(filePath, options);
  for await (const chunk of data) {
    if (!writable.write(chunk)) {
      await once(writable, 'drain');
    }
  }
  writable.end();
  await finishedPromisify(writable);
};