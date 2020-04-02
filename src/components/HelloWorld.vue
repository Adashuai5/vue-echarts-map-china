<template>
  <div class="hello">
    <div
      class="chart"
      ref="chart"
      style="width: 1000px; height: 800px"
      v-if="china && china.features && china.features.length === 533"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/theme/macarons"; // echarts theme
import china from "echarts/map/json/china";
echarts.registerMap("china", china);
const provinces = [
  "shanghai",
  "hebei",
  "shanxi",
  "neimenggu",
  "liaoning",
  "jilin",
  "heilongjiang",
  "jiangsu",
  "zhejiang",
  "anhui",
  "fujian",
  "jiangxi",
  "shandong",
  "henan",
  "hubei",
  "hunan",
  "guangdong",
  "guangxi",
  "hainan",
  "sichuan",
  "guizhou",
  "yunnan",
  "xizang",
  "shanxi1",
  "gansu",
  "qinghai",
  "ningxia",
  "xinjiang",
  "beijing",
  "tianjin",
  "chongqing",
  "xianggang",
  "aomen",
  "taiwan"
];
export default {
  name: "chart",
  data() {
    return {
      chart: null,
      china: china
    };
  },
  watch: {
    china: {
      handler(val) {
        if (val.features && val.features.length === 533) {
          echarts.registerMap("china", val);
          this.drawChinaMap();
        }
      },
      immediate: true
    }
  },
  beforeMount() {
    this.getChinaMap();
  },
  mounted() {
    this.drawChinaMap();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getChinaMap() {
      for (let i = 0; i < provinces.length; i++) {
        let item = provinces[i];
        import(`echarts/map/json/province/${item}`).then(item => {
          china.features = [...china.features, ...item.features];
        });
      }
    },
    drawChinaMap() {
      this.chart = echarts.init(document.querySelector(".chart"), "macarons");
      this.chart.setOption({
        backgroundColor: "#FFFFFF",
        title: {
          text: "全国省市地图大数据",
          subtext: "虚构数据",
          x: "center"
        },
        tooltip: {
          trigger: "item"
        },

        //左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 }
          ],
          color: [
            "#5475f5",
            "#9feaa5",
            "#85daef",
            "#74e2ca",
            "#e6ac53",
            "#9fb5ea"
          ]
        },

        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: true,
            label: {
              normal: {
                show: true //省份名称
              },
              emphasis: {
                show: false
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
            data: [
              { name: "北京", value: Math.round(Math.random() * 500) },
              { name: "天津", value: Math.round(Math.random() * 500) },
              { name: "上海", value: Math.round(Math.random() * 500) },
              { name: "重庆", value: Math.round(Math.random() * 500) },
              { name: "河北", value: Math.round(Math.random() * 500) },
              { name: "河南", value: Math.round(Math.random() * 500) },
              { name: "云南", value: Math.round(Math.random() * 500) },
              { name: "辽宁", value: Math.round(Math.random() * 500) },
              { name: "黑龙江", value: Math.round(Math.random() * 500) },
              { name: "湖南", value: Math.round(Math.random() * 500) },
              { name: "安徽", value: Math.round(Math.random() * 500) },
              { name: "山东", value: Math.round(Math.random() * 500) },
              { name: "新疆", value: Math.round(Math.random() * 500) },
              { name: "江苏", value: Math.round(Math.random() * 500) },
              { name: "浙江", value: Math.round(Math.random() * 500) },
              { name: "江西", value: Math.round(Math.random() * 500) },
              { name: "湖北", value: Math.round(Math.random() * 500) },
              { name: "广西", value: Math.round(Math.random() * 500) },
              { name: "甘肃", value: Math.round(Math.random() * 500) },
              { name: "山西", value: Math.round(Math.random() * 500) },
              { name: "内蒙古", value: Math.round(Math.random() * 500) },
              { name: "陕西", value: Math.round(Math.random() * 500) },
              { name: "吉林", value: Math.round(Math.random() * 500) },
              { name: "福建", value: Math.round(Math.random() * 500) },
              { name: "贵州", value: Math.round(Math.random() * 500) },
              { name: "广东", value: Math.round(Math.random() * 500) },
              { name: "青海", value: Math.round(Math.random() * 500) },
              { name: "西藏", value: Math.round(Math.random() * 500) },
              { name: "四川", value: Math.round(Math.random() * 500) },
              { name: "宁夏", value: Math.round(Math.random() * 500) },
              { name: "海南", value: Math.round(Math.random() * 500) },
              { name: "台湾", value: Math.round(Math.random() * 500) },
              { name: "香港", value: Math.round(Math.random() * 500) },
              { name: "澳门", value: Math.round(Math.random() * 500) }
            ] //数据
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>
