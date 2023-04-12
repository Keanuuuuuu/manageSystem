<template>
  <el-row  class="top_navigation_bar" style="flex:20;">
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
  }
}
</style>