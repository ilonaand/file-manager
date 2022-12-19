import { OPERATION_FAILED } from '../constatnts.js'; 
import { unlink } from 'fs/promises';

export const rm = async (pathToFile) => {
  try {
    await unlink(pathToFile);
  } catch {
    OPERATION_FAILED(); return
  }
}
