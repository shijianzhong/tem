<template>
    <div class="statelabel">

        <el-input size="small" class="newlabelname" placeholder="请输入新增标签内容" v-model="newlabelname" clearable>
        </el-input>
        <el-button class="newlabelbth" type="primary" size="small" @click="addLabelBtn" round>新增</el-button>
        <el-table :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="ID" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="状态标签">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
                    </template>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" size="mini" @click='updata(scope)'>保存</el-button>
                    <el-button v-else size="mini" @click='scope.row.edit=!scope.row.edit'>编辑</el-button>
                    <el-button size="mini" type="danger" @click='delate(scope,scope.$index,list)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "inlineEditTable",
  data() {
    return {
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
      statuslabelinfo: "statuslabelinfo",
      savestatuslabelinfo: "savestatuslabelinfo",
      deletestatulabelinfo: "deletestatulabelinfo"
    }),
    Init() {
      this.statuslabelinfo().then(data => {
        debugger;
        this.list = data.data.map(v => {
          this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title; //  will be used when user click the cancel botton
          return v;
        });
        debugger;
        console.log(this.list);
      });
    },
    addLabelBtn() {
      let requestdata = {
        id: 0,
        name: this.newlabelname
      };
      this.savestatuslabelinfo(requestdata)
        .then(result => {
          if (result.err_code == 0) {
            this.Init();
            this.$message({
              type: "success",
              message: `添加成功`
            });
          }
        })
        .catch(err => {});
    },
    delate(scope, index, rows) {
      this.deletestatulabelinfo(scope.row.id).then(result => {
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
        name: scope.row.name
      };
      this.savestatuslabelinfo(requestdata)
        .then(result => {
          if (result.err_code == 0) {
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
.statelabel {
  .newlabelname {
    width: 15%;
    margin: 15px;

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
