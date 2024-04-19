import { defineStore } from 'pinia';
import { ref } from 'vue'
import { switchStringIntelligentTimeReverse, switchStringIntelligentTempReverse } from '@/utils/digitalTransformation.js'

export const useIntelligent = defineStore({
  id: 'intelligentStore',
  state: () => ({
    timeData: ref([{
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
    }]),
    tempData: ref([{
      id: 'lowTemp',
      type: 2,
      isSelectd: false,
      modeValue: '',
      windValue: '',
      numValue: 25
    }]),
    optionSelectedTime: ref([]),
    optionSelectedTemp: ref([])
  }),
  actions: {
    handleSelectionValue(optionSelectedArr, ev){
      let flag = false
      for (let evobj of ev) {
        flag = false
        optionSelectedArr.forEach((item)=>{
          if(item.id && item.id === evobj.id){
            flag = true
          }
        })
        if(!flag){
          optionSelectedArr.push(evobj)
        }
      }
      // console.log(this.optionSelectedTime, this.optionSelectedTemp);
    },
    clearOptionSelectedTime(){
      this.optionSelectedTime = []
    },
    clearOptionSelectedTemp(){
      this.optionSelectedTemp = []
    },
    setTimeData(time){
      const res = switchStringIntelligentTimeReverse(time)
      this.timeData.forEach((item, index)=>{
        console.log(item);
        item.firstTime = res[index]?.firstTime
        item.switchValue = res[index]?.switchValue
        item.modeValue = res[index]?.modeValue
        item.windValue = res[index]?.windValue
        item.numValue = res[index]?.numValue
      })
    },
    setTempData(temp){
      const res = switchStringIntelligentTempReverse(temp)
      this.tempData.forEach((item, index)=>{
        item.modeValue = res[index]?.modeValue
        item.windValue = res[index]?.windValue
        item.numValue = res[index]?.numValue
      })
    },
    clearTimeData(){
      this.timeData.forEach((item, index)=>{
        item.firstTime = ''
        item.switchValue = ''
        item.modeValue = ''
        item.windValue = ''
        item.numValue = 25
      })
    },
    clearTempData(){
      this.tempData.forEach((item, index)=>{
        item.modeValue = ''
        item.windValue = ''
        item.numValue = 25
      })
    },
  }
});
