
import { OPERATION_FAILED } from '../constatnts.js'; 

import { checkFileExists } from '../utils/index.js';

import { readdir, stat } from 'fs/promises';

export const ls = async () => {
  const dir = process.cwd()
  const check = await checkFileExists(dir);   
 
  if (!check) {
    OPERATION_FAILED();
    return;
  }

  try {
    const items = await readdir(dir);
   
    const files = (await Promise.all(
      items.map(async (item) => {
        const statInfo = await stat(item);
        return statInfo.isSymbolicLink() ? '' : statInfo.isDirectory() ? 
          ({ name: item, type: 'directory'}) : 
          ({ name: item, type: 'file'});
      }),
    )).filter((i) => i !== '');

    console.table(files.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    }));
  } catch  {
    OPERATION_FAILED();
    return;
  }
  
}