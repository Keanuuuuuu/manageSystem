<!-- 
* @description: 实时控制对话弹窗
* @fileName: controlDialog.vue
* @author:刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->
<template>
  <div class="contentDialog">
    当前选中：
    <div v-for="item in selected" :key="item.index">
      {{ item }}
    </div>
    <div class="control Switch_control">
      <span>开/关</span>
      <el-select 
        :modelValue="value_one" 
        placeholder="选择开关状态" 
        class="Switch_select"
        @change="Switch_change"
        >
        <el-option
          v-for="item in options_one"
          :key="item.value"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="control Mode_control">
      <span>模式</span>
      <el-select 
        :modelValue="value_two" 
        placeholder="选择空调模式" 
        class="Mode_select"
        @change="Mode_change"
        >
        <el-option
          v-for="item in options_two"
          :key="item.value"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="control Wind_speed_control">
      <span>风速</span>
      <el-select 
        :modelValue="value_three" 
        placeholder="选择风速挡位" 
        class="Wind_select"
        @change="Wind_change"
        >
        <el-option
          v-for="item in options_three"
          :key="item.value"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="control Temperature_control">
      <span>温度</span>
      <el-input-number
      @change="Temperature_change"
      :modelValue="num"
      :min="16"
      :max="30"
      controls-position="right"
      class="Temperature_select"
    />
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { mapMutations, mapState, useStore } from 'vuex'
export default {
  name:'controlDialog',
  props: {
    value_one: {
      type: String,
      default: "开"
    },
    value_two: {
      type: String,
      default: "制冷"
    },
    value_three: {
      type: String,
      default: "自动"
    },
    num: {
      type: Number,
      default: 25
    },
    selected:{
      type: Array
    }
  },
  setup(props, { emit }) {
    const options_one = reactive([
      {
        value: '开',
        label: 'Option1',
      },
      {
        value: '关',
        label: 'Option2',
      }
    ])
    const options_two = reactive([
      {
        value: '制冷',
        label: 'Option1',
      },
      {
        value: '制热',
        label: 'Option2',
      },
      {
        value: '送风',
        label: 'Option3',
      },
      {
        value: '除湿',
        label: 'Option4',
      }
    ])
    const options_three = reactive([
      {
        value: '自动',
        label: 'Option1',
      },
      {
        value: '低速',
        label: 'Option2',
      },
      {
        value: '中速',
        label: 'Option3',
      },
      {
        value: '高速',
        label: 'Option4',
      }
    ])

    // vuex相关操作
    const store = useStore()
    const storeMutations = mapMutations(['Switch_control', 'Mode_control', 'Wind_control', 'Temperature_control'])

    const numberValue = computed(() => store.state.number)
    const switchValue = computed(() => store.state.Switch)
    const modeValue = computed(() => store.state.Mode)
    const windValue = computed(() => store.state.Wind)
    const temperatureValue = computed(() => store.state.Temperature)

    function Switch_change(event) {
      store.commit('Switch_control', event)
      emit('updateDialogValue', event)
    }

    function Mode_change(event) {
      store.commit('Mode_control', event)
      emit('updateDialogMode', event)
    }

    function Wind_change(event) {
      // console.log(event)
      store.commit('Wind_control', event)
      emit('updateDialogWind', event)
    }

    function Temperature_change(event) {
      store.commit('Temperature_control', event)
      emit('updateDialogNum', event)
    }

    return {
      options_one,
      options_two,
      options_three,
      Switch_change,
      Mode_change,
      Wind_change,
      Temperature_change,
      ...storeMutations,
      switchValue,
      modeValue,
      windValue,
      temperatureValue,
      numberValue
    }
  }
}
</script>

<style lang="scss" scoped>
.contentDialog{
  display: flex;
  flex-direction: column;
  width: 450px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .control{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 360px;
    margin: 15px auto;
  }
  .Switch_select{
    width: 300px;
  }
  .Mode_select{
    width: 300px;
  }
  .Wind_select{
    width: 300px;
  }
  .Temperature_select{
    width: 300px;
  }
}
</style>