<template>
  <div class="logo">
    <div class="img">
      Logo
    </div>
    <div class="title">
      {{Name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
//   props: {
//     msg: String
//   },
  data() {
    return {
      count: 0,
      Name:'中央空调集中管理平台'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo{
  display: flex;
  .img{
    width: 70px;
    background-color: aliceblue;
    border-right: 1px solid black;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title{
    margin-left: 20px;
    height: 50px;
    line-height: 50px;
    font-weight: 600;
    font-size: 20px;
  }
}
</style>