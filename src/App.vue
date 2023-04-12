<template>
  <div class="body">
    <el-row style="flex:1;">
      <el-col :span="24" class="logo_boder">
        <logo class="logo grid-content bg-purple-dark"></logo>
      </el-col>
    </el-row>
    <Arti></Arti>
  </div>
</template>

<script>
import Logo from './components/Logo.vue'
import Navigator from './components/navigator.vue'
import Menu from './components/menu.vue'
import Arti from './components/arti.vue'

export default {
  name: 'App',
  components: {
    Logo,
    Navigator,
    Menu,
    Arti
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
  .el-row {
    border: 1px solid black;
    box-sizing: border-box;
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