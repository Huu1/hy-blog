// 根据某个属性值从MenuList查找拥有该属性值的menuItem
export function getMenuItemInMenuListByProperty(menuList: any[], key: string, value: string) {
  let stack: any[] = [...menuList];
  let res;
  while (stack.length > 0) {
    const cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = [...cur.children, ...stack];
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}

const BLOG_TOKEN = 'BLOG_TOKEN';

export function getToken() {
  return window.localStorage.getItem(BLOG_TOKEN);
}

export function setToken(token: string) {
  window.localStorage.setItem(BLOG_TOKEN, token);
}

export function removeToken() {
  window.localStorage.removeItem(BLOG_TOKEN);
}
