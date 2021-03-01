import Vuex from 'vuex'
import Vue from 'vue'
import modules from './modules'
console.log(modules)
Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

console.log(files.keys())
const store = new Vuex.Store({
  strict: true,
  modules,
  // ...
})

export default store
