<template>
  <div class="long panel" id="data">
    <!-- <div class="head">
      <h2>中央空调内机运行信息</h2>
    </div> -->
    
    <el-table class="center" 
      :data="paginatedData" 
      ref="data"
      style="width: 100%; height: 90%" v-loading="loading"
      :default-sort="{ prop: 'status', order: 'ascending' }"
      fit
    >
      <el-table-column label="房间">
        <template #default="scope">
          <span>{{ scope.row.room }}</span>
        </template>
      </el-table-column>
      <el-table-column property='name' label="内机" min-width="110px"/>
      <el-table-column property='status' label="开关" sortable/>
      <el-table-column property='mode' label="模式"/>
      <el-table-column property='temperature' label="温度"/>
      <el-table-column property='windSpeed' label="风速"/>
      <el-table-column property='roomTemperature' label="室温"/>
      <el-table-column label="智控">
        <template #default="scope">
          <span>{{ intelligent(scope.row.autoControl) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <span v-if="scope.row.faultCode === '1'">在线</span>
          <span v-else-if="scope.row.faultCode === '0'">掉线</span>
          <span v-else>{{ scope.row.faultCode }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="handlePageChange"
      layout="prev, pager, next"
    />
  </div>
</template>

<script setup>
import { post } from "@/api/http.js";
import systemEventBus from '@/utils/systemEventBus';
import { dataFlattenById } from '@/utils/treeArr.js'

import { onMounted, ref, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router'
import { useCustomStore } from '@/store';
import { number } from "echarts";

const props = defineProps({
  time: number
})

const Store = require('electron-store'); 
const Estore = new Store();
const { ipcRenderer } = require('electron');
const store = useCustomStore();
const airconditionNodeArray = ref([]);
const route = useRouter();  // 获取当前路由对象
const isOpenOverviewLog = ref(true)
const data = ref();

const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return store.monitorTableData.slice(start, end);
});
let intervalId = null; // 用于存储定时器 ID

onMounted(async ()=>{
  await InitalAirconditionState();
  isOpenOverviewLog.value = true

  // 如果是通过“点击”打开窗口，则展示“关闭”按钮
  if(route.currentRoute.value.fullPath == '/dialog/overviewLog'){
    isOpenOverviewLog.value = false
  }

  calculatePageSize();

  window.addEventListener('resize', calculatePageSize);

  startAutoPageFlip();
})

function startAutoPageFlip() {
  console.log(Estore.get('slipOver'));
  const ESTime = Estore.get('slipOver')
  if(ESTime == undefined){
    if (intervalId) clearInterval(intervalId); // 清除旧的定时器
    intervalId = setInterval(() => {
      if (currentPage.value < Math.ceil(totalItems.value / pageSize.value)) {
        currentPage.value++;
      } else {
        currentPage.value = 1;
      }
    }, props.time);
  }else {
    if (intervalId) clearInterval(intervalId); // 清除旧的定时器
    intervalId = setInterval(() => {
      if (currentPage.value < Math.ceil(totalItems.value / pageSize.value)) {
        currentPage.value++;
      } else {
        currentPage.value = 1;
      }
    }, ESTime);
  }
}

function restartAutoPageFlip(newTime) {
  clearInterval(intervalId); // 清除旧定时器
  if (newTime > 0) {
    intervalId = setInterval(() => {
      if (currentPage.value < Math.ceil(totalItems.value / pageSize.value)) {
        currentPage.value++;
      } else {
        currentPage.value = 1;
      }
    }, newTime);
  }
}

// 监听 props.time 变化，重新设置定时器
watch(() => props.time, (newTime) => {
  restartAutoPageFlip(newTime);
});

watch(pageSize, () => {
  currentPage.value = 1;
});

function calculatePageSize() {
  setTimeout(()=>{
    const windowHeight = data.value.$el.clientHeight;
    const rowHeight = 38;
    const availableHeight = windowHeight;
    pageSize.value = Math.floor(availableHeight / rowHeight) -1 ;
  },1000)
}

function handlePageChange(page) {
  currentPage.value = page;
}

const intelligent = (autoControl) => {
  if(autoControl === 0){
    return '无'
  }else if(autoControl === 1){
    return '定时'
  }else if(autoControl === 2){
    return '定温'
  }else if(autoControl === 3){
    return ''
  }
}

// 如果不用EStore，只能在打开大屏的时候再请求一次数据，因为不同窗口意味着不同Vue实例
async function InitalAirconditionState() {
  const res = await post('/machinestate', {
    id: "16"
  }, {
    baseURL: 'http://lab.zhongyaohui.club/'
  })
  airconditionNodeArray.value = res.data;
  const dataFlattenByIdResult = dataFlattenById("16", airconditionNodeArray.value);
  store.setMonitorTableData(dataFlattenByIdResult);
  store.setOriginalMonitorTableData(dataFlattenByIdResult);

  totalItems.value = dataFlattenByIdResult.length;
}

</script>

<style lang="scss" scoped>
.long {
  height: 100vh;
  position: relative;

  .head {
    position: relative;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  h2 {
    text-align: center;
    margin: 0;
  }

  .btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
  }

  .el-button {
    margin-left: 10px;
  }

  .center {
    left: 50%;
    transform: translate(-50%);
    position: relative;
  }

  .el-pagination {
    text-align: center;
    box-sizing: border-box;
    left: 50%;
    transform: translate(-50%);
    position: relative;
  }
}
</style>