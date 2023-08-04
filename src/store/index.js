import { createStore } from 'vuex'
/**
 * 创建仓库和导出
 */
export default createStore({
    state: {
        number: '',
        Switch: '',
        Mode: '',
        Wind: '',
        Temperature: 16,
        role: null, //存储用户身份信息 1、2、3分别对应超级管理员、管理员和普通用户
    },
    mutations: {
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
        setRole(state,role){
            state.role = role
        }
    }
})