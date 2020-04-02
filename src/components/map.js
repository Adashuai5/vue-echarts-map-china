import china from "echarts/map/json/china";
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
const getNewJSON = JSON => import(`echarts/map/json/province/${JSON}`);
const forLoop = async () => {
  for (let index = 0; index < provinces.length; index++) {
    const province = provinces[index];
    const NewJSON = await getNewJSON(province);
    china.features = [...new Set([...china.features, ...NewJSON.features])];
  }
  console.log("china", china);
  return china;
};
const chinas = forLoop();
console.log("chinas", chinas);
export default chinas;
