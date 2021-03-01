import Vuex from 'vuex'
import Vue from 'vue'
// import modules from './modules/index.js'
// console.log(modules)
Vue.use(Vuex)
const modules = {}

//配置导包
const filePath = require.context('./modules', true, /index\.js$/) //获取index.js文件
filePath.keys().forEach((file) => {
  const moduleName = file.replace(/\.\/(.+)\/index\.js/, '$1') //    ./app/index.js -->app
  modules[moduleName] = filePath(file).default
})

const store = new Vuex.Store({
  strict: true,
  modules,
  // ...
})

export default store
