import { sessionStorage } from './sessionStorage.js';
import { MessageBox } from './messageBox/index.js';

Object.assign(Bs, {
  ...sessionStorage,
  MessageBox,
});
