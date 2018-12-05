
export function getRedirectPath({type, avatar}){
  let url = (type === 'boss') ? '/boss' : '/genius'
  // 若头像不存在，则前往信息完善页面
  if(!avatar){
    url += 'info'
  }
  return url
}