<template>
  <div class="chart" ref="chart" style="width: 100%; height: 800px"></div>
</template>

<script>
import echarts from "echarts";
import "echarts/theme/macarons"; // echarts theme
import china from "echarts/map/json/china";
import hubei from "echarts/map/json/province/hubei";

china.features = [...china.features, ...hubei.features];
echarts.registerMap("china", china);

export default {
  name: "chart",
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    if (!this.chart) {
      this.drawChinaMap();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
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

        // 左侧小导航图标
        visualMap: {
          show: true,
          x: "left",
          y: "center",
          splitList: [
            { start: 10000 },
            { start: 1000, end: 9999 },
            { start: 500, end: 999 },
            { start: 100, end: 499 },
            { start: 10, end: 99 },
            { start: 0, end: 9 }
          ],
          color: [
            "#a50026",
            "#d73027",
            "#f46d43",
            "#fdae61",
            "#fee090",
            "#ffffbf",
            "#f0f0f0"
          ]
        },

        //配置属性
        series: [
          {
            name: "确诊人数",
            type: "map",
            mapType: "china",
            roam: true, // 是否可缩放
            label: {
              normal: {
                show: true //省份名称
              },
              emphasis: {
                show: false
              }
            },
            // 地图默认样式
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
              { name: "北京", value: Math.round(Math.random() * 1000) },
              { name: "天津", value: Math.round(Math.random() * 1000) },
              { name: "上海", value: Math.round(Math.random() * 1000) },
              { name: "重庆", value: Math.round(Math.random() * 1000) },
              { name: "河北", value: Math.round(Math.random() * 1000) },
              { name: "河南", value: Math.round(Math.random() * 1000) },
              { name: "云南", value: Math.round(Math.random() * 1000) },
              { name: "辽宁", value: Math.round(Math.random() * 1000) },
              { name: "黑龙江", value: Math.round(Math.random() * 1000) },
              { name: "湖南", value: Math.round(Math.random() * 1000) },
              { name: "安徽", value: Math.round(Math.random() * 1000) },
              { name: "山东", value: Math.round(Math.random() * 1000) },
              { name: "新疆", value: Math.round(Math.random() * 1000) },
              { name: "江苏", value: Math.round(Math.random() * 1000) },
              { name: "浙江", value: Math.round(Math.random() * 1000) },
              { name: "江西", value: Math.round(Math.random() * 1000) },
              { name: "湖北", value: 9999 },
              { name: "广西", value: Math.round(Math.random() * 1000) },
              { name: "甘肃", value: Math.round(Math.random() * 1000) },
              { name: "山西", value: Math.round(Math.random() * 1000) },
              { name: "内蒙古", value: Math.round(Math.random() * 1000) },
              { name: "陕西", value: Math.round(Math.random() * 1000) },
              { name: "吉林", value: Math.round(Math.random() * 1000) },
              { name: "福建", value: Math.round(Math.random() * 1000) },
              { name: "贵州", value: Math.round(Math.random() * 1000) },
              { name: "广东", value: Math.round(Math.random() * 1000) },
              { name: "青海", value: Math.round(Math.random() * 1000) },
              { name: "西藏", value: Math.round(Math.random() * 1000) },
              { name: "四川", value: Math.round(Math.random() * 1000) },
              { name: "宁夏", value: Math.round(Math.random() * 1000) },
              { name: "海南", value: Math.round(Math.random() * 1000) },
              { name: "台湾", value: Math.round(Math.random() * 1000) },
              { name: "香港", value: Math.round(Math.random() * 1000) },
              { name: "澳门", value: Math.round(Math.random() * 1000) }
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
