<template>
  <div>
    <el-header>
      <route-link to="/blogList">
        <img
          src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png"
          style="height: 60%; margin-top: 10px;"
        >
      </route-link>
    </el-header>
    <el-main>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50x"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >登录</el-button>
          <el-button @click="register('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
  export default{
    name: "Login",
    data() {
      var validPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username:"",
          password:""
        },
        rules: {
          password:[
            {validator: validPass, trigger:"blur"}
          ],
          username:[
            {required:true, message: "请输入用户名", trigger:"blur"},
            {min:3, max:12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods:{
      submitForm(formName){
        const _this=this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios.post("/login", this.ruleForm).then((res)=> {
              const token=res.headers["authorization"];
              _this.$store.commit("SET_TOKEN", token);
              _this.$store.commit("SET_USERINFO", res.data.data)
              _this.$router.push("/blogs");
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>