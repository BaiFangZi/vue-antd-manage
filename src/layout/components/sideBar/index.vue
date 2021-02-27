<template>
  <div>

    <a-menu @select="handleSelect" :default-selected-keys="[$route.path]" mode="inline" theme="dark">
      <template v-for="item in menus">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import {
  Menu
} from 'ant-design-vue';
// import {
//   mapGetters
// } from 'vuex'
import { formatMenu } from './formatMenu.js'
const SubMenu = {
  template: `
        <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
          <span slot="title">
            <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
          </span>
          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.path">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.path" :menu-info="item" />
          </template>
        </a-sub-menu>
      `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
export default {
  components: {
    'sub-menu': SubMenu,
  },

  data () {
    return {
      menus: []
    };
  },
  computed: {

  },
  created () {

    this.menus = formatMenu(this.$store.state.console.menuList)
    // console.log(this.menus)
  },
  methods: {
    handleSelect ({ key }) {
      // console.log(key)
      this.$router.push({ path: key })
    }
  },
};

</script>