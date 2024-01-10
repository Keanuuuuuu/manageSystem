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
    userdata: null, // 存储用户身份信息包括权限 1、2、3 分别对应超级管理员、管理员和普通用户
  }),
  actions: {
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
