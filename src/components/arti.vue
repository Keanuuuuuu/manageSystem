<template>
  <el-row  class="top_navigation_bar">
    <el-col :span="24"> 
      <div class="bar">
        <router-link class="list-group-item overview" active-class="active" to="/overview">总览</router-link>
        <router-link class="list-group-item monitoring" active-class="active" to="/monitoring">内机监控</router-link>
        <router-link class="list-group-item log" active-class="active" to="/log">日志记载</router-link>
        <router-link class="list-group-item id" active-class="active" to="/id">账号管理</router-link>
      </div>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import Bar from './bar.vue'
export default{
  components :{
    Bar
  },
  name:'arti'
}
</script>

<style lang="scss">
.top_navigation_bar{
  height: 85%;
}
.body{
  .el-row {
    border: 1px solid black;
    box-sizing: border-box;
    min-width: 1200px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .list-group-item{
    margin: 10px;
  }
  .bar{
    border-bottom: 1px solid black;
    box-sizing: border-box;
    height: 10%;
    // 各个路由界面的高度百分比 + 顶部路由按键的高度百分比 = 100% 即整个arti组件的高度
  }
}
</style>