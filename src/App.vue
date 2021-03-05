<template>
  <!-- <a-config-provider :locale="local"> -->
  <div id="root">
    <router-view></router-view>
  </div>
  <!-- </a-config-provider> -->
</template>

<script>
// import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data() {
    return {
      // local: zh_CN
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
