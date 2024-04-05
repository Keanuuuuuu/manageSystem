import { defineStore } from 'pinia';

export const useCustomStore = defineStore({
  id: 'customStore',
  state: () => ({
    Switch: '开',
    Mode: '制冷',
    Wind: '自动',
    Temperature: 25,
    navigatorRoutes: ['页面总览'],
    monitorTableData: [],
    originalMonitorTableData: [], // 保存初始数据 这样多次筛选都能基于全集
    airconditionNodeData: {
      label: "16栋教学楼",
      length: '34',
    },
    leftTreeData: [],
    accountTableData: [],
    authTree: [],
    overviewData:'',
    lastTreeNode:[]
  }),
  actions: {
    addNavigatorRoutes(route) {        //添加导航路由数组
      if (!this.navigatorRoutes.includes(route)) {
        this.navigatorRoutes.push(route)
      }
    },
    deleteNavigatorRoutes(route) {     //删除导航路由数组
      let indexToDelete = this.navigatorRoutes.indexOf(route)

      if (indexToDelete !== -1 && indexToDelete !== 0) { //第一个元素不能被删除，即页面总览
        this.navigatorRoutes.splice(indexToDelete, 1)
      }
    },
    setOverviewData(overviewData) {
      this.overviewData = overviewData
    },
    setLeftTreeData(leftTreeData) {
      this.leftTreeData = leftTreeData
    },
    setMonitorTableData(monitorTableData) {
      this.monitorTableData = monitorTableData
    },
    setOriginalMonitorTableData(data) {   //内机监控搜索用
      this.originalMonitorTableData = data;
    },
    filterMonitorTableData(id) {
      // 使用 filter 方法筛选出符合条件的数据
      const filteredData = this.originalMonitorTableData.filter(item => item.id.includes(id));
      // 将筛选后的数据保存回 state 中
      this.setMonitorTableData(filteredData);
    },
    setMonitorHead(airconditionNodeData) {
      this.airconditionNodeData = airconditionNodeData
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
    setAccountTableData(accountTableData) {
      this.accountTableData = accountTableData
    },
    setAuthTree(authTree) {
      this.authTree = authTree
    }
  },
});
