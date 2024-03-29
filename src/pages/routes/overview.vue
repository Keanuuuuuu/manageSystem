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
      <p>刷新频率：</p>
      <el-select style="width: 110px" v-model="selectedRateValue" placeholder="选择频率" @change="handleRefreshRateChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button @click="fetchData">手动刷新数据</el-button>
    </div>
    <el-row v-if="store.overviewData" :gutter="30" id="data">
      <el-col :span="5">
        <div class="short panel" id="hourse">
          <h2>房间</h2>
          <h4>{{ store.overviewData.room.running }}/{{ store.overviewData.room.sum }}间</h4>
          <h5>开启空调房间数/房间总数</h5>
          <el-icon class="icon">
            <House />
          </el-icon>
        </div>
        <div class="short panel" id="number">
          <h2>空调内机</h2>
          <h4>内机总数{{ store.overviewData.machine.sum }}台</h4>
          <h4>在线内机{{ store.overviewData.machine.online }}台</h4>
          <h4>运行内机{{ store.overviewData.machine.running }}台</h4>
          <h4>故障内机{{ store.overviewData.machine.error }}台</h4>
          <el-icon class="icon">
            <CreditCard />
          </el-icon>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="long panel" id="data">
          <h2>中央空调内机运行信息</h2>
          <el-icon class="icon">
            <Cpu />
          </el-icon>
          <el-table class="center" :data="store.monitorTableData" style="width: 95%;height: 80%;" v-loading="loading">
            <el-table-column property='name' label="名称" sortable />
            <el-table-column property='status' label="状态" sortable />
            <el-table-column property='mode' label="模式" sortable />
            <el-table-column property='temperature' label="温度" sortable />
            <el-table-column property='windSpeed' label="风速" sortable />
            <el-table-column property='roomTemperature' label="室温" sortable />
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="long panel" id="warn">
          <h2>报警信息</h2>
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
  </div>
</template>

<script setup>
import { post } from "@/api/http.js";
import { ref, onMounted, onUnmounted } from 'vue'

import { useCustomStore } from '@/store'; // 引入pinia

import { dataFlattenById } from '@/utils/treeArr.js'

import { ElMessage } from "element-plus";

const store = useCustomStore()



// 页面挂载时刷新请求
onMounted(() => {
  getOverviewData()
  InitalAirconditionState()
  handleRefreshRateChange()
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

const airconditionNodeArray = ref([])

// 获取原始列表
async function InitalAirconditionState() {
  const res = await post('/machinestate', {
    id: "16"
  }, {
    baseURL: 'http://lab.zhongyaohui.club/'
  })
  airconditionNodeArray.value = res.data
  let dataFlattenByIdResult = dataFlattenById("16", airconditionNodeArray.value) //将有层级的节点数组扁平化
  store.setMonitorTableData(dataFlattenByIdResult)   //将结果交由pinia 在table中展示
  store.setOriginalMonitorTableData(dataFlattenByIdResult) //保存初始数据 筛选用
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

</script>

<style lang="scss" scoped>
#container {
  width: 96%;
  height: 90%;
  // text-align: center;

  #databox {
    position: relative;
    top: 20px;
    display: flex;
    justify-items: center;
    margin-bottom: 4%;

    p {
      line-height: 0px; //不要删
    }

    button {
      margin-left: 15px;
    }
  }

  .panel {
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: $border-radius;
    background-color: rgb(231, 238, 243);

    h2 {
      display: block;
      margin-top: 20px;
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
    margin-top: 20px;
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