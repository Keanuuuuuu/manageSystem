<!-- 
* @description: 智能控制 
* @fileName: intelligentControlDialog.vue
* @author: 文洋 刘世博
* @date: 2024-02-24
* @version: 
!-->

<template>
  <div class="contentDialog-head">
    <el-scrollbar>
      <div class="contentDialog-head-content">
          <span>当前选中：</span>
          <div v-for="(item, index) in selected" :key="item.index">
            {{ item }}{{ selected.length > 1 && index !== selected.length - 1?'、':"" }}
          </div>
      </div>
    </el-scrollbar>
  </div>
  <br>
  <el-table :data="timeData" @selection-change="handleSelectionChange($event, 'time')">
    <el-table-column type="selection" />
    <el-table-column label="定时" >
      <template #default="scope">  
        <el-time-picker v-model="scope.row.firstTime" placeholder="选择时间" size="small" style="width: 90px" value-format="HH:mm:ss"/>
      </template>
    </el-table-column>
    <el-table-column >
      <template #default="scope">  
        <span class="selectText">开关</span>
        <el-select v-model="scope.row.switchValue" class="m-2" placeholder="开/关" size="small" style="width: 70px">
          <el-option v-for="item in firstSwitchOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <span class="selectText">模式</span>
        <el-select v-model="scope.row.modeValue" class="m-2" placeholder="模式" size="small" style="width: 60px">
          <el-option v-for="item in ModeOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column >
      <template #default="scope">
        <span class="selectText">风速</span>
        <el-select v-model="scope.row.windValue" class="m-2" placeholder="风速" size="small" style="width: 60px">
          <el-option  v-for="item in WindOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <span class="selectText">温度</span>
        <el-input-number v-model="scope.row.numValue" :min="20" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
  </el-table>

  <br>
  
  <el-table :data="tempData" @selection-change="handleSelectionChange($event, 'temp')">
    <el-table-column type="selection"/>
    <el-table-column label="定温" width="120">
      <template #default="scope">
        <span class="selectText">模式</span>
        <el-select v-model="scope.row.modeValue" class="m-2" placeholder="模式" size="small" style="width: 60px">
          <el-option v-for="item in ModeOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column width="120">
      <template #default="scope">
        <span class="selectText">风速</span>
        <el-select v-model="scope.row.windValue" class="m-2" placeholder="风速" size="small" style="width: 60px">
          <el-option  v-for="item in WindOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <span class="selectText">温度</span>
        <el-input-number v-model="scope.row.numValue" :min="20" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { firstSwitchOption, secondSwitchOption, ModeOption, WindOption } from '@/type/intelligentType.js'
import { useIntelligent } from '@/store/use-intelligent.js';
import { post } from '@/api/http.js'
const props = defineProps({
  selected: {
    type: Array, 
  }
})

onMounted(()=>{
  store.clearOptionSelectedTime()
  store.clearOptionSelectedTemp()
  store.clearTimeData()
  store.clearTempData()
  controlOnly()
})

const store = useIntelligent();
const timeData = computed(() => store.timeData);
const tempData = computed(() => store.tempData);
const optionSelectedTime = computed(() => store.optionSelectedTime);
const optionSelectedTemp = computed(() => store.optionSelectedTemp);

function handleSelectionChange(ev, type){
  if(type === 'time'){
    store.clearOptionSelectedTime()
    store.handleSelectionValue(optionSelectedTime.value, ev)
  }else if(type === 'temp'){
    store.clearOptionSelectedTemp()
    store.handleSelectionValue(optionSelectedTemp.value, ev)
  }
  console.log(optionSelectedTime.value[0], optionSelectedTemp.value);
}

async function controlOnly(){
  console.log("触发control");
  if(props.selected.length === 1){
    const res = await post('auto/infor', { "id": props.selected[0],})
    console.log(res)
    store.setTimeData(res.data.time)
    store.setTempData(res.data.temperature)
  }
}
</script>

<style lang="scss" scoped>
.test{
  display: flex;
  flex-direction: row;
}

.selectText{
  font-size: 10px;
  margin-right:5px;
}

::v-deep.el-table .cell {
  padding: 0  5px !important;
}

.contentDialog-head{
    .contentDialog-head-content{
      span{
        min-width: 70px;
      }
      display: flex;
      flex-direction: row;
      width: 360px;
    }
  }
</style>