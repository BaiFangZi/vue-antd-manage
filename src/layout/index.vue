<template>
  <a-layout id="screen">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <side-bar></side-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-left">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <bread-crumb></bread-crumb>
        </div>
        <div class="header-right">
          <span class="header-msg">
            <!-- <a-icon class="user" type="user" /> -->
            <a-dropdown class="avatar">
              <a-menu slot="overlay">
                <a-menu-item key="userCenter" @click="userCenter">{{
                  $t('system.account')
                }}</a-menu-item>
                <a-menu-item key="layout" @click="signOut">{{
                  $t('system.signOut')
                }}</a-menu-item>
              </a-menu>
              <a-button shape="circle" icon="user"></a-button>
            </a-dropdown>
          </span>
        </div>
      </a-layout-header>
      <a-layout-content>
        <router-tags></router-tags>
        <div class="main">
          <!-- 缓存路由组件 -->
          <keep-alive :include="includeRouter">
            <router-view></router-view>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SideBar from './components/sideBar'
import RouterTags from './components/routerTags'
import BreadCrumb from './components/breadcrumb'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'layout',
  components: {
    SideBar,
    RouterTags,
    BreadCrumb,
  },
  data() {
    return {
      collapsed: false,
      isLogin: '',
      includeRouter: [],
    }
  },
  computed: {
    ...mapGetters('routerTags', {
      keepLiveTags: 'getKeepLiveTags',
    }),
  },
  watch: {
    keepLiveTags() {
      // console.log(23232)
      this.includeRouter = this.keepLiveTags.map((r) => r.path)
      console.log(this.includeRouter)
    },
  },
  methods: {
    ...mapMutations('app', {
      clearToken: 'CLEAR_TOKEN',
    }),
    userCenter() {
      this.$router.push('/userCenter')
    },
    signOut() {
      this.clearToken()
      location.reload()
    },
  },
}
</script>
<style lang="scss">
#screen {
  min-height: 100%;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .header {
    background: rgb(255, 255, 255);
    height: 50px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-left {
      display: flex;
      align-items: center;
    }

    .trigger {
      font-size: 18px;
      line-height: 50px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .trigger:hover {
      color: #1890ff;
    }

    .header-msg {
      float: right;
      padding-right: 24px;
      // margin: 0 16px 0 0;
      // .user {
      //   font-size: 18px;
      // }
    }
  }

  .main {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
    height: calc(100% - 98px);
  }
}
</style>
