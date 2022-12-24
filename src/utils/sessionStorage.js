export const sessionStorage = {
  sessionStorage(key, value) {
    if (value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    const data = window.sessionStorage.getItem(key);
    if (typeof data === 'string' || data === null) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return JSON.parse(data);
  },
  clearSessionStorage(key) {
    if (key) {
      window.sessionStorage.removeItem(key);
    } else {
      window.sessionStorage.clear();
    }
  },
};
