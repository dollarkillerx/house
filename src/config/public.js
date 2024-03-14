//公用的数据或方法
import { def } from "@vue/shared";
import { ref, reactive } from "vue";

const plbLic = () => {
  const houseData = reactive({
    img: "",
    rentway: "整租",
    tit: "站西路",
    address: "越秀-流花站前-站西路",
    square: "70m平方",
    direction: "东南",
    layout: "2室1厅1卫",
    price: "2000",
    tag: {
      tag1: "近地铁",
      tag2: "精装",
      tag3: "随时看房",
    },
  });
  return houseData
};

export default plbLic;
