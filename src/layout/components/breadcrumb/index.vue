<template>
  <a-breadcrumb :routes="filterRoute">
    <template slot="itemRender" slot-scope="{ route, routes }">
      <span v-if="notLink(routes, route)">
        {{ $t(`routes.${route.meta.title}`) }}
      </span>
      <router-link v-else :to="route.path">
        {{ $t(`routes.${route.meta.title}`) }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>
<script>
// import formatMenu from '../formatMenu'
export default {
  data() {
    return {
      // basePath: '/components/breadcrumb',
      filterRoute: [],
    }
  },
  methods: {
    notLink(routes, route) {
      return (
        routes.indexOf(route) === routes.length - 1 ||
        route.meta.noBreadcrumbLink
      )
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        const matchedRoute = this.$route.matched.map((r) => {
          const { meta, path } = r
          return { meta, path }
        })
        // console.log(matchedRoute)

        const filterRoute = matchedRoute.slice(1)
        if (this.$route.path !== '/dashboard') {
          //如果不是首页
          filterRoute.unshift({
            path: '/dashboard',
            meta: {
              title: 'dashboard',
            },
          })
        }
        this.filterRoute = filterRoute
        // console.log(filterRoute)
      },
    },
  },
}
</script>
<style lang="scss">
.breadcrumb {
  z-index: 2;
}
</style>
