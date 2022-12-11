import process from 'process';

import { PROMPT, BYE, OPERATION_FAILED } from './constatnts.js'; 
import  readline  from 'readline';

import * as utils from './utils/index.js';
const commandLineInterface = () => {
  const args = process.argv.slice(2); 
 
  const userName = utils.getUserName(args); 

  console.log(PROMPT(userName));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `You are currently in ${process.cwd()}>`,
  });

  const commands = {
    up: () => console.log('up'),
    cd: () => console.log('cd'),
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
    command ? command() : console.log(OPERATION_FAILED); 

    rl.prompt();
  })
  
  rl.on('close', () => {
    console.log(BYE(userName));
    process.exit();
  });

}

commandLineInterface();
