<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
//import * as Three from "three";

import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import Stats from "stats.js";
import { Mesh } from "three";

export default {
  name: "ThreeTest",
  data() {
    return {
      scene: "", //场景名称
      camera: "", //相机名称
      renderer: "", //渲染器名称
      geometry: "", //平面骨架
      container: "", //容器名称
      material: "", //平面材料
      mesh: "", //平面对象
      controls: {
        rotationSpeed: 0.02, //回转速度参数
        bouncingSpeed: 0.03 //弹跳速度参数
      },
      sphere: "", //范围
      cube: "", //部件名称-立方体
      step: 0, //运动步数
      stats: ""
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
      //let axis = new THREE.AxisHelper(20);
      //this.scene.add(axis);
      //相机位置坐标
      this.camera.position.set(0, 800, 1500);
      //相机指向位置- 照相机默认的观察方向是指向z轴负方向（就是朝向屏幕）
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      //声明一个渲染
      this.renderer = new THREE.WebGLRenderer();
      //场景大小
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      //场景背景色 .setClearColor(16进制色号), 透明度);
      this.renderer.setClearColor(0x232323, 5.0);
      //设置渲染器允许阴影映射
      this.renderer.shadowMapEnabled = true;
      //渲染容器绑定
      container.appendChild(this.renderer.domElement);
      //性能状态插件
      this.status = new Stats();
      this.status.domElement.style.position = "absolute";
      this.status.domElement.style.left = "6px";
      this.status.domElement.style.top = "6px";
      container.appendChild(this.status.domElement);
      //动作控制
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    createFloor() {
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
      this.geometry = new THREE.BoxGeometry(2600, 1400, 1);
      //创建平面的材料（纯色）
      this.material = new THREE.MeshLambertMaterial({ color: "#9FB6CD" });
      //创建平面的材料（图片）
      //this.material = new THREE.MeshLambertMaterial({ map: textureGrass });
      //合成平面
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      //设置平面的旋转角度和位置
      this.mesh.rotation.x = Math.PI / 2;
      //this.mesh.rotation.y = 0.5;
      this.mesh.position.set(0, 0, 0);
      //平面接收阴影
      this.mesh.receiveShadow = true;
      //平面添加到场景
      this.scene.add(this.mesh);
      //创建墙
      this.createCubeWall(
        10,
        200,
        1400,
        0,
        new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
        -1295,
        100,
        0,
        "墙面"
      );
      this.createCubeWall(
        10,
        200,
        1400,
        1,
        new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
        1295,
        100,
        0,
        "墙面"
      );
      this.createCubeWall(
        10,
        200,
        2600,
        1.5,
        new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
        0,
        100,
        -700,
        "墙面"
      );
    },
    createCubeWall(width, height, depth, angle, material, x, y, z, name) {
      var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
      var cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
      cube.rotation.y += angle * Math.PI;
      cube.name = name;
      this.scene.add(cube);
    },
    cubes() {
      /* 构造立方体 */
      // 创建立方体骨架
      var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      // 创建立方体(注：这里是用了纹理的，如不想使用纹理，将下方2行代码注释，并将第3行代码放开注释)
      let textureGrass = THREE.ImageUtils.loadTexture(
        "../../static/img/dog.jpg"
      );
      var cubeMaterial = new THREE.MeshLambertMaterial({
        map: textureGrass,
        side: THREE.DoubleSide
      });
      // var cubeMaterial = new THREE.MeshLambertMaterial({color: 'yellow', wireframe: true});
      // 合成立方体
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      //投射阴影
      this.cube.castShadow = true;
      //设置方块位置
      this.cube.position.set(-8, 10, 0);
      //将方块添加到场景中
      this.scene.add(this.cube);

      /* 构造球体 */
      // 创建球体骨架
      var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      // 创建球体(注：这里是用了纹理的，如不想使用纹理，将下方2行代码注释，并将第3行代码放开注释)
      let textureGrasss = THREE.ImageUtils.loadTexture(
        "../../static/img/earth.jpg"
      );
      var sphereMaterial = new THREE.MeshLambertMaterial({
        map: textureGrasss,
        side: THREE.DoubleSide
      });
      // var sphereMaterial = new THREE.MeshLambertMaterial({color: 'red', wireframe: true});
      //合成球体
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      //投射阴影
      this.sphere.castShadow = true;
      //设置球体位置
      this.sphere.position.set(20, 10, 0);
      //将球体添加到场景中
      this.scene.add(this.sphere);
    },
    light() {
      //添加平行光光源
      let directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
      //灯光颜色HSL（色调，饱和度，亮度）HSV（表色调，饱和度和值）
      directionalLight.color.setHSL(0.1, 1, 0.95);
      directionalLight.position.set(0, 200, 0).normalize();
      this.scene.add(directionalLight);
      //添加环境光
      let ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.position.set(0, 0, 0);
      this.scene.add(ambientLight);
    },
    animate: function() {
      //设置立方体 x，y，z轴 旋转速度
      this.cube.rotation.x += this.controls.rotationSpeed;
      this.cube.rotation.y += this.controls.rotationSpeed;
      this.cube.rotation.z += this.controls.rotationSpeed;
      //设置球体 跳跃动作参数
      this.step += this.controls.bouncingSpeed;
      this.sphere.position.z = 2 + 10 * Math.cos(this.step);
      this.sphere.position.y = 5 + 10 * Math.abs(Math.sin(this.step));
      //this.sphere.position.z = 5 + 10 * Math.abs(Math.sin(this.step));
      //刷新性能监视插件
      this.status.update();
      //动作帧数回调 - 反复运行
      requestAnimationFrame(this.animate);
      //渲染场景和相机
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.createFloor();
    this.cubes();
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