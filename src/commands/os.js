import { OPERATION_FAILED, INVALID_INPUT } from '../constatnts.js'; 

import os from 'os';

const subCommands = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];

export const osCom = async (subCommand) => {
  let action = subCommands.find((i) => i.toLocaleLowerCase() === subCommand.toLocaleLowerCase());
  if (!action) {
    INVALID_INPUT();
    return;
  }
  action = action.slice(2);
  
  switch (action) {
    case 'EOL': process.stdout.write(os.EOL); break;
    case 'cpus': console.log(os.cpus()); break;
    case 'homedir': process.stdout.write(`${os.homedir()}${os.EOL}`); break;
    case 'username': process.stdout.write(`${os.userInfo().username}${os.EOL}`); break;
    case 'architecture': process.stdout.write(`${os.arch()}${os.EOL}`); break;
  }
}
