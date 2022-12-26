import { sessionStorage } from './sessionStorage.js';
import { MessageBox } from './messageBox/index.js';
import { http } from './http.js';

Object.assign(Bs, {
  ...sessionStorage,
  messageBox: MessageBox,
  http,
});

function deepFreeze(obj, exclude = []) {
  for (const key in obj) {
    if (!exclude.includes(key)) {
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        deepFreeze(obj[key], exclude);
      }
      Object.defineProperty(obj, key, {
        configurable: false,
        writable: false,
        value: obj[key],
      });
    }
  }
}
deepFreeze(Bs, ['Authorization']);
