import import { mapMutations from 'vuex';
<template>
  <div>
    <h2>权限管理</h2>
    <a-radio-group :default-value="token" @change="handleChange">
      <a-radio value="admin">
        admin(管理员)
      </a-radio>
      <a-radio value="normal">
        normal(普通用户)
      </a-radio>

    </a-radio-group>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'permission',
  data () {
    return {
    }
  },
  created () {
    // console.log(this.token)
    // this.value=
  },
  computed: {
    ...mapGetters('app', {
      token: 'getToken'
    })
  },
  methods: {
    ...mapMutations('app', {
      setToken: 'SET_TOKEN'
    }),
    ...mapMutations("console", {
      generateRouter: "GENERATE_ROUTER",
    }),

    handleChange (e) {
      const token = e.target.value
      this.setToken(token)
      this.generateRouter(token)
      location.reload();

    }
  }
}
</script>