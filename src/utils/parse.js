export const getUserName = (args) => {
 
  if (args.length === 0) return undefined;
  const arr = args.map(item => item.replace('--', ''));
  
  if (arr[0] != '') return undefined;

  const userName = arr[1].split('=');
  if (userName.length !==2 || userName[0] !== 'username') return undefined;

  return userName[1];
}

export const getParams = (strParams) => {
  return  strParams.trim().split(' ').filter((i) => i !== '').
     map((i) => i.trim().replaceAll('\'', '').replaceAll('\"', ''));
}