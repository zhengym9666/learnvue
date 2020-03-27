<template>
  <div id="app">
    <el-container>
      <el-aside>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose" router :default-openeds="['1', '1-4']"><!--设置默认展开的菜单项，根据index设置-->
          <!--根据模板代码进行改造-->
          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.children">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :key="index+'-'+index2" :index=item2.path
              :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item><!--index为点击菜单链接的路由-->
          </el-submenu>
          <el-menu-item v-for="(item3,index3) in $router.options.routes" :key="index3+''" :index=item3.path v-if="!item3.children && item3.show"
                        :class="$route.path==item3.path?'is-active':''">{{item3.name}}</el-menu-item>

          <!--element拷贝的静态标签代码-->
<!--          <el-menu-item index="1-1" >选项1</el-menu-item>-->
          <!--<el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>-->


        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
<!--    <h index="2" v-on:click="test('hello',$event)">点击测试</h>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    test:function(msg,event) {
     alert(event.currentTarget.getAttribute("index"));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
