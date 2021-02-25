<template>
  <div class="login-form">
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="Password" prop="pass">
        <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="Confirm" prop="checkPass">
        <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('ruleForm')">
          Submit
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { login } from "@/api/app";
export default {
  data () {
    // let checkPending;
    // let checkAge = (rule, value, callback) => {
    //   clearTimeout(checkPending);
    //   if (!value) {
    //     return callback(new Error("Please input the age"));
    //   }
    //   checkPending = setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("Please input digits"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("Age must be greater than 18"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
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
        pass: "",
        checkPass: "",
        // age: "",
      },
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: "change",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "change",
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
    // ...mapMutations("console", {
    //   generateRouter: "GENERATE_ROUTER",
    // }),
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
              // this.generateRouter(); //生成路由
              this.setToken(auth) //将token存入localStorage
              this.$router.push({ path: "/dashboard" });

            })
            .catch((err) => { });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
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

  .ant-form {
    width: 500px;
  }
}
</style>
