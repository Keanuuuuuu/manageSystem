<template>
  <div class="body">
    <el-row style="flex:1;">
      <el-col :span="24" class="logo_boder">
        <logo class="logo grid-content bg-purple-dark"></logo>
      </el-col>
    </el-row>
    <el-row style="flex:1;" class="top_navigation_bar">
      <el-col :span="24"> 
        <bar class="grid-content bg-purple"></bar>
      </el-col>
    </el-row>
    <el-row style="flex:20;">
      <el-col :span="6">
        <div class="navigator grid-content1 bg-purple">
          <navigator></navigator>
          <Menu></Menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content1 bg-purple-light">
        <router-view></router-view>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from './components/Logo.vue'
import Navigator from './components/navigator.vue'
import gridCol from './components/grid-col.vue'
import gridRow from './components/grid-row.vue'
import Menu from './components/menu.vue'
import Bar from './components/bar.vue'

export default {
  name: 'App',
  components: {
    Logo,
    Navigator,
    gridCol,
    gridRow,
    Menu,
    Bar
  },
  mounted(){
  }
}
</script>

<style lang="scss">
// @import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
.body{
  width: 95vw;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100vh;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  padding-left: calc(100vw - 100%);
  .top_navigation_bar{
    border: 1px solid black;
    box-sizing: border-box;
  }
  .logo_boder{
    border: 1px solid black;
    box-sizing: border-box;
  }
  .el-row {
    min-width: 1200px;
    &:last-child {
    margin-bottom: 0;
    }
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 50px;
    height: 100%;
  }
  .grid-content1 {
    min-height: 500px;
    height: 100%;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>