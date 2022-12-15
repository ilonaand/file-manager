import path from 'path';
import { CWD } from '../constatnts.js'; 

export const up = () => {
  process.chdir(path.resolve(process.cwd(), '..'));
}