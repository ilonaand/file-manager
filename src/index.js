import { PROMPT, BYE, CWD, INVALID_INPUT } from './constatnts.js'; 
import  readline  from 'readline';

import * as utils from './utils/index.js';
import * as commandFunctions from './commands/index.js';

import os from 'os';

const commandLineInterface = () => {
  const args = process.argv.slice(2); 
 
  const userName = utils.getUserName(args); 

  PROMPT(userName);
  process.chdir(os.homedir());
  CWD();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Print command >',
  });

  const commands = {
    up: () => commandFunctions.up(),
    cd: () => commandFunctions.cd('d'),
    ls: () => console.log('ls'),
    cat: () => console.log('cat'),
    rn: () => console.log('rn'),
    cp: () => console.log('cp'),
    mv: () => console.log('mv'),
    rm: () => console.log('rm'),
    os: () => console.log('os'),
    hash: () => console.log('hash'),
    compress: () => console.log('compress'),
    decompress: () => console.log('decompress'),
    '.exit': () => rl.close(),
  } 

  rl.prompt();

  rl.on('line', line => {
    const command = commands[line];
    command ? command() : INVALID_INPUT(); 

    rl.prompt();
  })
  
  rl.on('close', () => {
    BYE(userName);
    process.exit();
  });

}

commandLineInterface();
