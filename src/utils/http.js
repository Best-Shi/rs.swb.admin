import axios from 'axios';

const httpConfig = {
  baseURL: `${Bs.config.devServer}${Bs.config.baseURL}`,
  timeout: Bs.config.timeout,
  method: 'POST',
};

const instance = axios.create(httpConfig);

function initRequestParams(params) {
  const data = {
    header: {
      SID: `BS_${Bs.Authorization}`,
      SN: `BS_${Date.now().toString(16)}${Math.random()
        .toString(16)
        .replace('.', '')}`,
    },
    body: params,
  };
  if (!Bs.Authorization) {
    data.header.SID = data.header.SN;
  }
  return data;
}

/**
 * 用于发送 POST 请求。
 * @param {string} url - 请求地址。
 * @param {object} params - 用于请求的参数。
 * @returns
 */
async function request(url, params) {
  return new Promise(resolve => {
    const req = initRequestParams(params);
    instance.post(url, req).then(result => {
      const res = result.data;
      const { body, header } = res;
      if (header.code === 200) {
        resolve(body);
      } else {
        if (header) {
          Bs.messageBox({ message: header.msg, type: 'error' });
        }
        Promise.reject(false);
      }
    });
  });
}

export { request as http };
