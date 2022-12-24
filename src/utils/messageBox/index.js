import { createVNode, render } from 'vue';
import MessageBoxConstructor from './messageBox.vue';

const messageInstance = new Map();

function initInstance(options, container) {
  const vnode = createVNode(MessageBoxConstructor, options);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
}

function showMessage(options) {
  const container = document.createElement('div');
  options.onVanish = () => {
    render(null, container);
    // eslint-disable-next-line no-use-before-define
    messageInstance.delete(vm);
  };

  options.onAction = action => {
    // eslint-disable-next-line no-use-before-define
    const currentMsg = messageInstance.get(vm);
    if (action === 'confirm') {
      currentMsg.resolve(action);
    } else {
      currentMsg.rejcet(action);
    }
  };
  const instance = initInstance(options, container);
  const vm = instance.proxy;
  vm.visible = true;
  return vm;
}

/**
 * 弹出消息确认框。
 * @param {Object} options
 * options - MessageBox 配置参数。
 * message - 确认框消息内容。
 * type - 消息类型（默认：success）。
 * title - 消息确认框（默认：系统提示）。
 * confirmShow - 是否展示确认按钮（默认：true）。
 * confirmText -  确认按钮文本（默认：确认）。
 * cancelShow -  是否展示取消按钮（默认：true）。
 * cancelText -  取消按钮文本（默认：取消）。
 * close -  是否展示关闭按钮（默认：true）。
 * @param {String} options.message
 * @param {'success'|'warning'|'info'|'error'} [options.type]
 * @param {String} [options.title]
 * @param {Boolean} [options.confirmShow]
 * @param {String} [options.confirmText]
 * @param {Boolean} [options.cancelShow]
 * @param {String} [options.cancelText]
 * @param {Boolean} [options.close]
 * @returns Promise
 */
async function MessageBox(options) {
  const config = {};
  for (const key in Bs.config.messageBox) {
    if (Object.hasOwnProperty.call(Bs.config.messageBox, key)) {
      if (Object.hasOwnProperty.call(options, key)) {
        config[key] = options[key];
      } else {
        config[key] = Bs.config.messageBox[key];
      }
    }
  }

  return new Promise((resolve, rejcet) => {
    const vm = showMessage(config);
    messageInstance.set(vm, {
      options,
      resolve,
      rejcet,
    });
  });
}

export { MessageBox };
