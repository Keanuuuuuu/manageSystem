<!-- 
* @description: 设备查询页面
* @fileName: account.vue
* @author: 刘世博
* @date: 2024-01-10
* @version: 
!-->
<template>
  <div class="device-management">
    <el-table ref="multipleTableRef"
      :data="store.deviceSearchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
      :header-cell-style="headerRowStyle" @select="handleSelected" fit>
      <el-table-column prop="buildName" label="楼栋名称"></el-table-column>
      <el-table-column prop="roomName" label="教室名称"></el-table-column>
      <el-table-column prop="machineName" label="设备名称"></el-table-column>
      <el-table-column prop="gateway" label="网关编号"></el-table-column>
      <el-table-column prop="device" label="集控器编号"></el-table-column>
      <el-table-column prop="machineOrder" label="内机地址"></el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :total="total" :page-sizes="[5, 10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDeviceSearch } from '@/store/use-deviceSearch.js';
import { get, post, del, put } from '@/api/http.js'

const store = useDeviceSearch();

onMounted(() => {
  getTableData()
})

const multipleTableRef = ref('')

// 设备查询列表
const getTableData = async () => {
  const response = await post('/equipment')
  store.setDeviceSearchData(response.data)
  console.log(store.deviceSearchData.length);
  total.value = store.deviceSearchData.length
}

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10); // 每页显示条数
const total = ref(0);

// 处理分页器页码变化事件
function handleSizeChange(val) {
  pageSize.value = val;
}

function handleCurrentChange(val) {
  currentPage.value = val;
}

const headerRowStyle = () => { // 修改表头的回调函数
  return {
    backgroundColor: '#E7EEF3 !important'
  }
}
</script>

<style lang="scss" scoped>
.device-management {
  height: calc(100vh - 38px - 28px - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // padding: 20px;
}
</style>
