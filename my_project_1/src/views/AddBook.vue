<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <input type="hidden" prop="id" value="value">
    <el-form-item label="图书名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="ruleForm.price"></el-input>
    </el-form-item>
    <el-form-item label="出版社" prop="author">
      <el-input v-model="ruleForm.publish"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  import {validateFloat} from '../validate/validate'  //导入校验规则
  const axios = require('axios')
  export default {
    data() {
      var rules = {
        name: [
          { required: true, message: '图书名称不能为空', trigger: 'blur' }
        ],
        author:[
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        price:[
          { required: true, message: '价格不能为空', trigger: 'blur'},
          // {validator:validateFloat,trigger:'blur'}
        ],
        publish:[
          { required: true, message: '出版社不能为空', trigger: 'blur' }
        ]
      };
      return {
        ruleForm: {
          id:'',
          name: '',
          author: '',
          price:'',
          publish:''
        },
        rules: rules
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8181/book/save',this.ruleForm).then(function(resp){
              var msg;
              if (_this.ruleForm.id>0) {
                msg = "修改成功";
              } else {
                msg = "添加成功"
              }
              if(resp.data == 'success'){
                _this.$alert('《'+_this.ruleForm.name+'》'+msg+'！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/BookManage')
                  }
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      findById(id,_this) {
        // var _this = this;//这个this是指向父对象，即调用我的created方法
        var _this = _this
        axios.get('http://localhost:8181/book/findById/'+id).then(function(resp){
          console.log(resp.data);
          var book = resp.data;
          _this.ruleForm.id = book.id;
          _this.ruleForm.name = book.name;
          _this.ruleForm.author = book.author;
          _this.ruleForm.price = book.price;
          _this.ruleForm.publish = book.publish;
        })
      },
      promiseTest() {
        Promise.all([this.test1()]).then(()=>{//多个方法promise时，按照层级进行调用，如先调第一个方法的第一层resolve,再调第二个方法的第一层resolve，以此类推...
          console.log("test")
        });
      },
      test1(msg) {
        return new Promise((resolve,reject) =>{
          //第一层业务逻辑
          console.log("test1-1")
          //执行完第一层逻辑，调用执行第二层逻辑
          resolve("test1-2")//顶层必须要resolve调用者Promise.all才知道是完成调用，才会调用它的then方法，即promiseTest的then，否则它不会执行
        }).then(data =>{
          //第二层逻辑
          console.log(data)
          //执行完第二层逻辑，调用第三层逻辑
          return Promise.resolve(data+"-1");
        }).then(data=>{
          //第三层逻辑
          console.log(data);
        }).catch(err =>{
          console.log("test1出错")
        });
      },
     /* test2(msg) {
        return new Promise((resolve,reject) =>{
          console.log("test2-1")
          resolve("test2-2")
        }).then(data=>{
          console.log(data)
        }).catch(err=>{
          console.log("test2出错")
        })
      }*/
    },
    created() {
      var _this = this;//把当前对象传入，因为调用created的是Vue页面对象，只有传给子函数，子函数才能使用到页面对象的属性及值
      const id = this.$route.query.id;
      if (id>0) {
        this.$options.methods.findById(id,_this);
      }
      this.$options.methods.promiseTest();
    }
  }
</script>

