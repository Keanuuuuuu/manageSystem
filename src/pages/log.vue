<template>
  <el-config-provider :locale="locale">
    <div class="log_container">
      <LogTitleBar></LogTitleBar>
      <h1>日志记载</h1>
    </div>
  </el-config-provider>
</template>

<script>
import LogTitleBar from '../components/LogTitleBar/index.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
export default{
  name:'log',
  components:{
    LogTitleBar,
    ElConfigProvider
  },
  setup(){ 
    return{
      locale: zhCn
    }
  }
}
</script>