<template>
  <a-layout id="screen">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <side-bar></side-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
        <span class="header-msg">
          <!-- <a-icon class="user" type="user" /> -->
          <a-dropdown class="avatar">
            <a-menu slot="overlay">
              <a-menu-item key="userCenter" @click="userCenter">个人中心</a-menu-item>
              <a-menu-item key="layout" @click="loginOut">退出登陆</a-menu-item>

            </a-menu>
            <a-button shape="circle" icon="user"></a-button>
          </a-dropdown>
        </span>
      </a-layout-header>
      <a-layout-content :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SideBar from "./components/sideBar";
import { mapMutations } from 'vuex';
export default {
  name: "layout",
  components: {
    SideBar,
  },
  data () {
    return {
      collapsed: false,
      isLogin: ''
    };
  },
  methods: {
    ...mapMutations('app', {
      clearToken: 'CLEAR_TOKEN'
    }),
    userCenter () { },
    loginOut () {
      this.clearToken()
      this.$router.push('/login')
    }
  },
};
</script>
<style lang="scss">
#screen {
  min-height: 100%;
  .trigger,
  .user {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
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
</style>
