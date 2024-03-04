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
  <el-table :data="data" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="30"/>
    <el-table-column label="定时" width="100">
      <template #default="scope">  
        <el-time-picker v-model="scope.row.firstTime" placeholder="选择时间" size="small" style="width: 90px"/>
      </template>
    </el-table-column>
    <el-table-column width="100">
      <template #default="scope">  
        <span class="selectText">开关</span>
        <el-select v-model="scope.row.switchValue" class="m-2" placeholder="开/关" size="small" style="width: 60px">
          <el-option v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column width="100">
      <template #default="scope">
        <span class="selectText">模式</span>
        <el-select v-model="scope.row.modeValue" class="m-2" placeholder="模式" size="small" style="width: 60px">
          <el-option v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column width="100">
      <template #default="scope">
        <span class="selectText">风速</span>
        <el-select v-model="scope.row.windValue" class="m-2" placeholder="风速" size="small" style="width: 60px">
          <el-option  v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column width="110">
      <template #default="scope">
        <span class="selectText">温度</span>
        <el-input-number v-model="scope.row.numValue" :min="25" :max="30" size="small" controls-position="right" @change="handleChange" style="width: 70px"/>
      </template>
    </el-table-column>
  </el-table>
  <br>
  <br>
  <br>
  <br>
  
  <el-table :data="data" @selection-change="" stripe>
    <el-table-column type="selection" />
    <el-table-column>
      <template #default>
        <el-select v-model="switchValue" class="m-2" placeholder="开/关" size="" style="width: 40px">
          <el-option v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default>
        <el-select v-model="switchValue" class="m-2" placeholder="开/关" size="" style="width: 40px">
          <el-option v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default>
        <el-select v-model="switchValue" class="m-2" placeholder="开/关" size="" style="width: 40px">
          <el-option v-for="item in switchOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column property='name' label="定时"/>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  selected: {
    type: Array, 
  }
})
const data = ref([{
  id: 'startTime',
  isSelectd: false,
  firstTime: '',
  switchValue: '',
  modeValue: '',
  windValue: '',
  numValue: 25
},{
  id: 'endTime',
  isSelectd: false,
  firstTime: '',
  switchValue: '',
  modeValue: '',
  windValue: '',
  numValue: 25
}])
const optionSelected = ref([])
// const 
const switchOptions = [
  {
    lable: '开',
    value: '开'
  },
  {
    lable: '关',
    value: '关'
  }
]

function handleSelectionChange(ev){
  console.log(ev)
  // if()
  console.log(optionSelected.value);
}

function handleSelectionValue(optionSelectedArr, controlType){
  let flag = false
  for (let evobj of ev) {
    flag = false
    optionSelectedArr.value.forEach((item)=>{
      if(item.id && item.id === evobj.id){
        flag = true
      }
    })
    if(!flag){
      optionSelectedArr.value.push(evobj)
    }
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