<template>
  <div class="login-form">
    <a-form-model
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item
        :label="$t('system.user')"
        placeholder="admin"
        prop="user"
      >
        <a-input v-model="ruleForm.user" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item
        :label="$t('system.password')"
        placeholder="123456"
        prop="password"
      >
        <a-input-password
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          class="login-submit-btn"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          {{ $t('system.signIn') }}
        </a-button>
        <!-- <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          Reset
        </a-button> -->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { login } from '@/api/app'
import { isAccount, isPassword } from '@/utils/formReg'
export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (value.trim() === '') {
        callback('账号不能为空')
      } else {
        if (isAccount.test(value)) {
          callback()
        } else {
          callback('英文数字4-16位')
        }
      }
    }
    let validatePassWord = (rule, value, callback) => {
      if (value.trim() === '') {
        callback('密码不能为空')
      } else {
        if (isPassword.test(value)) {
          callback()
        } else {
          console.log('wewewewe')
          callback('英文数字下划线4-16位')
        }
      }

      // isPassWord.test(value) ? callback() : callback('英文数字下划线4-16位')
    }
    return {
      ruleForm: {
        user: '',
        password: '',
        // age: "",
      },
      rules: {
        user: [
          {
            validator: validateUser,
            trigger: 'change',
          },
        ],
        password: [
          {
            validator: validatePassWord,
            trigger: 'change',
          },
        ],
      },
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      },
    }
  },
  methods: {
    ...mapMutations('console', {
      generateRouter: 'GENERATE_ROUTER',
    }),
    ...mapMutations('app', {
      setToken: 'SET_TOKEN',
    }),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login()
            .then((res) => {
              const { auth } = res.data.data
              // console.log(res)
              this.setToken(auth) //将token存入localStorage
              this.generateRouter(auth) //生成路由
              this.$router.push({ path: '/table' })
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss">
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  height: 100%;
  .login-submit-btn {
    width: 100%;
  }
  .ant-form {
    width: 500px;
  }
}
</style>
