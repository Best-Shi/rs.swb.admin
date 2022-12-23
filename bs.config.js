const bsConfig = {
  devServer: 'http://localhost:8899',
  timeout: 2000,
  baseURL: '/api',
  webTitle: 'SWB',
  servicePort: 9988,
  messageBox: {
    title: '系统提示',
    type: 'success',
    message: '',
    confirm: {
      show: true,
      text: '确认',
    },
    cancel: {
      show: true,
      text: '取消',
    },
    close: true,
  },
  message: {
    title: 'success',
    type: 'success',
  },
};

export { bsConfig };
