<template>
  <div class="echart">
    <div ref="chart" style="height: 30vh;"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'BarChart',
  props: {
    machineData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const chart = ref(null); // 用于绑定图表 DOM 元素

    // 初始化图表
    const initChart = () => {
      const chartDom = chart.value;
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '10%', // 左边距
          right: '10%', // 右边距
          bottom: '15%', // 下边距
          top: '10%', // 上边距
          containLabel: true, // 确保坐标轴标签不被裁剪
        },
        xAxis: {
          type: 'category',
          data: ['内机总数', '在线内机', '运行内机', '故障内机'],
          axisLabel: {
            fontSize: 10,
            rotate: 45,
          },
          splitLine: {
            show: true, // 显示纵向坐标线
            lineStyle: {
              type: 'dashed', // 设置为虚线
              color: '#ccc', // 线条颜色
            },
          },
          axisLine: {
            show: true, // 显示 X 坐标轴线
            lineStyle: {
              width: 1, // 线条宽度
            },
            symbol: ['none', 'arrow'], // 仅在末端显示箭头
            symbolSize: [10, 15], // 箭头大小
            symbolOffset: [0, 10], // 箭头偏移
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: Math.round(props.machineData.sum / 10) * 10 + 10,
          splitLine: {
            show: true, // 显示横向坐标线
            lineStyle: {
              type: 'dashed', // 设置为虚线
              color: '#ccc', // 线条颜色
            },
          },
          axisLine: {
            show: true, // 显示 Y 坐标轴线
            lineStyle: {
              width: 1, // 线条宽度
            },
            symbol: ['none', 'arrow'], // 仅在末端显示箭头
            symbolSize: [10, 15], // 箭头大小
            symbolOffset: [0, 10], // 箭头偏移
          },
        },
        series: [
          {
            data: [
              props.machineData.sum,
              props.machineData.online,
              props.machineData.running,
              props.machineData.error,
            ],
            type: 'bar',
            barWidth: '40%', // 调整柱状图宽度
            itemStyle: {
              color: (params) => {
                // 故障内机显示红色
                if (params.dataIndex === 3) {
                  return 'red';
                }
                return '#5470C6';
              },
            },
            label: {
              show: true, // 开启显示
              position: 'top', // 在上方显示
              formatter: '{c}台', // 显示百分号
              textStyle: {
                // 数值样式
                color: 'black', // 字体颜色
                fontSize: 10, // 字体大小
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    };

    // 在组件挂载后初始化图表
    onMounted(() => {
      initChart();
      window.addEventListener('resize', handleResize);
    });

    // 调整图表大小
    const handleResize = () => {
      if (chart.value) {
        const myChart = echarts.init(chart.value);
        myChart.resize();
      }
    };

    // 在组件卸载时移除监听
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      chart,
    };
  },
};
</script>

<style scoped>
.echart {
  width: 100%; 
  border-radius: 8px;
  cursor: pointer;
  /* background-color: rgb(246, 248, 254); */
}
</style>