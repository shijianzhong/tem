<template>
    <el-form label-width="100px" class="integral-form">
        <el-form-item label="会员注册">
            <el-input-number v-model="values.register.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="完善信息" prop="days">
            <el-input-number v-model="values.profile.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="会员登录" prop="count">
            <el-input-number v-model="values.login.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="每日签到" prop="count">
            <el-input-number v-model="values.sign.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="点赞评分" prop="count">
            <el-input-number v-model="values.point.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="录入" prop="count">
            <el-input-number v-model="values.post.value" :min="1" @change="handleChange" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      values: {
        register: { value: 1 },
        profile: { value: 1 },
        login: { value: 1 },
        sign: { value: 1 },
        point: { value: 1 },
        post: { value: 1 }
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions({
      getintegral: "getintegral",
      saveintegral: "saveintegral"
    }),
    initData() {
      this.getintegral().then(data => {
        data.data.forEach(item => {
          this.values[item.event] = item;
        });
        debugger;
        console.log(this.values);
      });
    },
    handleChange(value) {
      console.log(value);
    },
    submitForm() {
      debugger;
      console.log(this.values);
      let oo = Object.keys(this.values);
      let str = [];
      oo.forEach(item => {
        str.push(`${this.values[item].id}:${this.values[item].value}`);
      });
      let resu = str.join("|");
      this.saveintegral(resu).then(data => {
        if (data.err_code == 0) {
          this.$message({
            type: "success",
            message: `保存成功`
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.integral-form {
  margin-top: 20px;
}
</style>


