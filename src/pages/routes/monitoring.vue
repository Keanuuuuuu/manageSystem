<!-- 
* @description: 内机监控核心页面 【备注】：左侧树节点的数据与中心看板的数据并不相同，看板扁平数据由树节点数据id查询得来（初始固定查询id=16）
* @fileName: monitoring.vue
* @author: 刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->


<template>
  <div class="content">
    <left-tree></left-tree>

    <div class="Monitor">
      <monitor-display-head></monitor-display-head>

      <!-- 按钮控制组 -->
      <monitor-display-control :dialogVisible="dialogVisible" :control_dialogValue="control_dialogValue"
        :intelligent_controlValue="intelligent_controlValue" @updateDialogVisible="dialogVisible = $event"
        @updateControl_dialogValue="control_dialogValue = $event"
        @updateIntelligent_controlValue="intelligent_controlValue = $event">
      </monitor-display-control>


      <div class="Monitor_the_display_data_list">
        <el-table ref="multipleTableRef"
          :data="store.monitorTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
          @selection-change="handleSelectionChange" stripe :header-cell-style="headerRowStyle">
          <!-- 
            1、ele对于列表中每一项数据的展示可以使用property属性，也可以使用template模板 
            2、sortable为设置是否启用排序功能
            3、v-mouse-menu为列表元素右键的菜单设置
            4、tableData.slice为分页相关
            5、selection-change当选择项发生变化时会触发该事件
          -->
          <el-table-column type="selection" />
          <el-table-column property='name' label="名称" sortable />
          <el-table-column property='status' label="状态" sortable />
          <el-table-column property='mode' label="模式" sortable />
          <el-table-column property='temperature' label="温度" sortable />
          <el-table-column property='windSpeed' label="风速" sortable />
          <el-table-column property='roomTemperature' label="室温" sortable />
          <el-table-column label="详情">
            <template #default>
              <el-button>详情...</el-button>
            </template>
          </el-table-column>
          <el-table-column label="智能控制" width="140">

            <template #default>
              <el-switch size="small" />
            </template>
          </el-table-column>
        </el-table>
        <!-- 以上是使用ele列表内容 -->

        <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]" background
          layout="total, sizes, prev, pager, next, jumper" :total="store.monitorTableData.length"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        <!-- 以上是分页器内容 -->
      </div>
    </div>
  </div>


  <el-dialog :modelValue="dialogVisible" :title="titleName" @closed="close" :width="width" center>
    <el-scrollbar height="400px">
      <!-- 实时控制 -->
      <control-dialog v-if="control_dialogValue" :value_one="value_one" :value_two="value_two"
        :value_three="value_three" :num="num" :selected="[...selected]" @updateDialogValue="value_one = $event"
        @updateDialogMode="value_two = $event" @updateDialogWind="value_three = $event" @updateDialogNum="num = $event">
      </control-dialog>

      <!-- 智能控制 -->
      <intelligent-control v-if="intelligent_controlValue" :selected="[...selected]"></intelligent-control>


    </el-scrollbar>
    <template #footer>
        <el-button v-show="control_dialogValue || intelligent_controlValue" @click="cancel">取消</el-button>
        <el-button v-show="control_dialogValue || intelligent_controlValue"
          @click="confirm(control_dialogValue, intelligent_controlValue)">确定</el-button>
      </template>
  </el-dialog>
</template>

<script setup>
import { toRaw, ref, computed } from 'vue'
import { post } from '@/api/http.js'
import { ElMessage } from "element-plus"

import { switchString } from '@/utils/digitalTransformation.js'
import ConcurrencyRequest from '@/utils/ConcurrencyRequest.js'
import systemEventBus from '@/utils/systemEventBus';

import { useCustomStore } from '@/store'; // 引入pinia
import { useIntelligent } from '@/store/use-intelligent.js'

import controlDialog from '@/components/monitoring/Dialog/controlDialog.vue'
import intelligentControl from '@/components/monitoring/Dialog/intelligentControlDialog.vue'

import MonitorDisplayHead from '@/components/monitoring/ControlComponents/Monitor_display_head.vue'
import MonitorDisplayControl from '@/components/monitoring/ControlComponents/Monitor_display_control.vue'
import leftTree from '@/components/monitoring/leftTree.vue'


const store = useCustomStore()
const intelligentStore = useIntelligent()

const handleSelectionChange = (ev) => { // 当选择项发生变化时会触发该事件
  for (const evobj of ev) {
    selected.value.add(evobj.id)
  }
}

const dialogVisible = ref(false)

const control_dialogValue = ref(false)
const intelligent_controlValue = ref(false)


const titleName = ref('')

const currentPage = ref(1)
const pageSize = ref(10)

const value_one = ref()
const value_two = ref()
const value_three = ref()
const num = ref()
const selected = ref(new Set())
const width =  computed(() => control_dialogValue.value?600:700)



// 修改内机状态的POST请求
async function modifyNodePost(selectedobj, res) {
  console.log(selectedobj, res);
  return new Promise((resolve, reject) => {
    post('/controlMachine',
      {
        "name": selectedobj,
        "status": `${res[0]}`,
        "mode": `${res[1]}`,
        "temperature": `${res[3]}`,
        "windSpeed": `${res[2]}`
      }, {
      baseURL: 'http://lab.bitstone14.xyz/'
    }
    ).then(async (res) => {
      console.log(res);
      systemEventBus.$emit('updateAirconditionPost') //修改之后触发更新
      resolve(res)
    }, async (resaon) => {
      reject(resaon);
    })
  })
}

// pinia
const switchValue = computed(() => store.Switch);
const modeValue = computed(() => store.Mode);
const windValue = computed(() => store.Wind);
const temperatureValue = computed(() => store.Temperature);


function confirm(clShow, itShow) {
  console.log(clShow, itShow);
  if (clShow) {
    // console.log(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)
    // 拿到数据后发送请求，后期需完善数据是否输入及格式检测
    const res = switchString(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)

    // 发送请求后关闭窗口
    dialogVisible.value = false

    if ([...selected.value].length === 0) {
      ElMessage({
        showClose: true,
        message: "控制的空调数目为空或控制项不完整",
        type: "warning",
      });
      return
    }

    modifyNodePost([...selected.value], res)
  }else {
    console.log(intelligentStore.optionSelectedTime, intelligentStore.optionSelectedTemp);
    if ([...selected.value].length === 0 || (intelligentStore.optionSelectedTime.length === 0 && intelligentStore.optionSelectedTemp.length === 0)) {
      ElMessage({
        showClose: true,
        message: "控制的空调数目为空或控制项不完整",
        type: "warning",
      });
      return
    }
  }
}

function cancel() {
  // 触发cancel dialog不关闭，数据清空
  selected.value.clear()
  dialogVisible.value = false
}

function close() {
  selected.value.clear()
  dialogVisible.value = false
  control_dialogValue.value = false
  intelligent_controlValue.value = false
}


function handleSizeChange(val) {
  pageSize.value = val
}

function handleCurrentChange(val) {
  currentPage.value = val
}


const headerRowStyle = ({ row, rowIndex }) => { // 修改表头的回调函数
  return {
    backgroundColor: '#E7EEF3 !important'
  }
}



</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: row;
  height: 82vh;
  background-repeat: no-repeat;
  // 路由界面的高度百分比 + 顶部路由按键的高度百分比 = 100% 即整个arti组件的高度
}

.Monitor {
  width: 90%;
}

.Monitor_the_display_data_list {
  height: 82%;
  // 在内机控制界面的右侧 列表的高度 + 头部高度 + 控制区域高度 = 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .table {
    background-color: #E7EEF3;
    border-collapse: collapse;
  }
}

.tree {
  border-right: 1px solid black;
  box-sizing: border-box;
  width: 20%;
}

.modify {
  cursor: pointer;
  color: rgb(33, 66, 214);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

.el-table tr {
  background-color: #E7EEF3;
}

.el-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>