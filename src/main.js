import { createApp } from 'vue';

import '@/assets/scss/base.scss';
import '@/assets/fonts/iconfont.css';
import './utils/bs.js';

import App from '@/App.vue';

import BsCollapseTransition from './components/collapse-transition/index.vue';
import BsInput from './components/input/index.vue';
import BsButton from './components/button/index.vue';

const app = createApp(App);

app.component('BsCollapseTransition', BsCollapseTransition);
app.component('BsInput', BsInput);
app.component('BsButton', BsButton);

const { router } = await import('./routers/index.js');
app.use(router);

app.mount('#app');
