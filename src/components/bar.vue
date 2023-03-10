<template>
  <div class="bar">
    <div class="overview">总览</div>
    <div class="monitoring">内机监控</div>
    <div class="log">日志记载</div>
    <div class="id">账号管理</div>
  </div>
</template>

<script>
export default {
  name:'Bar',
  data(){
    return  {

    }
  }
}
</script>

<style lang="scss">
.bar{
  display: flex;
  div{
    margin: 0 5px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>