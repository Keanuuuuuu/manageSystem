<template>
  <el-config-provider :locale="locale">
    <div class="log_container">
      <h1>日志记载</h1>
    </div>
  </el-config-provider>
</template>

<script>

import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default {
  name: 'log',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss" scoped>
html{
  border: 1px solid black;
}
.log_container{
  height: 300px;
  background-color: black;
}

</style>