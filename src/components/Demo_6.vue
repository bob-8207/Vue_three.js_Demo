
<template>
  <div>
    <div id="chart_A" style="height:100%;box-sizing: border-box;"></div>
    <el-dialog title="港口信息" :visible.sync="outerVisible" width="800px" center>
      <span>《{{name}}》港是海军自行设计和建造的大型军港，具备相应的配套设施，满足各种大型水面舰艇靠泊需要。</span>
      <el-table :data="tableData" style="width: 700px" size="mini">
        <el-table-column label="类型" prop="type" width="120px"></el-table-column>
        <el-table-column label="舷号" prop="id" width></el-table-column>
        <el-table-column label="名称" prop="name" width></el-table-column>
        <el-table-column label="描述" prop>
          <template slot-scope="props">
            <el-image
              style="width: 200px; height: 150px"
              :src="props.row.url"
              @click="innerVisible = true"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog width="600px" title="舰载机类型" :visible.sync="innerVisible" append-to-body>
        <el-row>
          <el-col span="10">
            <el-image style="width: 200px; height: 150px" src="../../static/img/j-15.jpeg"></el-image>
          </el-col>
          <el-col
            span="12"
          >歼-15（英文：J-15，中文绰号：飞鲨“Fēishā”，英文：Flying Shark，北约代号：侧卫D型，英文：Flanker-D）是中国参考从乌克兰获得苏-33战斗机原型机T-10K-3以国产歼-11战斗机为基础进而研制和发展的单座双发舰载战斗机。歼-15在世代划分上属于第四代战斗机改进型，即第四代半战斗机。</el-col>
        </el-row>
        <el-row>
          <el-col span="10">
            <el-image style="width: 200px; height: 150px" src="../../static/img/z-18y.jpeg"></el-image>
          </el-col>
          <el-col
            span="12"
          >作为一款发展自运输直升机的预警直升机，直18最大的优势就在于其具有较大的内部空间，拥有较大的起飞重量，这样飞机就可以容纳更多的设备、发电机组、技术人员。此次照片显示的4名指挥人员，应该是1名指挥官、1名雷达操作人员（兼机械维修师）和2名空中编队指挥人员的配备。</el-col>
        </el-row>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
import echartsGL from "echarts/map/js/province/beijing.js";
//import "echarts/dist/echarts.min.js";
import "echarts-gl";
import "echarts/map/js/world.js";

export default {
  data() {
    return {
      centerDialogVisible: false,
      outerVisible: false,
      innerVisible: false,
      name: "",
      url: "../../static/img/17.jpeg",
      tableData: [
        {
          id: "17",
          name: "山东舰",
          type: "航空母舰",
          url: "../../static/img/17.jpeg"
        }
      ]
    };
  },
  mounted() {
    this.chartA();
  },

  methods: {
    chartA() {
      let this_ = this;
      var geoCoordMap1 = {
        北京: [116.2317, 39.5427],
        南宁: [108.479, 23.1152],
        广州: [113.5107, 23.2196],
        山东舰: [113, 10],
        重庆: [107.7539, 30.1904],
        芬兰: [24.909912, 60.169095],
        美国: [-100.696295, 33.679979],
        日本: [139.710164, 35.706962],
        韩国: [126.979208, 37.53875],
        瑞士: [7.445147, 46.956241],
        东南亚: [117.53244, 5.300343],
        澳大利亚: [135.193845, -25.304039],
        德国: [13.402393, 52.518569],
        英国: [-0.126608, 51.208425],
        加拿大: [-102.646409, 59.994255]
      };
      /////////////
      var geoCoordMap = {
        葫芦岛: [120.8369995, 40.71100881],
        青岛: [120.3829882, 36.06622292],
        旅顺: [121.2528378, 38.84411322],
        上海: [121.4737919, 31.2304324],
        舟山: [122.2077803, 29.98539665],
        广州: [113.2643446, 23.12907658],
        湛江: [110.3589351, 21.27134065],
        三亚: [109.5121031, 18.25249253],
        佐世保: [129.713752, 33.159613],
        吴港: [132.547195, 34.229669],
        横须贺: [139.652882, 35.289768],
        舞鹤: [135.376861, 35.489555],
        符拉迪沃斯托克: [131.904602, 43.106999],
        苏维埃港: [132.444992, 42.894579],
        塞瓦斯托波尔: [33.554628, 44.622984],
        维沙卡帕特南港: [83.274398, 17.698759],
        金奈港: [80.299319, 13.098612],
        加利西亚的科鲁纳: [-8.261032, 43.475595],
        罗塔: [-6.33633, 36.636014],
        基尔: [10.149361, 54.321442],
        塔兰托: [17.244753, 40.477076],
        拉斯佩齐亚: [9.8224, 44.095275],
        那不勒斯: [14.16525, 40.51639],
        的里雅斯特: [13.463654, 45.385829],
        摩尔曼斯克: [33.417664, 69.084625],
        波罗的斯克: [29.764194, 59.984477],
        布雷斯特大西洋: [-4.514179, 48.371076],
        珍珠港: [157.584762, 21.21241],
        夏威夷福特岛: [-157.959815, 21.364252],
        圣迭戈: [-117.16171, 32.71568],
        旧金山: [-122.419416, 37.774929],
        诺福克: [-76.329, 36.95],
        查尔斯顿: [-71.07254, 42.34912],
        埃弗雷特: [-122.24388, 47.906815],
        佛罗里达杰克逊维尔: [-81.537019, 30.285397],
        //佛罗里达州梅泊特: [81.234898, 30.231978],
        克里特岛: [24.483337, 35.142442]
      };
      ///////////
      /* 
        记录下起点城市和终点城市的名称，以及权重
        数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
     */

      var CQData = [[{ name: "珍珠港" }, { name: "舟山", value: 70 }]];

      var GZData = [[{ name: "金奈港" }, { name: "三亚", value: 30 }]];

      var NNData = [
        [{ name: "旧金山" }, { name: "舟山", value: 80 }],
        [{ name: "波罗的斯克" }, { name: "葫芦岛", value: 100 }],
        [{ name: "克里特岛" }, { name: "青岛", value: 95 }],
        [{ name: "北京" }, { name: "瑞士", value: 50 }]
      ];

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[1].name];
          var toCoord = geoCoordMap[dataItem[0].name];
          if (fromCoord && toCoord) {
            res.push([fromCoord, toCoord]);
          }
        }
        console.log(res);
        return res;
      };

      var series = []; // 3D飞线
      var dser = []; // 2D散点坐标
      var port = []; //港口点位标注
      var navigationLine = []; //航海线路
      //港口点位标注
      for (var z in geoCoordMap) {
        port.push({
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 3,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            fontSize: 8,
            show: true,
            position: "right",
            formatter: "{b}",
            color: "#ffffff"
          },
          itemStyle: {
            normal: {
              color: "#f5f802"
            }
          },
          data: [
            {
              name: z,
              value: geoCoordMap[z],
              symbolSize: 10
            }
          ]
        });
      }
      //飞行线路
      [["重庆", CQData], ["日本", GZData], ["北京", NNData]].forEach(function(
        item,
        i
      ) {
        dser.push(
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 3,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              fontSize: 24,
              show: true,
              position: "right",
              formatter: "{b}"
            },
            itemStyle: {
              normal: {
                color: "#f5f802"
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name],
                symbolSize: dataItem[1].value / 4
              };
            })
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 3,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "left",
                fontSize: 18,
                formatter: "{b}"
              }
            },
            itemStyle: {
              normal: {
                color: "#ff0000"
              }
            },
            data: [
              {
                name: item[0],
                value: geoCoordMap[item[0]],
                symbolSize: parseInt(Math.random() * 20 + 10),
                label: {
                  normal: {
                    position: "right"
                  }
                }
              }
            ]
          }
        );
        series.push({
          type: "lines3D",
          polyline: "true",
          blendMode: "lighter",
          effect: {
            show: true,
            //period: 3, //速度
            trailLength: 0.2, //尾部阴影
            trailWidth: 6,
            trailOpacity: 0.5,
            constantSpeed: 5
          },
          lineStyle: {
            //航线的视图效果
            color: "#DE2ACF",
            width: 1.5,
            opacity: 0.6
          },
          data: convertData(item[1]) // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        });
      });
      ////////////////////////////////////////////
      //航线标注
      navigationLine.push(
        {
          //配置路径
          type: "lines3D",
          //coordinateSystem: "geo",
          polyline: "true",
          blendMode: "lighter",
          zlevel: 102,
          effect: {
            show: true,
            trailWidth: 3,
            trailOpacity: 0.5,
            trailLength: 0.2,
            constantSpeed: 20
          },
          lineStyle: {
            color: "#23EB3A",
            opacity: 0.8,
            width: 1.5
          },
          data: [
            {
              coords: [
                [109.5121031, 18.25249253],
                [118, 22],
                [122.2077803, 29.98539665],
                [120.3829882, 36.06622292]
              ],
              // 数据值   三亚: [109.5121031, 18.25249253],舟山: [122.2077803, 29.98539665],
              value: 100,
              name: "三亚-青岛",
              lineStyle: {}
            },
            {
              coords: [
                [122.2077803, 29.98539665],
                [132, 28.5],
                [142, 26],
                [157.584762, 21.21241]
              ],
              value: 100,
              name: "舟山-珍珠港",
              lineStyle: { color: "#F51E45" }
            },
            {
              coords: [
                [109.5121031, 18.25249253],
                [110, 12],
                [106, 1],
                [103, 1],
                [93, 10],
                [80.299319, 13.098612]
              ],
              value: 100,
              name: "三亚-金奈港",
              lineStyle: { color: "#F51E45" }
            }
          ]
        }
        /*
        {
          //配置位置标记点
          type: "scatter3D",
          coordinateSystem: "geo3D",
          symbol: "circle",
          symbolSize: 15,
          blendMode: "lighter",
          zlevel: 11,
          label: {
            show: true,
            position: "top",
            formatter: "{b}",
            textStyle: {
              color: "#000",
              fontFamily: "Microsoft YaHei"
            }
          },
          itemStyle: {
            color: "#a8edea" //标记颜色
          },
          data: [
            { name: "测试一", value: [113.149649, 22.617641, 100] },
            { name: "测试二", value: [112.316858, 22.186088, 100] }
          ]
        }
        
        {
          //配置攻击点
          type: "scatter3D",
          coordinateSystem: "geo",
          symbol: "pin",
          symbolSize: function(val) {
            var ret;
            if (val[2] >= 0 && val[2] < 1000) {
              ret = 50;
            } else {
              ret = 65;
            }
            return ret;
          },
          blendMode: "lighter",
          zlevel: 11,
          label: {
            show: true,
            position: "top",
            //formatter: '{b}',
            formatter: function(params) {
              var ret = params.value[2];
              return ret;
            },
            textStyle: {
              color: "#000",
              fontFamily: "Microsoft YaHei",
              fontWeight: "bold"
            }
          },
          itemStyle: {
            show: true,
            color: "#eb4f38"
          },
          data: [{ name: "中心", value: [112.88089, 22.583612, 200] }]
        }*/
      );

      //let myChart = echarts.init(document.getElementById("chart_A"));
      //地球的皮肤
      var canvas = document.createElement("canvas");
      var myChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      myChart.setOption({
        backgroundColor: "rgba(3,28,72,0.3)",
        title: {
          show: true
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}"
        },
        geo: {
          type: "map",
          map: "world",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          boundingCoords: [[-180, 90], [180, -90]],
          zoom: 0,
          roam: false,
          itemStyle: {
            borderColor: "#000d2d",
            normal: {
              areaColor: "#2455ad",
              borderColor: "#000c2d"
            },
            emphasis: {
              areaColor: "#357cf8"
            }
          },
          label: {
            fontSize: 24
          }
        },
        //组件插入
        series: dser,
        series: port
      });
      //3D地球
      let option = {
        title: {
          text: "海上大船目标检测知识图谱MPV-Demo",
          x: "center",
          top: "20px",
          textStyle: {
            fontSize: 30,
            color: "#fff",
            opacity: 0.7
          }
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b}"
        },
        backgroundColor: "rgba(0,0,0,0)", //canvas的背景颜色
        globe: {
          baseTexture: myChart,
          top: "middle",
          left: "center",
          displacementScale: 0,
          environment: "none",
          shading: "color",
          viewControl: {
            distance: 200, //距离
            autoRotate: false, //自动旋转
            targetCoord: [115, 30] //默认定位坐标
          }
        },
        //series: series
        series: navigationLine
      };
      echarts.init(document.getElementById("chart_A")).setOption(option, true);

      myChart.on("click", function(param) {
        //这个params可以获取你要的图中的当前点击的项的参数
        console.dir(param);
        //this_.open();
        if (param.componentType == "series") {
          this_.name = param.data.name;
          //this_.centerDialogVisible = true;
          this_.outerVisible = true;
        }
      });
      //myChart.setOption(option);
      /*建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener("resize", function() {
        myChart.resize();
      });*/
    },
    ///////////////////////
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>


<style scoped>
#chart_A {
  background: url("../../static/img/start.jpg");
  background-size: cover;
  height: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>