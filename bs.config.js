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
    confirmText: '确认',
    confirmShow: true,
    cancelText: '取消',
    cancelShow: true,
    close: true,
  },
  message: {
    title: 'success',
    type: 'success',
  },
};

export { bsConfig };
