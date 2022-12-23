<template>
  <div class="bs-menu-layout">
    <ul>
      <li v-for="item in menuList" :key="item.id">
        <div
          @click="onSelectedMenu(item)"
          :class="{
            'bs-menu-title': true,
            'bs-menu-title-hover': item.selection === 'Y',
            active: item.active,
          }"
        >
          <i :class="['iconfont', item.icon]"></i>{{ item.title }}
          <i
            :class="[
              'iconfont',
              'icon-more',
              { 'bs-rotate-90': item.unfold, 'bs-rotate-0': !item.unfold },
            ]"
            v-if="item.selection !== 'Y'"
          ></i>
        </div>
        <template v-if="item.selection !== 'Y'">
          <bs-collapse-transition>
            <ul v-show="item.unfold">
              <li v-for="subItem in item.children" :key="subItem.id">
                <div
                  :class="[
                    'bs-menu-title',
                    'bs-menu-sub-title',
                    'bs-menu-title-hover',
                    {
                      active: subItem.active,
                    },
                  ]"
                  @click="onSelectedMenu(subItem)"
                >
                  {{ subItem.title }}
                </div>
              </li>
            </ul>
          </bs-collapse-transition>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tree = [];
const temp = {};
Bs.menuList.forEach(node => {
  temp[node.id] = {
    ...node,
    children: [],
    active: node.path === '/home',
    unfold: false,
  };
});
for (const key in temp) {
  const node = temp[key];
  if (node.parentId !== '') {
    temp[node.parentId].children.push(node);
  } else {
    tree.push(node);
  }
}

const menuList = reactive(tree);

const onSelectedMenu = item => {
  if (item.selection === 'Y') {
    if (item.active) return;
    menuList.forEach(el => {
      el.active = false;
      el.children.forEach(v => {
        v.active = false;
      });
    });
    item.active = true;
    if (item.path) router.push(item.path);
  } else {
    item.unfold = !item.unfold;
  }
};
</script>

<style lang="scss" scoped>
.bs-menu-layout {
  color: getCssVar('text-color', 'light');
  padding: 10px 1px 10px 0;
  white-space: nowrap;
  box-sizing: border-box;
  .bs-menu-title {
    padding: 4px 10px 4px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .iconfont {
      margin-right: 5px;
      font-size: 16px;
    }
    .icon-more {
      margin-left: auto;
    }
  }
  .bs-menu-title-hover:hover {
    background: getCssVar('bg-color', 'light');
    color: getCssVar('text-color', 'dark');
  }
  .bs-menu-sub-title {
    padding-left: 40px;
  }
  .active {
    background: getCssVar('bg-color', 'light');
    color: getCssVar('text-color', 'dark');
  }
}
</style>
