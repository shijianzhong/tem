<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="等级名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="签到天数" prop="days">
            <el-input v-model="ruleForm.days"></el-input>
        </el-form-item>
        <el-form-item label="达标积分" prop="count">
            <el-input v-model="ruleForm.count"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        days: "",
        count: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入等级名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        days: [
          { required: true, message: "请输入签到天数", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        count: [
          { required: true, message: "请输入达标积分", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      changeUserLevel: "changeUserLevel"
    }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger;
          let requestdata = {
            id: 0,
            level_name: this.ruleForm.name,
            sign_days: this.ruleForm.days,
            integral: this.ruleForm.count
          };
          this.changeUserLevel(requestdata)
            .then(result => {
              if (result.err_code == 0) {
                this.$message({
                  type: "success",
                  message: `添加成功`
                });
              }
            })
            .catch(err => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.demo-ruleForm {
  margin-top: 20px;
  .el-input {
    width: 40%;
  }
}
</style>


