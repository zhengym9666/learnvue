import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Index from '../views/Index'
import BookManage from '../views/BookManage'
import AddBook from '../views/AddBook'


Vue.use(Router)

const routes = [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/
  {
    path:"/",
    name:"图书管理",
    component:Index,
    show:true,
    redirect:"/BookManage",
    children:[
      {
        path:"/BookManage",
        name:"查询图书",
        component:BookManage
      },
      {
        path:"/AddBook",
        name:"添加图书",
        component:AddBook
      }
    ]
  },
  {
    path:'/update',
    component:AddBook,
    name:'修改图书',
    show:false
  }
]

const router = new Router({
  routes,
  mode:'history'//干掉地址栏里边的#号键
})

export default router/*输出路由*/
