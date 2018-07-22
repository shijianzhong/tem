<template>
  <div class="createPost-container">
    <el-scrollbar>
      <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
        <div class="createPost-main-container">
          <el-row>
            <el-col :span="24">
              <el-form-item style="margin-bottom: 40px;" prop="title">
                <MDinput name="name" v-model="title" required :maxlength="100">
                  标题
                </MDinput>
              </el-form-item>

              <div class="postInfo-container">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="发布作者:" class="postInfo-container-item">
                      <el-input v-model="author" placeholder="作者"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="原文时间:" class="postInfo-container-item">
                      <el-date-picker v-model="source_date" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="80px" label="审核状态:" class="postInfo-container-item">
                      <el-select v-model="status" placeholder="请选择">
                        <el-option v-for="item in reviewOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="信息来源:" class="postInfo-container-item">
                      <el-input v-model="source"></el-input>
                    </el-form-item>

                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="80px" label="所属分类:" class="postInfo-container-item">
                      <el-cascader expand-trigger="hover" :options="ownerClass" v-model="ownerClassItem">
                      </el-cascader>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="80px" label="状态标签:" class="postInfo-container-item">
                      <el-select v-model="status_label_id" placeholder="请选择">
                        <el-option v-for="item in statusLabelData" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label-width="80px" label="是否专题:" class="postInfo-container-item">
                      <el-radio-group v-model="is_topic">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="80px" label="是否转载:" class="postInfo-container-item">
                      <el-radio-group v-model="is_origin">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label-width="45px" label="类型:" class="postInfo-container-item">
                      <el-checkbox v-model="checkednew">最新</el-checkbox>
                      <el-checkbox v-model="checkedspecial">特供</el-checkbox>
                      <el-checkbox v-model="checkedrecommend">推荐</el-checkbox>
                    </el-form-item>

                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-form-item label-width="80px" label="原文地址:" class="postInfo-container-item">
            <el-input class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="url">
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label-width="80px" label="信息短述:">
            <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="description">
            </el-input>
            <!-- <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span> -->
          </el-form-item>
          <span>上传代表图</span>
          <el-upload class="upload-demo" :auto-upload=false action="" multiple :file-list="fileList" :on-change="beforUpload" list-type="picture-card">
            <i class="el-icon-upload"></i>
            <!-- <div class="el-upload__text">上传代表图
              <em>点击上传</em>
            </div> -->
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <div class="editor-container">
            <Tinymce :height=400 ref="editor" v-model="content" />
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="80px" label="打标签:" class="postInfo-container-item">
                <el-select v-model="value5" multiple placeholder="请选择">
                  <el-option v-for="item in tagsData" :key="item.value" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="80px" label="上传附件:" class="postInfo-container-item">
                <el-upload class="upload-demo" :auto-upload=false action=""  multiple :limit="1" :on-change="otherlistadd" :file-list="othersfileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label-width="80px" label="浏览权限:" class="postInfo-container-item">
                <el-radio-group v-model="is_public">
                  <el-radio :label="0">所有人</el-radio>
                  <el-radio :label="1">
                    <el-select v-model="user_rule.level_id" placeholder="请选择">
                      <el-option v-for="item in viplevelData" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <el-checkbox v-model="user_rule.is_auth">仅认证会员可浏览</el-checkbox>
                    <el-button @click="dialogvisable=!dialogvisable">设置黑名单</el-button>
                    <el-dialog title="设置黑白名单" :visible.sync="dialogvisable">
                      <div class="">
                        <el-radio-group v-model="user_rule.is_list">
                          <el-radio :label="1">黑名单</el-radio>
                          <el-radio :label="2">白名单</el-radio>
                        </el-radio-group>
                    
                        <el-checkbox-group v-model="checkList">
                          <div v-for="(item) in nameslist" :key="item.id">
                            <el-checkbox :value="item.id" :label="item.mobile"></el-checkbox>
                          </div>
                        </el-checkbox-group>
                      </div>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="btnclick">确定</el-button>
                      </div>
                    </el-dialog>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" round @click="submitAll">提交所有</el-button>
          <div style="margin-bottom: 20px;">
            <!-- <Upload v-model="postForm.image_uri" /> -->
          </div>
        </div>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
// import Upload from '@/components/Upload/singleImage3'
import MDinput from "@/components/MDinput";
import Multiselect from "vue-multiselect"; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import "vue-multiselect/dist/vue-multiselect.min.css"; // 多选框组件css
import Sticky from "@/components/Sticky"; // 粘性header组件
// import { validateURL } from '@/utils/validate'
// import { fetchArticle } from '@/api/article'
// import { userSearch } from '@/api/remoteSearch'
// import Warning from './Warning'
import {
  CommentDropdown,
  PlatformDropdown,
  SourceUrlDropdown
} from "./Dropdown";
import { mapActions } from "vuex";

const defaultForm = {
  // status: "draft",
  title: "", // 文章题目
  content: "", // 文章内容
  content_short: "", // 文章摘要
  source_uri: "", // 文章外链
  image_uri: "", // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ["a-platform"],
  comment_disabled: false,
  importance: 0
};

export default {
  name: "articleDetail",
  components: {
    Tinymce,
    MDinput,
    Multiselect,
    Sticky,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error"
        });
        callback(null);
      } else {
        callback();
      }
    };
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback();
        } else {
          this.$message({
            message: "外链url填写不正确",
            type: "error"
          });
          callback(null);
        }
      } else {
        callback();
      }
    };
    return {
      author:"",
      title:"",
      checkList:[],
      selectednamelist: [],
      value5: [],
      ohterfile: null,
      imagefile: null,
      is_public: 0,
      fileList: [],
      othersfileList: [],
      attachment_file: null,
      image_file: null,
      checkednew: false,
      checkedspecial: false,
      checkedrecommend: false,
      status: 0, //审核状态
      dialogvisable: false,
      user_rule: {
        id: 0,
        news_id: 0,
        level_id: 0,
        is_auth: 0,
        is_list: 0,
        users: []
      },
      nameslist: [],
      viplevelData: [], //会员级别
      tagsData: [], //打标签
      content: "", //富文本
      statusLabelData: [], //状态标签数据
      description: "", //信息短述
      special_checked_list: 1, //最新，特供，推荐
      url: "", //原文地址
      is_origin: 1, //是否转载
      is_topic: 0, //是否标题
      status_label_id: "", //状态标签
      source: "", //信息来源
      reviewOptions: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "审核中"
        },
        {
          value: 2,
          label: "退回修改"
        },
        {
          value: 3,
          label: "审核通过"
        }
      ], //审核状态
      source_date: null, //原文时间
      ownerClass: [], //所属分类
      ownerClassItem: [], //所属分类条目
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: "blur" }]
      }
    };
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length;
    },
    checkednewvalue() {
      return this.checkednew ? 0 : 1;
    },
    checkedspecialvalue() {
      return this.checkedspecial ? 0 : 2;
    },
    checkedrecommendvalue() {
      return this.checkedrecommend ? 0 : 4;
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }
    this.Init();
  },
  methods: {
    btnclick() {
      debugger;
      console.log(this.selectednamelist);
      this.dialogvisable = false;
      // this.user_rule.users
      var arr = this.nameslist.filter(item=>{
        return this.checkList.indexOf(item.mobile)>-1;
      })
      arr.forEach(item => {
        this.user_rule.users.push(item.id);
      });
    },
    otherlistadd(file) {
      debugger
      this.othersfileList.push(file.raw);

      this.getAttachment_file();
    },
    beforUpload(file) {
      this.fileList.push(file.raw);
      this.getImage_file();
    },
    getFlag() {
      let a = this.checkednew ? 1 : 0;
      let b = this.checkedspecial ? 2 : 0;
      let c = this.checkedrecommend ? 4 : 0;
      return a | b | c;
    },

    ...mapActions({
      getCascaderData: "getCascaderData", //取级联数据
      getStatusLabelData: "getStatusLabelData", //状态标签数据
      getTagsListData: "getTagsListData", //获取标签数据
      getVipLevelData: "getVipLevelData", //会员级别
      getNamesListData: "getNamesListData",
      saveNews: "saveNews" //提交所有
    }),
    getAttachment_file() {
      var reader = new FileReader();
      reader.onload = e => {
        this.ohterfile = e.target.result;
      };
      reader.readAsDataURL(this.othersfileList[0]);
    },
    getImage_file() {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileList[0]);
      reader.onload = e => {
        this.imagefile = e.target.result;
      };
    },
    submitAll() {
      //提交所有
      let postdata = {
        id: 0, //新建ID为0
        status: this.status,
        is_topic: this.is_topic,
        category_id: this.ownerClassItem[this.ownerClassItem.length - 1],
        status_label_id: this.status_label_id,
        title: this.title,
        special_flag: this.getFlag(),
        source: this.source,
        author: this.author,
        is_origin: this.is_origin,
        source_date: this.source_date,
        url: this.url,
        description: this.description,
        content: this.content,
        tags: this.value5,
        image: null,
        image_file: this.imagefile,
        attachment: null,
        attachment_file: this.ohterfile,
        is_public: this.is_public,
        user_rule: this.user_rule
      };
      debugger;
      this.saveNews(postdata);
    },
    Init() {
      this.getCascaderData().then(data => {
        //级联
        this.ownerClass = data.data;
      });
      this.getStatusLabelData().then(data => {
        //状态
        this.statusLabelData = data.data;
      });
      this.getTagsListData().then(data => {
        //标签
        this.tagsData = data.data;
      });
      this.getVipLevelData().then(data => {
        this.viplevelData = data.data;
      });
      this.getNamesListData().then(data => {
        this.nameslist = data.data;
        // for(let i=0;i<this.nameslist.length;i++){
        //   this.nameslist[i]['selected']=false;
        //   this.$set(this.nameslist,i,this.nameslist[i])
        // }
      });
    },
    fetchData(id) {
      fetchArticle(id)
        .then(response => {
          this.postForm = response.data;
          // Just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`;
          this.postForm.content_short += `   Article Id:${this.postForm.id}`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000);
      console.log(this.postForm);
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$notify({
            title: "成功",
            message: "发布文章成功",
            type: "success",
            duration: 2000
          });
          this.postForm.status = "published";
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning"
        });
        return;
      }
      this.$message({
        message: "保存成功",
        type: "success",
        showClose: true,
        duration: 1000
      });
      this.postForm.status = "draft";
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return;
        this.userListOptions = response.data.items.map(v => v.name);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  height: 100%;
  .el-scrollbar {
    height: 100%;
  }
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
