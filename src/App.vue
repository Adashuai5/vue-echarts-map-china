<template>
  <div id="app">
    <button @click="switchChart">切换省市</button>
    <ProvinceChart v-if="isProvince" />
    <CityChart v-else />
  </div>
</template>

<script>
import ProvinceChart from "./components/ProvinceChart.vue";
import CityChart from "./components/CityChart.vue";

export default {
  name: "App",
  data() {
    return {
      isProvince: true
    };
  },
  components: {
    ProvinceChart,
    CityChart
  },
  methods: {
    switchChart() {
      this.isProvince = !this.isProvince;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
button {
  margin-bottom: 30px;
}
</style>
