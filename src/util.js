
export function getRedirectPath({type, avatar}){
  console.log('getRedirectPath',type)
  let url = (type === 'boss') ? '/boss' : '/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}