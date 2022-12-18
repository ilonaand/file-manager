const DEFAULT_USER = 'Username';

export const OPERATION_FAILED = () => console.error('Operation failed');

export const PROMPT = (name) => console.log(`Welcome to the File Manager, ${name ?? DEFAULT_USER}!`);

export const BYE = (name) => console.log(`\rThank you for using File Manager, ${name ?? DEFAULT_USER}, goodbye!`);

export const CWD = () => console.log(`You are currently in ${process.cwd()}`);

export const INVALID_INPUT = () => console.error('Invalid input');
