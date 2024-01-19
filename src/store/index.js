import { defineStore } from 'pinia';

export const useCustomStore = defineStore({
  id: 'customStore',
  state: () => ({
    currentControl: '', // 标记当前正在控制内机的 id
    number: '',
    Switch: '开',
    Mode: '制冷',
    Wind: '自动',
    Temperature: 25,
    userdata: null, // 存储用户身份信息包括权限 1、2、3 分别对应超级管理员、管理员和普通用户,
    navigatorRoutes:['页面总览'],
  }),
  actions: {
    addNavigatorRoutes(route){        //添加导航路由数组
      if(!this.navigatorRoutes.includes(route)){
        this.navigatorRoutes.push(route)
      }
    },
    deleteNavigatorRoutes(route){     //删除导航路由数组
      let indexToDelete = this.navigatorRoutes.indexOf(route)

      if(indexToDelete !==-1 && indexToDelete !==0){ //第一个元素不能被删除，即页面总览
        this.navigatorRoutes.splice(indexToDelete,1)
      }
    },
    setCurrentControl(currentControl) {
      this.currentControl = currentControl;
    },
    setNumber(number) {
      this.number = number;
    },
    setSwitch(Switch) {
      this.Switch = Switch;
    },
    setMode(Mode) {
      this.Mode = Mode;
    },
    setWind(Wind) {
      this.Wind = Wind;
    },
    setTemperature(Temperature) {
      this.Temperature = Temperature;
    },
    setUserdata(userdata) {
      this.userdata = userdata;
    },
  },
});
