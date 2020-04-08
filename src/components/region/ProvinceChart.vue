<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
const animationDuration = 2800;

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: Number,
      default: ""
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },

  mounted() {
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }
    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    if (sidebarElm) {
      sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
    }
    this.initChart();
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    if (sidebarElm) {
      sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);
    }
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (val.hasOwnProperty("actualData")) {
          this.setOptions(val);
        }
      }
    }
  },
  methods: {
    setOptions({ actualData, provinceData, title } = {}) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption({
        title: {
          text: title,
          top: 20,
          left: "4%"
        },
        grid: {
          top: 80,
          left: "5%",
          right: "5%",
          bottom: "5%"
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#fff",
          extraCssText: "box-shadow: 0 4px 10px 0 #D8E2F3;",
          textStyle: {
            color: "#707070"
          },
          padding: [10, 30, 10, 15],
          formatter: '{b}: {c}'
        },
        visualMap: {
          min: 0,
          max: Math.max.apply(null, actualData),
          inRange: {
            color: [
              "#f0f0f0",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026"
            ]
          },
          text: ["高", "低"],
          calculable: true
        },
        toolbox: {
          show: true,
          orient: "vertical",
          right: "20",
          top: "center",
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            type: "map",
            mapType: "china",
            roam: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                show: true,
                areaColor: "#CECECE",
                borderColor: "#FCFCFC",
                borderWidth: "1"
              },
              emphasis: {
                show: true,
                areaColor: "#C8A5DF"
              }
            },
            data: provinceData,
            animationDuration
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart = echarts.init(document.getElementById(this.id));

      if (this.chartData.hasOwnProperty("actualData")) {
        this.setOptions(this.chartData);
      }
    }
  }
};
</script>
<style scoped>
.chart {
  display: inline-block;
  box-shadow: 0 4px 10px 0 #d8e2f3;
}
</style>
