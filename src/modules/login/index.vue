<template>
  <div class="bs-login-layout">
    <div class="bs-login-card">
      <h2>管理系统</h2>
      <bs-input
        prefixIcon="icon-account"
        v-model.trim="name"
        placeholder="请输入用户名"
        maxlength="20"
      ></bs-input>
      <bs-input
        v-model.trim="password"
        prefixIcon="icon-mima"
        maxlength="20"
        type="password"
        placeholder="请输入用户密码"
      ></bs-input>
      <bs-button type="primary" @click="onLogin">登录</bs-button>
      <bs-button @click="onToggle">展示</bs-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const password = ref('');

const onLogin = async () => {
  if (!name.value || !password.value) {
    return;
  }
  Bs.isAuthenticated = true;
  router.push('/');
};

const onToggle = () => {
  Bs.MessageBox({
    message: '啥打法上剪短发拉',
    type: 'warning',
  });
};

window.addEventListener('keydown', async e => {
  if (e.code === 'Enter') {
    await onLogin();
  }
});
</script>

<style lang="scss" scoped>
.bs-login-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .bs-login-card {
    margin: 0 auto;
    margin-top: 50px;
    width: 300px;
    padding: 10px 20px;
    box-shadow: getCssVar('box-shadow');
    border-radius: getCssVar('border-radius', 'base');
    display: flex;
    flex-direction: column;
    gap: 18px;
    h2 {
      text-align: center;
    }
  }
}
</style>
