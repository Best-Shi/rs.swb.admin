import { createRouter, createWebHashHistory } from 'vue-router';

import { routerList } from './routers.js';

let compileModule;

if (MODULES) {
  compileModule = compileModule.split(',').reduce((pre, cur) => {
    pre.push(...routerList.filter(item => item.startsWith(`/${cur}`)));
    return pre;
  }, []);
} else {
  compileModule = routerList;
}

const mainChildren = [];
for (let i = 0; i < compileModule.length; i += 1) {
  const module = compileModule[i];
  if (module.startsWith('/')) {
    const [first, last] = module.slice(1).split('/');
    // eslint-disable-next-line no-throw-literal
    if (!first) throw '路径错误！！！';
    const path = last ? `/${first}/${last}` : `/${first}`;
    mainChildren.push({
      name: first && last ? `${first}_${last}` : first,
      path,
      component: () =>
        import(
          /* webpackChunkName: `Bs-[request]` */ `@/modules${path}/index.vue`
        ),
    });
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "BsMain" */ '@/modules/main/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "BsHome" */ '@/modules/home/index.vue'),
      },
      {
        path: '/:error*',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "Bs404" */ '@/views/404.vue'),
      },
      ...mainChildren,
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "BsLogin" */ '@/modules/login/index.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 登录权限
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !Bs.Authorization) {
    next({ name: 'Login' });
  } else if (to.name === 'Main') {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export { router };
