<template>
  <div>
      总览
      <button @click="getNumberOfMachine">获取1</button>
      <button @click="getMachineStatusById">获取2</button>
      <button @click="getMachineStatus">获取3</button>

      <button @click="getKey">Key</button>
      <button @click="login">login</button>
  </div>
</template>

<script>
import { post, get } from '../utils/http.js'
import { encryptedData } from "../utils/encrypt";
export default{
  name:'Overview',
  setup() {
    const getNumberOfMachine = async ()=> {
      const res = await post('/getNumberOfMachine',{
        id: "16_201"
      })
      console.log("查询设备下的内机数量:",res);
    }
    const getMachineStatusById = async ()=> {
      const res = await post('/getMachineStatusById',{
        id: "16"
      })

      console.log("通过房间号或楼栋号内机状态:",res);
    }
    const getMachineStatus = async ()=> {
      const res = await post('/getMachineStatus',{
        "name":"16_201_1"
      })

      console.log("查询指定内机状态:",res);
    }
    const controlMachine = async ()=> {
      const res = await post('/controlMachine',
      {
          "name":"16", 
          "status": 0,
          "mode": 1,
          "temperature": 19,
          "windSpeed": 1
      }
      )
      console.log("控制接口:",res);
    }

    /* 登录测试 */

    let publicKey = null
    let password = 123456
    let afterPwd = 123456
    // 获取公钥：
    const getKey = async ()=>{
      const res = await get('/login')
      publicKey = res
      console.log("公钥:",publicKey);
      const encryptedPassword = encryptedData(publicKey.data, password);

      console.log(encryptedPassword);
      afterPwd = encryptedPassword
    }

    // 用密钥登录
    const login = async ()=> {
      console.log(afterPwd);
      const res = await post('/login',{
        "username": "12928",
        "password": afterPwd
      })
      console.log("登录情况:",res);
    }
    return {
      getNumberOfMachine,
      getMachineStatusById,
      getMachineStatus,
      controlMachine,
      getKey,
      login
    }
  }
}

</script>