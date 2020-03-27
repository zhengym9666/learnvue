<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 70%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图书名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
        width="120">
      </el-table-column>
      <el-table-column
        prop="price"
        width="120"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="publish"
        label="出版社">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
  const axios = require('axios');
  export default {
    methods: {
      test() {
        // alert('test')
      },
      deleteBook(row){
        const _this = this
        axios.delete('http://localhost:8181/book/deleteById/'+row.id).then(function(resp){
          _this.$alert('《'+row.name+'》删除成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        })
      },
      edit(row) {
        this.$router.push({
          path: '/update',
          query:{
            id:row.id
          }
        })
      },
      page(currentPage){
        const _this = this  //将当前的对象赋值给_this，方便在获取数据之后绑定值
        axios.get('http://localhost:8181/book/findAll/'+(currentPage-1)+'/6').then(function(resp){
          console.log(resp)
          _this.tableData = resp.data.content
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElements
        })
      }
    },

    data() {
      // alert('data');
      return {
        pageSize:2,
        total:11,
        tableData: [{
          id: 1,
          name: '解忧杂货店',
          author: '东野圭吾',
          price:'12',
          publish:'人民出版社'
        }, {
          id: 2,
          name: '追风筝的人',
          author: '卡勒德·胡赛尼',
          price:'12',
          publish:'人民出版社'
        }, {
          id: 3,
          name: '人间失格',
          author: '太宰治',
          price:'12',
          publish:'人民出版社'
        }]
      }
    },

    created() {
      const _this = this
      axios.get('http://localhost:8181/book/findAll/0/6').then(function(resp){
        console.log(resp);
        _this.tableData = resp.data.content
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElements
      })
      // this.$options.methods.test();//在一个方法中调用另一个方法
      // alert("created")
    }

    //data方法和created方法的执行顺序：先执行data,后created，data方法是最先开始执行的
  }
</script>
