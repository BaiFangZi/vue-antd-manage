import { isArray } from 'lodash'
import app from '@/store/modules/app'

export default {
  inserted(el, binding) {
    const permissionArr = binding.value
    //判断传入参数是否是一个数组
    if (isArray(permissionArr)) {
      const token = app.getters.getToken()
      if (!permissionArr.includes(token)) {
        //没有权限移除元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("The argument to 'v-has' must be an array")
    }
  },
}
