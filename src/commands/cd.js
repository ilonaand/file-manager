import path from 'path';
import { CWD, OPERATION_FAILED } from '../constatnts.js'; 

export const cd = (newPath) => {
  const dir = path.resolve(process.cwd(), newPath);
  process.chdir(dir);
  CWD();
}