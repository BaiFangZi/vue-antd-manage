<template>
    <div>

        <a-menu :default-selected-keys="['1']" :default-open-keys="['2']" mode="inline" theme="dark">
            <template v-for="item in list">
                <a-menu-item v-if="!item.children" :key="item.key">
                    <a-icon type="pie-chart" />
                    <span>{{ item.title }}</span>
                </a-menu-item>
                <sub-menu v-else :key="item.key" :menu-info="item" />
            </template>
        </a-menu>
    </div>
</template>

<script>
    import {
        Menu
    } from 'ant-design-vue';
    import {
        mapGetters
    } from 'vuex'
    import {formatMenu} from './formatMenu.js'
    const SubMenu = {
        template: `
        <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
          <span slot="title">
            <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
          </span>
          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.key">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" />
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

        data() {
            return {
                list: [{
                        key: '1',
                        title: 'Option 1',
                    },
                    {
                        key: '2',
                        title: 'Navigation 2',
                        children: [{
                            key: '2.1',
                            title: 'Navigation 3',
                            children: [{
                                key: '2.1.1',
                                title: 'Option 2.1.1'
                            }],
                        }, ],
                    },
                ],
            };
        },
        computed: {
            ...mapGetters('console', [
                'menus'
            ])
        },
        created() {
            const menus = formatMenu(this.menus)
            console.log(menus) 
        },
        methods: {

        },
    };
</script>