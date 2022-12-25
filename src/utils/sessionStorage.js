export const sessionStorage = {
  /**
   * 设置、获取 sessionStorage，存在 value 参数时，设置 sessionStorage 值；没有 value 参数时，sessionStorage 的值。
   * @param {string} key - sessionStorage key 值。
   * @param {[object,string]} value - sessionStorage value 值。
   * @returns void
   */
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
  /**
   * 用于删除、清空 sessionStorage 的值，传入 key 时删除 sessionStorage 中 key 对应的值；key 为空时清空 sessionStorage。
   * @param {string} key - sessionStorage 的 key 。
   */
  clearSessionStorage(key) {
    if (key) {
      window.sessionStorage.removeItem(key);
    } else {
      window.sessionStorage.clear();
    }
  },
};
