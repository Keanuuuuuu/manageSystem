import { get } from "@/api/http.js";

// 获取城市名称
const fetchCityId = () => {
  return new Promise((resolve, reject) => {
    window.handleResponse = function (resCity) {
      if (resCity.status === 0) {
        const city = resCity.result.ad_info.city;
        console.log('当前城市：', city.slice(0, -1));
        resolve(city);
      } else {
        reject(new Error(resCity.message));
      }
      delete window.handleResponse;
    };

    const script = document.createElement('script');
    script.src = `https://apis.map.qq.com/ws/location/v1/ip?key=GYSBZ-ABUC3-OEU33-YVSKC-I4JSV-33BVI&output=jsonp&callback=handleResponse`;
    script.onerror = () => {
      reject(new Error('JSONP 请求失败'));
      delete window.handleResponse;
    };
    document.body.appendChild(script);
  });
};

// 获取城市 ID
const fetchCustomCityId = async (city) => {
  const res = await get(`https://api.qweather.com/v7/weather/24h`, {
    location: city.slice(0, -1),
    headers: {
      Authorization: `Bearer ccdc9e6cb59649cabfed94f1ec14795b`
    }
  })
  console.log(res.data);
};

// 获取天气数据
const fetchWeatherData = (cityId) => {
  return new Promise((resolve, reject) => {
    const callbackName = `weatherCallback_${Date.now()}`;
    window[callbackName] = function (res) {
      if (res.code === '200') {
        resolve(res);
      } else {
        reject(new Error(res.message));
      }
      delete window[callbackName];
    };

    const script = document.createElement('script');
    script.src = `https://devapi.qweather.com/v7/weather/24h?location=${cityId}&key=ccdc9e6cb59649cabfed94f1ec14795b&callback=${callbackName}`;
    script.onerror = () => {
      reject(new Error('JSONP 请求失败'));
      delete window[callbackName];
    };
    document.body.appendChild(script);
  });
};

// 主函数
export async function getWeatherData() {
  try {
    const city = await fetchCityId();
    const cityId = await fetchCustomCityId(city);
    const weatherData = await fetchWeatherData(cityId);
    console.log('天气数据：', weatherData);
  } catch (error) {
    console.error('请求失败：', error);
  }
};

// 调用主函数