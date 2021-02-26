<template>
  <a-breadcrumb :routes="filterRoute">
    <template slot="itemRender" slot-scope="{ route,  routes, }">
      <span v-if="routes.indexOf(route) === routes.length - 1||route.meta.noBreadcrumbLink">
        {{ route.meta.title }}
      </span>
      <router-link v-else :to="route.path">
        {{ route.meta.title }}
      </router-link>
    </template>
  </a-breadcrumb>

</template>
<script>
// import formatMenu from '../formatMenu'
export default {
  data () {
    return {
      // basePath: '/components/breadcrumb',
      filterRoute: [],
    };

  },
  computed: {
    // isDisplay_Span () {
    //   return .indexOf(route) === routes.length - 1
    // }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        const matchedRoute = this.$route.matched.map(r => {
          const { meta, path } = r
          return { meta, path }
        })
        console.log(matchedRoute)

        const filterRoute = matchedRoute.slice(1)
        if (this.$route.path !== '/dashboard') {//如果不是首页
          filterRoute.unshift(
            {
              path: '/dashboard',
              meta: {
                title: '首页'
              }
            }
          )
        }
        this.filterRoute = filterRoute
        console.log(filterRoute)
      }
    }
  }

};
</script>
<style lang="scss">
.breadcrumb {
  z-index: 2;
}
</style>