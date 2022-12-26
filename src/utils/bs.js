import { sessionStorage } from './sessionStorage.js';
import { MessageBox } from './messageBox/index.js';
import { http } from './http.js';

Object.assign(Bs, {
  ...sessionStorage,
  MessageBox,
  http,
});
