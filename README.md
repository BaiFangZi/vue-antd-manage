项目地址：https://github.com/BaiFangZi/vue-antd-manage

预览地址: http://baifangzi.gitee.io/vue-antd-manage/

Vue3 版本功能更多更全：https://github.com/BaiFangZi/vue3-antd-manage

Vue3 版本预览： https://baifangzi.gitee.io/vue3-antd-manage/#/login

![image-20210309194408777](https://gitee.com/baifangzi/blogimage/raw/master/img/20210309194410.png)

## 目录结构

```
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directives             # 全局指令
│   ├── filters                # 全局 filter
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json
```

## 功能

### 权限验证

- 页面权限
- 指令权限

### 全局功能

- 中英文国际化

- 无限子级侧边栏
- 面包屑导航
- 路由顶部快捷导航

### 组件

- echart 动态图表
- 文件导出
- quill 富文本编辑器

下面简单对上面这些核心功能的代码做一些解释

## 代码实现

### 页面权限

页面级别的权限通过路由信息中的 auth 属性来进行判断，这里存贮了用户的角色，通过对应的角色来动态生成路由

```js
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard'),
    meta: {
      title: 'dashboard',
      icon: '',
      auth: ['admin', 'normal'],
      // isHidden: true,
    },
  },
```

每次进行路由跳转时通过路由钩子`beforeEach`来进行拦截处理，通过`GENERATE_ROUTER`遍历所有路由，然后组件当前用户能够访问的所有页面

```js
  GENERATE_ROUTER(state, auth) {
    const layout = constantRoutes.find((v) => v.path === '/')
    const authRoutes = traversalRoutes(asyncRoutes, auth)
    layout.children = state.menuList = authRoutes
    constantRoutes.forEach((r) => router.addRoute(r))
  },
```

### 指令权限

对于页面中按钮级别的权限。通过自定义指令`v-has`来实现

```html
<a-button type="primary " class="per-btn" v-has="['admin','normal']"
  >admin和normal的按钮</a-button
>
<a-button type="danger" class="per-btn" v-has="['admin']">admin的按钮</a-button>
<a-button class="per-btn" v-has="['normal']">normal的按钮</a-button>
```

### 国际化

vue-i18n 插件可以方便的配置国际化

```js
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // set locale
  messages: {
    zh,
    en,
  },
})
```

```html
<div>{{ $t('dashboard.content') }}</div>
```

使用时通过`$t()`找到对应的文本即可

在 antdv 框架中部分组件也需要进行国际化配置，只需要在组件外面配置一层`<a-config-provider>`即可

### 无限子级菜单

菜单结构与自定义的路由结一致，通过单文件递归组件生成，唯一的难点是如何格式话路由对象得到渲染 menuTree 所需要的的数据

```js
export function formatMenu(data) {
  const result = []
  data.forEach((item) => {
    const obj = {
      icon: item.meta.icon,
      title: item.meta.title,
      path: item.path,
      isHidden: item.meta.isHidden || false, //判断一些路由是否需要隐藏，如<用户中心>
    }
    if (item.children && item.children.length) {
      //有子路由递归
      obj.children = formatMenu(item.children)
    }
    result.push(obj)
  })
  return result
}
```

### 面包屑导航

实现面包屑导航的关键是需要知道当前页面路由的层级

这里有两种实现方案：

- 通过 this.\$route.matched 得到匹配的路径（目前采用的方式）

- 在路由配置中。给路由元信息 meta 添加面包屑导航的配置，然后对 breadcrumb 进行处理得到想要的数据

  ```js
  {
      name:...,
      path:...
        ...
      meta: {
          ...一些额外的参数信息
          breadcrumb: [{
              breadcrumbName: 'a',
              breadcrumbPath: '/a'
          },
          {
              breadcrumbName: 'b',
              breadcrumbPath: '/b'
          },
          {
              breadcrumbName: 'c',
              breadcrumbPath: '/c'
          }],
      },
  }
  ```

### 快捷路由

这里自己封装了这个组件，代码有点多，不详细展开了，但思路很简单，用 vuex 存贮已经激活的路由，放入一个数组`keepLiveTags`中，打开/关闭路由来动态增删`keepLiveTags`中的元素，主要逻辑在于显示窗口过小时，如何控制标签进行左右滑动

![image-20210309192019428](https://gitee.com/baifangzi/blogimage/raw/master/img/20210309192020.png)

### echarts 动态图表

图表组件采用了百度的良心产品--Echarts，上手简单，唯一痛处是图表大小不能随窗口改变，这里通过监听`resize`事件来解决

```js
window.addEventListener('resize', () => {
  // console.log(this.chart)
  if (this.chart) {
    this.chart.resize()
  }
})
```

### 文件导出

```js
import { export_json_to_excel } from '@/plugins/Export2Excel'
```

文件导出功能通过 `export_json_to_excel`方法实现，具体使用可参考https://www.cnblogs.com/baifangzi/p/14140553.html

### 富文本编辑器

使用 vue 封装的 quill 插件 ---`vue-quill-editor`

```js
import { quillEditor } from 'vue-quill-editor'
```

```html
<quill-editor v-model="content"></quill-editor> //content为输入的内容
```

## 小结

抽空整理了之前写的代码，捋了捋一下项目思路，抽离出了这个模板，目前想实现的功能基本都已整合进项目，对于一些简单项目可以使用该模板快速开发，后续可能会持续集成一些功能。该项目在一些开发规范上可能有些不足，代码结构上缺少一些把控，这也是目前我正在努力完善的地方，欢迎各位指正。

另外感谢花裤衩老师的代码，给了我很大的启发。
