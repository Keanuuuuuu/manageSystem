// 智能控制需要的数据类型
import { ref } from "vue"

export const timeData = ref([{
  id: 'startTime',
  type: 1,
  isSelectd: false,
  firstTime: '',
  switchValue: '',
  modeValue: '',
  windValue: '',
  numValue: 25
},{
  id: 'endTime',
  type: 1,
  isSelectd: false,
  firstTime: '',
  switchValue: '',
  modeValue: '',
  windValue: '',
  numValue: 25
}])

export const tempData = ref([{
  id: 'lowTemp',
  type: 2,
  isSelectd: false,
  modeValue: '',
  windValue: '',
  numValue: 25
}])

export const firstSwitchOption = ref([
  {
    value: '开',
    label: '开',
  },
  {
    value: '关',
    label: '关',
  },
]);
export const ModeOption = ref([  
  {
    value: '制冷',
    label: '制冷',
  },
  {
    value: '制热',
    label: '制热',
  },
  {
    value: '送风',
    label: '送风',
  },
  {
    value: '除湿',
    label: '除湿',
  }
]);
export const WindOption = ref([
  {
    value: '自动',
    label: '自动',
  },
  {
    value: '低速',
    label: '低速',
  },
  {
    value: '中速',
    label: '中速',
  },
  {
    value: '高速',
    label: '高速',
  }
]);

export const secondSwitchOption = ref([
  {
    value: '大于',
    label: '＞',
  },
  {
    value: '小于',
    label: '＜',
  },
]);