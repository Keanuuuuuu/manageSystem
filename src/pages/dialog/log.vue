<template>
  <div class="log_container">
    <!-- <div class="log_container-head">
      <el-input v-model="pageSize" style="width: 150px; margin-right: 10px" placeholder="日志容量" />
      <el-input v-model="pageNumber" style="width: 150px; margin-right: 10px" placeholder="日志页码" />
      <el-button  type="primary" plain @click="handleClick">点击获取日志</el-button>
    </div> -->
    <div class="log_container-table">
      <el-table :data="tableData" :border="1" stripe height="580">
        <el-table-column type="expand">
          <template #default="props">
            <div m="4" class="message">
              <h3>操作内容</h3>
              <p m="t-0 b-2">模式: {{ props.row.message.mode }}</p>
              <p m="t-0 b-2">房间: {{ props.row.message.name }}</p>
              <p m="t-0 b-2">温度: {{ props.row.message.temperature }}</p>
              <p m="t-0 b-2">风速: {{ props.row.message.windSpeed }}</p>
              <p m="t-0 b-2">状态: {{ props.row.message.status }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Phone" prop="phone" />
        <el-table-column label="Time" prop="time" />
      </el-table>

      <div class="pagination">
        <el-pagination :current-page="currentPage" :small="true" :page-size="pagesize2" :page-sizes="[5, 10, 20, 30, 40]" background
          layout="sizes, prev, pager, next, jumper" :total="totalNum"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmits, defineProps, onMounted } from 'vue'
import { post } from '@/api/http.js'
const currentPage = ref(1)
const pagesize2 = ref(10)
const pageSize = ref(3)
const pageNumber = ref(1)
const tableData = ref([])
const totalNum = ref(0)

onMounted(()=>{
  postLog(10, 1)
})

async function postLog(pageSize, pageNumber) {
   const res = await post('/logs',
      {
        "pageSize": pageSize,
        "pageNumber": pageNumber,
      }
    )
    tableData.value = res.data.userLogs
    totalNum.value = res.data.count
    // console.log(tableData.value);
}

function handleSizeChange(val) {
  pagesize2.value = val
  postLog(val, currentPage.value)
}

function handleCurrentChange(val) {
  currentPage.value = val
  postLog(pagesize2.value, val)
}

function transform(arr) {

}
</script>

<style lang="scss" scoped>
.log_container{
  width: 600px;
  height: 665px;
}
.pagination{
  width: 600px;
}
.log_container-head{
  // margin: 10px;
}

.log_container-table{
  width: 600px;
  height: 665px;
}

.message{
  padding: 0 20px;
}
</style>