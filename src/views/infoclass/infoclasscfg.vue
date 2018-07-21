// 信息分类配置
<template>
    <div class="infoclasscfg">
        <!-- 父类表-->
        <el-table v-if="!ischildren" :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="ID" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="信息分类">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
                    </template>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column width="200px" align="center" label="显示底部导航">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-select size="small" v-model="scope.row.is_nav" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <!-- <el-input class="edit-input" size="small" v-model="scope.row.is_nav"></el-input> -->
                    </template>
                    <span v-else>{{scope.row.is_nav==0?"否":"是"}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="tochilddren(scope)">名下子类</el-button>
                    <el-button v-if="scope.row.edit" size="mini" @click='updata(scope)'>保存</el-button>
                    <el-button v-else size="mini" @click='scope.row.edit=!scope.row.edit'>修改</el-button>
                    <el-button size="mini" type="danger" @click='delate(scope,scope.$index,list)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 子类表 -->
        <div v-else>
            <el-button style="margin:15px" type="primary" round size="small" @click="ischildren=!ischildren">返回</el-button>
            <el-table :data="childrenlist" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

                <el-table-column align="center" label="ID" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="父分类" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.parentname}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="180px" align="center" label="信息分类">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
                        </template>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" label="显示底部导航">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-select size="small" v-model="scope.row.is_nav" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-input class="edit-input" size="small" v-model="scope.row.is_nav"></el-input> -->
                        </template>
                        <span v-else>{{scope.row.is_nav==0?"否":"是"}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.edit" size="mini" @click='updata(scope)'>保存</el-button>
                        <el-button v-else size="mini" @click='scope.row.edit=!scope.row.edit'>修改</el-button>
                        <el-button size="mini" type="danger" @click='delate(scope,scope.$index,childrenlist)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "inlineEditTable",
  data() {
    return {
      list: null,
      childrenlist: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      ischildren: false
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
    this.getinfocategory().then(data => {
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
  methods: {
    ...mapActions({
      getinfocategory: "getinfocategory",
      updateinfocfg: "updateinfocfg",
      deleteinfocfg: "deleteinfocfg",
      childreninfo: "childreninfo"
    }),
    tochilddren(scope) {
      this.ischildren = true;
      this.childreninfo(scope.row.id).then(result => {
          debugger
        
        this.childrenlist = result.data.subitems.map(v => {
          this.$set(v,"parentname",result.data.category.name);
          this.$set(v, "edit", false); 
          v.originalTitle = v.title; 
          return v;
        });
        debugger;
        console.log(this.childrenlist);
      });
    },

    delate(scope, index, rows) {
      this.deleteinfocfg(scope.row.id).then(result => {
          debugger
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
        parent_id: scope.row.parent_id,
        name: scope.row.name,
        is_nav: scope.row.is_nav
      };
      this.updateinfocfg(requestdata)
        .then(result => {
          debugger;
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

<style lang="scss">
.infoclasscfg {
  .edit-input {
    padding-right: 100px;
    .el-input__inner {
      width: 150px;
    }
  }
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
