<template>
  <a-config-provider :locale="antdLang">
    <div id="root">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      // locale: zh_CN,
    }
  },
  computed: {
    ...mapGetters('app', {
      antdLang: 'getAntdLang',
    }),
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
