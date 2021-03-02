// import
const directives = {}

const files = require.context('./modules', true, /\.js$/)
files.keys().forEach((f) => {
  // console.log(f)
  const moduleName = f.replace(/\.\/(.+)\.js/, '$1') //    ./has.js ===> has
  directives[moduleName] = files(f).default
})

export default directives
