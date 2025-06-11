import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeviceSearch = defineStore({
  id: 'deviceSearchStore',
  state: () => ({
    deviceSearchData: ref([]),
  }),
  actions: {
    setDeviceSearchData(data){
      this.deviceSearchData = data;
    }
  }
});
