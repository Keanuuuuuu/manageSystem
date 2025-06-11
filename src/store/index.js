import { defineStore } from 'pinia';

export const useCustomStore = defineStore({
  id: 'customStore',
  state: () => ({
    Switch: '开',
    Mode: '制冷',
    Wind: '自动',
    Temperature: 25,
    navigatorRoutes: ['总览'],
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
    lastTreeNode:[],
    airconditionNodeArrayLoading: false,
  }),
  actions: {
    addNavigatorRoutes(route) {        //添加导航路由数组
      if (!this.navigatorRoutes.includes(route)) {
        this.navigatorRoutes.push(route)
      }
    },
    deleteNavigatorRoutes(route) {     //删除导航路由数组
      let indexToDelete = this.navigatorRoutes.indexOf(route)

      if (indexToDelete !== -1 && indexToDelete !== 0) { //第一个元素不能被删除，即总览
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
    filterMonitorTableData(searchTerm) {
      // 转换搜索内容为小写
      const search = searchTerm.toLowerCase();
    
      // 智能控制映射
      const autoControlMapping = {
        '无智能控制': 0,
        '定时控制': 1,
        '定温控制': 2,
        '定时+定温控制': 3
      };
    
      // 故障状态映射
      const faultCodeMapping = {
        '在线': '1',
        '离线': '0'
      };
    
      // 使用 filter 方法筛选出符合条件的数据
      this.setMonitorTableData(this.originalMonitorTableData);
      const filteredData = this.monitorTableData.filter(item => {
        // 判断是否是智能控制类型的查询
        const matchesAutoControl = item.autoControl === autoControlMapping[search];
    
        // 判断是否是故障状态的查询
        const matchesFaultCode = item.faultCode === faultCodeMapping[search];
    
        // 判断搜索内容是否匹配某个字段
        const matchesRoom = item.room.toLowerCase().includes(search);
        const matchesId = item.id.includes(search);
        const matchesName = item.name.toLowerCase().includes(search);
        const matchesStatus = item.status.toLowerCase().includes(search);
        const matchesMode = item.mode.toLowerCase().includes(search);
        const matchesWindSpeed = item.windSpeed.toLowerCase().includes(search);
        const matchesRoomTemperature = item.roomTemperature.toString().includes(search);
    
        // 如果匹配智能控制或故障状态，或者其他字段，返回该数据项
        return (
          matchesRoom ||
          matchesAutoControl ||
          matchesFaultCode ||
          matchesId ||
          matchesName ||
          matchesStatus ||
          matchesMode ||
          matchesWindSpeed ||
          matchesRoomTemperature
        );
      });
    
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
