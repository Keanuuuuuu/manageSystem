<template>
  <div class="present_weather">
    <!-- 城市信息 -->
    <!-- <div class="city_name">
      <p>{{ now_data.city }}</p>
    </div> -->

    
    <div class="city_name">
      <span>中央空调运行信息总览</span>
    </div>
    

    <!-- 实时天气信息 -->
    <div class="weather_detail">

      <div class="base_info">
        <div class="data_resourse">{{ now_data.update_time }}</div>
        <div class="week">{{ now_data.week }}</div>
        <div class="weather_status">{{ now_data.day.weather }}</div>
        <div class="temp">{{ now_data.day.temperature }}℃</div>
        <div class="humidity"><div></div>{{ now_data.day.humidity }}%RH</div>
      </div>
    </div>

    <!-- 本周天气 -->
    <!-- <div class="weather_week">
      <div 
        v-for="(day, index) in weekData" 
        :key="index" 
        class="weather_day"
      >
        <div class="left_column">
          <div class="day_name">{{ day.date }}</div>
          <div class="temp_week">{{ day.temperature }}°</div>
        </div>
        <div class="right_column">
          <div class="weather_status"><span class="text">白天：</span>{{ day.dayWeather }}</div>
          <div class="weather_status"><span class="text">夜间：</span>{{ day.nightWeather }}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get } from "@/api/http.js";

// 用于存储实时天气数据和本周天气数据
const now_data = ref({
  update_time: "",
  city: "",
  day: {
    weather: "",
    temperature: "",
    humidity: "",
    wind_direction: "",
    wind_power: "",
  },
  week: "",
  night: {
    weather: "",
    temperature: "",
    humidity: "",
    wind_direction: "",
    wind_power: "",
  },
});

const weekData = ref([]);

// 获取天气数据
const fetchWeatherData = async () => {
  try {
    const url = `https://lab.zhongyaohui.club/weather`;
    const res = await get(url);

    const data = res.data[0];

    // 获取实时天气数据
    now_data.value.update_time = data.infos[0].date;
    now_data.value.city = data.city;
    now_data.value.day = data.infos[0].day;
    now_data.value.week = data.infos[0].week;
    now_data.value.night = data.infos[0].night; // 添加夜间天气

    // 获取本周天气数据并限制为前五天
    weekData.value = data.infos.slice(0, 5).map(item => ({
      date: item.date,
      temperature: item.day.temperature,
      dayWeather: item.day.weather,
      nightWeather: item.night.weather
    }));
  } catch (error) {
    console.error('获取天气数据失败', error);
  }
};

// 在组件挂载时请求天气数据
onMounted(() => {
  fetchWeatherData();
});
</script>

<style scoped lang="scss">
.present_weather {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  width: calc(100vw - 90px);
  justify-content: space-between;
  margin-right: 20px;
  position: relative; /* 作为绝对定位基准 */

  display: flex;
  height: 100%;
  flex-direction: row;
  justify-items: stretch;
  gap: 20px;
  max-height: 80px;
  border-radius: 5px;
  background-color: #e8eef7;
}

.city_name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1; /* 确保不被遮挡 */

  span {
    width: 300px;
    font-size: 25px;
  }
}

.weather_detail {
  position: absolute;
  /* top: 50%; */
  // left: calc(50% + 150px);
  right: 0;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-items: flex-end;
  width: 340px;
  min-width: 340px;
}

.data_resourse {
  margin-right: 10px;
}

.base_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  margin-bottom: 10px;
}

.week {
  margin-right: 5px;
}

.weather_status_group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  margin-left: 10px;
}

.temp {
  /* font-size: 32px; */
  // font-weight: bold;
  margin-right: 5px;
}

.temp_week {
  font-size: 22px;
  // font-weight: bold;
}

.weather_status {
  font-size: 20px;
}

.detail_info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
}

.weather_week {
  height: 100%;
  display: flex;
  gap: 20px; /* 横向排列 */
  flex: 3; /* 本周天气区域占比更大 */
  /* overflow-x: auto; 如果超出屏幕宽度，允许滚动 */
}

.info_row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  margin-right: 10px;
}

.weather_day {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  background-color: #f1f1f1;
  padding: 10px;
  flex: 1; /* 每个小卡片均分 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  max-width: 200px;
}

.day_name {
  width: 90px;
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  color: #888;
}

.weather_status {
  font-size: 16px;
  margin-right: 5px;
}

.left_column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.right_column {
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.text {
  font-size: 14px;
  color: #555;
}
</style>
