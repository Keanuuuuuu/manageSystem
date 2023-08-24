import { createStore } from 'vuex'
/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        currentControl:'', //标记当前正在控制内机的id
        number: '',
        Switch: '',
        Mode: '',
        Wind: '',
        Temperature: 16,
        userdata: null, //存储用户身份信息包括权限  1、2、3分别对应超级管理员、管理员和普通用户
    },
    mutations: {
        Current_control(state, currentControl){
            state.currentControl = currentControl
        },
        number_control(state, number) {
            state.number = number
        },
        Switch_control(state, Switch) {
            state.Switch = Switch
        },
        Mode_control(state, Mode) {
            state.Mode = Mode
        },
        Wind_control(state, Wind) {
            state.Wind = Wind
        },
        Temperature_control(state, Temperature){
            state.Temperature = Temperature
        },
        setUserdata(state,userdata){
            state.userdata = userdata
        }
    }
})