import import { mapMutations from 'vuex';
<template>
  <div>
    <h2>权限管理</h2>
    <a-radio-group v-model="value" @change="handleChange">
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
import { mapMutations } from 'vuex'
export default {
  name: 'permission',
  data () {
    return {
      value: 'admin'
    }
  },
  methods: {
    ...mapMutations('app', {
      setToekn: 'SET_TOKEN'
    }),
    handleChange (e) {
      // console.log(this.value) 
      // console.log(val)
      this.setToekn(e.target.value)
    }
  }
}
</script>