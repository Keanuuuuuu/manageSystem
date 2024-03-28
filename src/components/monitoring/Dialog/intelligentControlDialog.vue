<!-- 
* @description: 智能控制 
* @fileName: intelligentControlDialog.vue
* @author: 文洋 刘世博
* @date: 2024-02-24
* @version: 
!-->

<template>
  <span>智能控制</span>
  当前选中：
  <div v-for="item in selected" :key="item">
    {{ item }}
  </div>
  <br>
  <el-table :data="timeData" @selection-change="handleSelectionChange($event, 'time')">
    <el-table-column type="selection" />
    <el-table-column label="定时" >
      <template #default="scope">  
        <el-time-picker v-model="scope.row.firstTime" placeholder="选择时间" size="small" style="width: 90px"/>
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
        <el-input-number v-model="scope.row.numValue" :min="25" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
  </el-table>

  <br>
  
  <el-table :data="tempData" @selection-change="handleSelectionChange($event, 'temp')">
    <el-table-column type="selection"/>
    <el-table-column label="定温" width="130">
      <template #default="scope">  
        <el-select v-model="scope.row.chooseValue" class="m-2" placeholder="/" size="small" style="width: 50px">
          <el-option v-for="item in secondSwitchOption" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
        <el-input-number v-model="scope.row.chooseNum" :min="25" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
    <el-table-column>
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
    <el-table-column>
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
        <el-input-number v-model="scope.row.numValue" :min="25" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { firstSwitchOption, secondSwitchOption, ModeOption, WindOption } from '@/type/intelligentType.js'
import { useIntelligent } from '@/store/use-intelligent.js';
defineProps({
  selected: {
    type: Array, 
  }
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
</style>