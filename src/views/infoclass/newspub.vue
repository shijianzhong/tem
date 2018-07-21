<template>
    <div class="generallabel-wrap">
        <div v-if="!isinput" class="generallabel">

            <span class="labeldesc">标签名称:</span>
            <el-input size="small" class="newlabelname" placeholder="请输入新增标签名称" v-model="newlabelname" clearable>
            </el-input>
            <span class="labeldesc">相关标签ID:</span>
            <el-input size="small" class="newlabelname" placeholder="请输入相关标签ID" v-model="aboutIds" clearable>
            </el-input>
            <span class="labeldesc">标签描述:</span>
            <el-input rows="1" type="textarea" size="mini" placeholder="请输入标签描述" v-model="labeldesc" clearable>
            </el-input>
            <el-button class="newlabelbth" type="primary" size="small" @click="addLabelBtn" round>新增</el-button>
            <el-button class="newlabelbth" type="primary" size="small" @click="isinput=!isinput" round>录入新信息</el-button>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="ID" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180px" align="center" label="标签">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
                        </template>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="300px" align="center" label="相关标签">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" v-model="scope.row.relation_tag_ids"></el-input>
                        </template>
                        <span v-else>{{scope.row.relation_tag_names}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180px" align="center" label="描述">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" v-model="scope.row.description"></el-input>
                        </template>
                        <span v-else>{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click='updata(scope)'>相关文章</el-button>
                        <el-button v-if="scope.row.edit" size="mini" @click='updata(scope)'>保存</el-button>
                        <el-button v-else size="mini" @click='scope.row.edit=!scope.row.edit'>编辑</el-button>
                        <el-button size="mini" type="danger" @click='delate(scope,scope.$index,list)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="totalpage">
            </el-pagination>

        </div>
        <div style="height:100%" v-else> 
            <input-news></input-news>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputNews from "./inputnews";
export default {
  name: "inlineEditTable",
  components: { InputNews },
  data() {
    return {
      isinput: false,
      totalpage: 0,
      labeldesc: "",
      aboutIds: "",
      newlabelname: "",
      list: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  created() {},
  mounted() {
    this.Init();
  },
  methods: {
    ...mapActions({
      tagList: "tagList",
      saveTagList: "saveTagList",
      deleteTagInfo: "deleteTagInfo",
      getNewsList: "getNewsList",
      currentPage1: 5
    }),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    Init() {
      this.getNewsList().then(data => {
        debugger;
        this.totalpage = data.data.total;
        this.list = data.data.data.map(v => {
          this.$set(v, "edit", false);
          v.originalTitle = v.title;
          return v;
        });
        console.log(this.list);
      });
    },
    addLabelBtn() {
      let requestdata = {
        id: 0,
        name: this.newlabelname,
        relation_tag_ids: this.aboutIds,
        description: this.labeldesc
      };
      this.saveTagList(requestdata)
        .then(result => {
          if (result.err_code == 0) {
            this.Init();
            this.$message({
              type: "success",
              message: `新增成功`
            });
          }
        })
        .catch(err => {});
    },
    delate(scope, index, rows) {
      this.deleteTagInfo(scope.row.id).then(result => {
        if (result.err_code == 0) {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: `删除成功`
          });
        }
      });
    },
    updata(scope) {
      scope.row.edit = !scope.row.edit;
      debugger;
      let requestdata = {
        id: scope.row.id,
        name: scope.row.name,
        relation_tag_ids: scope.row.relation_tag_ids,
        description: scope.row.description
      };
      this.saveTagList(requestdata)
        .then(result => {
          if (result.err_code == 0) {
            this.Init();
            this.$message({
              type: "success",
              message: `修改成功`
            });
          }
        })
        .catch(err => {});
    },

    cancelEdit(item) {
      debugger;
    },
    handleEdit(index, item) {
      debugger;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        const items = response.data.items;
        this.list = items.map(v => {
          this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title; //  will be used when user click the cancel botton
          return v;
        });
        this.listLoading = false;
      });
    },
    cancelEdit(row) {
      row.title = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "The title has been restored to the original value",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalTitle = row.title;
      this.$message({
        message: "The title has been edited",
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.generallabel-wrap{
    position: absolute;
    left: 0px;
    right: 0px;
    top:0px;
    bottom: 0px;
}
.generallabel {
  .labeldesc {
    margin-left: 15px;
    opacity: 0.7;
  }
  .el-textarea {
    width: 28%;
    margin: 15px 0;
  }
  .newlabelname {
    width: 12%;
    margin: 15px 0;
  }
  .newlabelbth {
    margin-left: 10px;
  }
  .edit-input {
    // padding-right: 100px;
  }
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
