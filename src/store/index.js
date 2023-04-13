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
        }
    }
})