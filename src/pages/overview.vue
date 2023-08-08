<template>
  <div>
      总览
      <button @click="getNumberOfMachine">获取1</button>
      <button @click="getAllDevice">获取2</button>
      <button @click="getMachineStatus">获取3</button>
      <button @click="getAllIP">获取4</button>

      <button @click="controlMachine">控制</button>
  </div>
</template>

<script>
import { post, get } from '../utils/http.js'
export default{
  name:'Overview',
  setup() {
    const getNumberOfMachine = async ()=> {
      const res = await post('/getNumberOfMachine',{
        id: "1"
      })

      console.log("查询设备下的内机数量:",res);
    }
    const getAllDevice = async ()=> {
      const res = await post('/getAllDevice',{
        id: "1"
      })

      console.log("获取所有设备信息:",res);
    }
    const getMachineStatus = async ()=> {
      const res = await post('/getMachineStatus',{
        "name":"16_201_1"
      })

      console.log("查询指定内机状态:",res);
    }
    const getAllIP = async ()=> {
      const res = await post('/getAllIP')

      console.log("获取所有的设备IP地址:",res);
    }
    const controlMachine = async ()=> {
      const res = await post('/controlMachine',[
            {
                "name":"16_201_1", 
                "status": 0,
                "mode": 1,
                "temperature": 19,
                "windSpeed": 1
            },
            {
                "name":"16_201_2",
                "status": 1,
                "mode": 1,
                "temperature": 19,
                "windSpeed": 1
            }
      ])
      console.log("控制接口:",res);
    }
    return {
      getNumberOfMachine,
      getAllDevice,
      getMachineStatus,
      getAllIP,
      controlMachine
    }
  }
}

</script>