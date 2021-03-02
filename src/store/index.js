import Vuex from 'vuex'
import Vue from 'vue'
// import modules from './modules/index.js'
// console.log(modules)
Vue.use(Vuex)
const modules = {}

//配置导包
const files = require.context('./modules', true, /index\.js$/) //获取index.js文件
files.keys().forEach((f) => {
  const moduleName = f.replace(/\.\/(.+)\/index\.js/, '$1') //    ./app/index.js -->app
  modules[moduleName] = files(f).default
})

const store = new Vuex.Store({
  strict: true,
  modules,
  // ...
})

export default store
