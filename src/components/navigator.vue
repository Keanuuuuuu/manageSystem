<template>
  <div class="navigator">
    <div class="search">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigator',
//   props: {
//     msg: String
//   },
  data() {
    return {
      count: 0,
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.navigator{
    width: 100%;
    .search{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>