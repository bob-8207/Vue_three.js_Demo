<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import * as Stats from "stats.js";
import echarts from "echarts";
import $ from "jquery";

export default {
  name: "ThreeTest",
  data() {
    return {
      scene: "", //场景名称
      camera: "", //相机名称
      renderer: "", //渲染器名称
      container: "", //容器名称
      controls: "", //控制器名称
      sphere: "", //球体对象
      cube: "",
      cloudMesh: "", //云层对象
      status: "",
      step: 0, //运动步数
      echartPlane: ""
    };
  },
  methods: {
    //初始化3D场景
    init: function() {
      //引用容器对象ID
      let container = document.getElementById("container");
      //创建场景
      this.scene = new THREE.Scene();
      //创建相机  透视相机原理，视角越大，看到的场景越大，那么中间的物体相对于整个场景来说就越小了
      //PerspectiveCamera(仰角角度, 截平面长宽比, 近面距离, 远面距离 )
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        10000
      );
      //创建坐标轴，显示到场景中 长度为20
      let axis = new THREE.AxisHelper(20);
      this.scene.add(axis);

      //相机位置坐标
      this.camera.position.set(0, 400, 900);
      this.camera.lookAt(this.scene.position);

      //声明一个渲染
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
        //canvas: renderer
      });
      //场景大小
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      //场景背景色 .setClearColor(16进制色号), 透明度);
      this.renderer.setClearColor(0x87cefa, 0.8);
      //设置渲染器允许阴影映射
      //this.renderer.shadowMapEnabled = true;
      //渲染容器绑定
      container.appendChild(this.renderer.domElement);
      //动作控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      //性能状态插件
      this.status = new Stats();
      this.status.domElement.style.position = "absolute";
      this.status.domElement.style.left = "6px";
      this.status.domElement.style.top = "6px";
      container.appendChild(this.status.domElement);
    },
    initmesh() {
      /*生成一个平面的地图*/
      //引用纹理图片
      let textureGrass = THREE.ImageUtils.loadTexture(
        "../../static/img/grass.jpg"
      );
      //设置重复绘制方向-双方向重复绘制
      textureGrass.wrapS = THREE.RepeatWrapping;
      textureGrass.wrapT = THREE.RepeatWrapping;
      //设置重复次数-双方向重复4次
      textureGrass.repeat.set(1, 1);
      //创建平面的骨架
      this.geometry = new THREE.PlaneBufferGeometry(1000, 500, 1, 1);
      //创建平面的材料（纯色）
      this.material = new THREE.MeshLambertMaterial({ color: "#aaaaaa" });
      //创建平面的材料（图片）
      //this.material = new THREE.MeshLambertMaterial({ map: textureGrass });
      //合成平面
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      //设置平面的旋转角度和位置
      this.mesh.rotation.x = -0.5 * Math.PI;
      this.mesh.position.set(0, 0, 0);
      //平面接收阴影
      this.mesh.receiveShadow = true;
      //平面添加到场景
      this.scene.add(this.mesh);
    },
    chartA() {
      let this_ = this;
      let myChart = echarts.init(
        $("<canvas width='512' height='512'></canvas>")[0]
      );

      let option = {
        title: {
          text: "2019年公共服务设施巡检数据汇总",
          x: "center",
          textStyle: {
            fontSize: 30,
            fontWeight: "bolder",
            color: "#2b2b2b"
          }
        },

        legend: {
          data: ["设施总数", "问题总数"],
          x: "30",
          y: "bottom"
        },

        color: [
          "#B5C334",
          "#C1232B",
          "#FCCE10",
          "#E87C25",
          "#27727B",
          "#FE8463",
          "#9BCA63",
          "#FAD860",
          "#F3A43B",
          "#60C0DD",
          "#D7504B",
          "#C6E579",
          "#F4E001",
          "#F0805A",
          "#26C0C0"
        ],
        tooltip: {
          trigger: "axis",
          //formatter:'{c}%',
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "设施总数",
            type: "bar",
            barWidth: "30%",
            label: {
              show: true,
              position: "top",
              formatter: "{c}" //这是关键，在需要的地方加上就行了
            },
            data: [995, 666, 444, 858, 654, 236, 645, 546, 846, 225, 547, 356]
          },
          {
            name: "问题总数",
            type: "bar",
            barWidth: "30%",
            label: {
              show: true,
              position: "top",
              formatter: "{c}" //这是关键，在需要的地方加上就行了
            },
            data: [95, 66, 44, 58, 54, 36, 45, 56, 86, 25, 47, 35]
          }
        ]
      };
      myChart.setOption(option);

      myChart.on("finished", function() {
        var infoEchart = new THREE.TextureLoader().load(myChart.getDataURL());
        var infoEchartMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          map: infoEchart,
          side: THREE.DoubleSide
        });
        var echartPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(300, 150),
          infoEchartMaterial
        );
        echartPlane.position.set(200, 100, 0);
        //将方块添加到场景中
        this_.scene.add(echartPlane);
        //this.scene.add(this.echartPlane);
      });
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      //window.addEventListener("resize", function() {
      //myChart.resize();
      //});
    },
    chartB() {
      let this_ = this;
      let myChart = echarts.init(
        $("<canvas width='512' height='512'></canvas>")[0]
      );
      let option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center",
          textStyle: {
            fontSize: 30,
            fontWeight: "bolder",
            color: "#2b2b2b"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);

      myChart.on("finished", function() {
        var spriteMap = new THREE.TextureLoader().load(myChart.getDataURL());

        var spriteMaterial = new THREE.SpriteMaterial({
          transparent: true,
          map: spriteMap,
          side: THREE.DoubleSide
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(150, 150, 1);
        sprite.position.set(-150, 100, 0);
        this_.scene.add(sprite);
      });
    },
    light() {
      /*位于场景正上方的光源，颜色从天空颜色渐变为地面颜色。
      var HemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      this.scene.add(HemisphereLight);*/

      /* 平行光 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
      var DirectionalLight = new THREE.DirectionalLight(0xfffbbb, 1);
      DirectionalLight.position.set(-1, 1, 1);
      this.scene.add(DirectionalLight); */

      /* 添加聚光灯光源
      let light = new THREE.SpotLight(0xffffff);
      light.position.set(100, 100, 200);
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      this.scene.add(light); */

      /* 添加环境光  */
      let ambientLight = new THREE.AmbientLight("0xffffff");
      this.scene.add(ambientLight);
    },
    animate() {
      //刷新性能监视插件
      this.status.update();
      //动作帧数回调 - 反复运行
      requestAnimationFrame(this.animate);
      //渲染场景和相机
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.chartA();
    this.chartB();
    this.init();
    this.initmesh();
    this.light();
    this.animate();
  }
};
</script>
<style scoped>
#container {
  position: absolute;
  width: 70%;
  height: 80%;
}
</style>