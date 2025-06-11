<!-- 
* @description: 总览页面 
* @fileName: overview.vue
* @author: 文洋
* @date: 2024-01-10
* @version: 
!-->

<template>
  <div id="container" class="center">
    <div id="databox">
      <div class="weather-container">
        <Weather />
      </div>
      <div class="btn">
        <el-button @click="handleClickOpen"><el-icon><Rank /></el-icon></el-button>
      </div>
    </div>
    <el-row v-if="store.overviewData" :gutter="30" id="data" class="overview-row">
      <el-col :span="5">
        <div class="short panel" id="hourse">
          <!-- 房间标题 -->
          <div class="header">
            <el-icon class="room-icon"><House /></el-icon>
            <span class="title">房间</span>
          </div>

          <!-- 统计数据 -->
          <div class="score">
            <span class="running">{{ store.overviewData.room.running }}</span>
            <span class="separator">/</span>
            <span class="total">{{ store.overviewData.room.sum }}</span>
          </div>

          <!-- 说明 -->
          <div class="footer">
            <div class="legend">
              <div class="box total"></div>
              <span>开空调的房间数</span>
            </div>
            <div class="legend">
              <div class="box roomNum"></div>
              <span>房间总数</span>
            </div>
          </div>
        </div>
        <div class="short panel" id="number">
          <!-- 空调标题 -->
          <div class="header">
            <el-icon class="service-icon"><CreditCard /></el-icon>
            <span class="title">空调内机</span>
          </div>

          <BarChart :machineData="store.overviewData.machine" />
        </div>
      </el-col>
      <el-col :span="13">
        <OverviewMessage :time="time"></OverviewMessage>
      </el-col>
      <el-col :span="6">
        <div class="long panel" id="warn">
          <span class="title" style="      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 20px; 
      opacity: .6;">报警信息</span>
          <h2 v-if="store.overviewData.warning !== []">暂无报警信息</h2>
          <div v-else>
            <h4>故障内机{{ store.overviewData.warning.machineID }}</h4>
            <h4>故障码{{ store.overviewData.warning.errorCode }}</h4>
          </div>
          <el-icon class="icon">
            <WarnTriangleFilled />
          </el-icon>
        </div>
      </el-col>
    </el-row>
    <div v-else>暂无数据</div>

    <el-dialog v-model="changeSlipOverShow" title="设置自动翻页频率" width="500" :modal="false">
    <el-form :model="form">
      <el-form-item label="翻页频率" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="5s" value="5000" />
          <el-option label="10s" value="10000" />
          <el-option label="20s" value="20000" />
          <el-option label="30s" value="30000" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changeSlipOverShow = false">取消</el-button>
        <el-button type="primary" @click="handleChangeSlipOverShow">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { post } from "@/api/http.js";
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useCustomStore } from '@/store'; // 引入pinia

import { dataFlattenById } from '@/utils/treeArr.js'
import { getWeatherData } from '@/utils/getWeatherData.js'
import systemEventBus from '@/utils/systemEventBus';

import { ElMessage } from "element-plus";

import BarChart from '@/components/overview/echarts.vue'
import Weather from '@/components/overview/weather.vue';  // 引入天气组件
import OverviewMessage from '@/pages/dialog/overviewMessage.vue'

const Store = require('electron-store'); 
const Estore = new Store();
const store = useCustomStore()
const route = useRouter();  // 获取当前路由对象
const changeSlipOverShow = ref(false)

const time = ref(5000)
const form = reactive({
  region: ''
})

// 页面挂载时刷新请求
onMounted(() => {
  getOverviewData()
  handleRefreshRateChange()
  // getWeatherData()
  systemEventBus.$on('slipOver', (res) => {
    changeSlipOverShow.value = true;
  });
})

// 在组件销毁时清除定时器
onUnmounted(() => {
  clearInterval(timerId);
});

let OverviewData = ref('')

async function getOverviewData() {
  const res = await post('/overview', null, {
    baseURL: 'http://lab.zhongyaohui.club/'
  })
  console.log(res.data);
  store.setOverviewData(res.data)
}

let options = [{
  value: null,
  label: '无'
}, {
  value: '30',
  label: '30秒'
}, {
  value: '60',
  label: '1分钟'
}, {
  value: '300',
  label: '5分钟'
}, {
  value: '900',
  label: '15分钟'
}, {
  value: '1800',
  label: '30分钟'
}]

let selectedRateValue = ref('')

// 设置定时器，根据选择的刷新频率定时刷新数据
let timerId;

const handleRefreshRateChange = () => {
  clearInterval(timerId); // 清除之前的定时器
  const refreshRate = parseInt(selectedRateValue.value, 10);
  if (!isNaN(refreshRate) && refreshRate > 0) {
    // 设置新的定时器
    timerId = setInterval(() => {
      fetchData();
    }, refreshRate * 1000);
  }
};

const fetchData = async () => {
  try {
    // 执行获取数据的逻辑，例如重新调用 InitalAirconditionState 方法
    await InitalAirconditionState();
    ElMessage({
      showClose: true,
      message: "已成功更新数据！",
      type: "success",
      offset: 150
    });
  } catch (error) {
    ElMessage({
      showClose: true,
      message: `数据更新失败: ${error.message}`,
      type: "error",
      offset: 150
    });
  }
};

function handleClickOpen(){
  systemEventBus.$emit('openOverviewLog', '中央空调内机运行信息');
}

function handleChangeSlipOverShow(){
  time.value = Math.floor(form.region);
  Estore.set('slipOver', time.value);
  console.log(time.value);
  changeSlipOverShow.value = false;
  ElMessage({
    message: "设置成功",
    type: "success"
  })
}
</script>

<style lang="scss" scoped>
#container {
  width: 96%;
  height: 90%;

  #databox {
    // position: relative;
    // top: 20px;
    display: flex;
    height: 10%;
    justify-items: center;
    margin-top: 10px;
    margin-bottom: 10px;

    .weather-container {
      // position: absolute;
      height: 100%;
      // top: 50%;
    }


    .btn {
      position: absolute;
      left: calc(50% + 150px);
      margin-top: 20px;
      // right: 20px;
      // top: 30px;
      // transform: translateY(-50%);
      // display: flex;
    }
  }

  .overview-row {
    // position: absolute;
    height: 85%;
    // bottom: 40px; /* 将el-row部分下移距离底部20px */
    width: 100%;
  }

  #hourse {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    /* 标题部分 */
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start; /* 靠左对齐 */
      width: 100%;
      margin-bottom: 10px;
      opacity: .6;

      /* 房间图标 */
      .room-icon {
        font-size: 30px;
        margin-right: 8px;
      }
    }

    /* 计数部分 */
    .score {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      margin: 12px 0;

      .running {
        color: #007aff; /* 运行中的房间颜色 */
      }

      .separator {
        color: grey;
        margin: 0 8px;
      }

      .total {
        color: black;
      }
    }

    /* 说明部分 */
    .footer {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 12px;
      margin: 0 20px 12px 0;

      .box {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        margin-right: 6px;
      }
      .total {
        background-color: #007aff;
      }

      .roomNum {
        background-color: black;
      }

      .legend {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666;
      }
    }
  }

  #number {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    /* 标题部分 */
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start; /* 靠左对齐 */
      width: 100%;
      margin-bottom: 10px;
      opacity: .6;


      /* 房间图标 */
      .service-icon {
        font-size: 30px;
        margin-right: 8px;
      }
    }
  }

  .panel {
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: $border-radius;
    background-color: rgb(246,248,254);
    border: 1px solid black;

    h2 {
      display: block;
      margin-top: 15px;
      margin-left: 25px;
      opacity: .6;
    }

    .icon {
      position: absolute;
      font-size: 65px;
      bottom: 5px;
      right: 25px;
      opacity: 0.2;
    }
  }

  h4 {
    margin-left: 15px;
    span{
      margin: 3px;
      font-size: 20px;
      color: rgb(123,143,216);
    }
  }

  h5 {
    margin-left: 10px;
  }

  .panel h2:nth-child(2) {
    text-align: center;
    margin: 0px;
    opacity: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .long {
    height: 70vh;
    position: relative;
  }

  .short {
    height: 34vh;
    position: relative;
  }

  .panel:hover {
    transform: scale(1.02);
  }

  .panel.short:nth-child(2) {
    /* 添加样式，例如修改背景颜色 */
    margin-top: 16px;
  }
}


.center {
  left: 50%;
  transform: translate(-50%);
  position: relative;
}


// 以下代码用于让el-table背景等部分透明 【勿删】

/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}

/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
  border: 0; //去除表格
}

/*去除底边框*/
::v-deep.el-table td.el-table__cell {
  border: 0;
}

::v-deep.el-table th.el-table__cell.is-leaf {
  border: 0;
}

/*去除底部灰条.el-table::before*/
::v-deep .el-table__inner-wrapper::before {
  display: none;
}
</style>