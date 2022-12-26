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
  const res = await Bs.http('/login', {
    userName: name.value,
    password: password.value,
  });

  if (res) {
    Bs.Authorization = res.author;
    Bs.sessionStorage('author', res.author);
    Bs.sessionStorage('userInfo', res.userInfo);
    router.push('/');
  }
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
