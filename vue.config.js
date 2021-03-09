const path = require('path')
// const loader = require('sass-loader')
const TerserPlugin = require('terser-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

function pathResolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      // template: 'public/index.html',
      // 在 dist/index.html 的输出
      // filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '模板',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },

  runtimeCompiler: false,
  // 公共路径(必须有的)
  publicPath: '/vue-antd-manage/', //使用时换为自己的路经 提供参考：https://cli.vuejs.org/zh/config/#publicpath
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: 'static',
  //eslint
  lintOnSave: false,
  //
  // runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  devServer: {
    disableHostCheck: true,
    open: true, // npm run serve后自动打开页面
    host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
    port: 8088, // 开发服务器运行端口号
    proxy: {
      '/v1': {
        target: 'http://192.168.1.19:8193/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/v1': '/v1',
        },
        logLevel: 'debug',
      },
    },
  },
  css: {
    loaderOptions: {
      css: {
        // 'sass-loader'
      },
    },
  },
  pluginOptions: {},
  chainWebpack: (config) => {
    config.resolve.alias.set('@', pathResolve('src'))

    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false, //便于查看控制台报错信息
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': pathResolve('src'),
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        }),
      ],
    },
  },
}
