<template>
  <div class="login-form">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="账号" prop="user">
        <a-input v-model="ruleForm.user" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button class="login-submit-btn" type="primary" @click="submitForm('ruleForm')">
          登陆
        </a-button>
        <!-- <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          Reset
        </a-button> -->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { login } from "@/api/app";
export default {
  data () {

    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "12",
        password: "12",
        // age: "",
      },
      rules: {
        pass: [
          {
            validator: validateUser,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePassWord,
            trigger: "blur",
          },
        ],
        // age: [
        //   {
        //     validator: checkAge,
        //     trigger: "change",
        //   },
        // ],
      },
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      },
    };
  },
  methods: {
    ...mapMutations("console", {
      generateRouter: "GENERATE_ROUTER",
    }),
    ...mapMutations('app', {
      setToken: "SET_TOKEN"
    }),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login()
            .then((res) => {
              const { auth } = res.data.data
              // console.log(res)
              this.setToken(auth) //将token存入localStorage
              this.generateRouter(); //生成路由
              this.$router.push({ path: "/table" });

            })
            .catch((err) => { });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  },
};
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
