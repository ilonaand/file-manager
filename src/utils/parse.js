export const getUserName = (args) => {
 
  if (args.length === 0) return undefined;
  const arr = args.map(item => item.replace('--', ''));
  
  if (arr[0] != '') return undefined;

  const userName = arr[1].split('=');
  if (userName.length !==2 || userName[0] !== 'username') return undefined;

  return userName[1];
}

/*export const getParams = (strParams) => {
  return  strParams.trim().split(' ').filter((i) => i !== '').
     map((i) => i.trim().replaceAll('\'', '').replaceAll('\"', ''));
}*/

export const getParams = (strParams) => {
  let params = [];
  if (strParams.length === 0) return;
 
  const command = strParams.indexOf(' ') === -1 ? 
    strParams : strParams.slice(0, strParams.indexOf(' '));

  params =  [...params, command];

  const argum = strParams.indexOf(' ') === -1 ? '' : strParams.slice(strParams.indexOf(' ')).trim();

  const parse = (line) => {
    let args = line; 
    if (args.length === 0) return;
    const sep = args.indexOf('"');
    if (sep === -1) {
      const arr =  args.trim().split(' ').filter(Boolean);
      params =  [...params, ...arr];
      return;
    }
    if (sep > 0) {
      const arr =  args.slice(0, sep).trim().split(' ').filter(Boolean);
      params =  [...params, ...arr];
    }

    args = line.slice(sep + 1).trim();

    const sep2 = args.indexOf('"'); 
    if (sep2 === -1) return;
    params =  [...params, args.slice(0, sep2)];
    parse(args.slice(sep2 + 1));
  }

  parse(argum);
  return params;
}
