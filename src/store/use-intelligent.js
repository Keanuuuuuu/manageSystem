import { defineStore } from 'pinia';
import { ref } from 'vue'

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
      chooseValue: '',
      chooseNum: 25,
      switchValue: '',
      modeValue: '',
      windValue: '',
      numValue: 25
    },{
      id: 'highTemp',
      type: 2,
      isSelectd: false,
      chooseValue: '',
      chooseNum: 25,
      switchValue: '',
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
    }
  }
});
