import { PROMPT, BYE, CWD, INVALID_INPUT } from './constatnts.js'; 
import  readline  from 'readline';

import * as utils from './utils/index.js';
import { up, cd, ls, cat, cp, mv, rm, rn, add } from './commands/index.js';

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
    up: (params) => { params.length === 1 ? up() : INVALID_INPUT()},
    hash: () => console.log('hash'),
    os: () => console.log('os'),
    compress: () => console.log('compress'),
    decompress: () => console.log('decompress'),
    '.exit': () => rl.close(),
  } 

  const asyncCommands = {
    cd: async (params) => { params.length === 2 ? await cd(params[1]) : INVALID_INPUT()},
    ls: async (params) => { params.length === 1 ? await ls() : INVALID_INPUT()},
    cat: async (params) => { params.length === 2 ? await cat(params[1]) : INVALID_INPUT()},
    add: async (params) => { params.length === 2 ? await add(params[1]) : INVALID_INPUT()},
    rn: async (params) => { params.length === 3 ? await rn(params[1], params[2]) : INVALID_INPUT()},
    cp: async (params) => { params.length === 3 ? await cp(params[1], params[2]) : INVALID_INPUT()},
    mv: async (params) => { params.length === 3 ? await mv(params[1], params[2]) : INVALID_INPUT()},
    rm: async (params) => { params.length === 2 ? await rm(params[1]) : INVALID_INPUT()},
  } 

  rl.prompt();

  rl.on('line', async (line)  => {
    const params = utils.getParams(line);
    const command = commands[params[0]];
    const asyncCommand = asyncCommands[params[0]];
    command ? command(params) : asyncCommand ? await asyncCommand(params) : INVALID_INPUT(); 
    CWD();
    rl.prompt();
  })
  
  rl.on('close', () => {
    BYE(userName);
    process.exit();
  });

}

commandLineInterface();
