<template>
    <div ref="IsLand" class="threeModal"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      CircleGeometry,
      DirectionalLight,
      EquirectangularReflectionMapping,
      Mesh,
      MeshBasicMaterial,
      PerspectiveCamera,
      Scene,
      SphereGeometry,
      TextureLoader,
      Vector2,
      VideoTexture,
      WebGLRenderer,
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { Water } from 'three/examples/jsm/objects/Water2.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; //导入gltf载入裤
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'; //模型解压库
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

    const IsLand = ref<HTMLDivElement>();
    //初始化场景
    const scene = new Scene();
    //初始化相机
    const camera = new PerspectiveCamera(
        75, //视角
        window.innerWidth / window.innerHeight, 
        0.1, 
        2000 //最大距离
    );
    //相机位置 三维坐标
    camera.position.set(-50, 50, 130);
    //更新摄像头宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新摄像头投影矩阵 摄像范围
    camera.updateProjectionMatrix();
    //相机放在场景里
    scene.add(camera);
    //设置渲染器
    const renderer = new WebGLRenderer({
        antialias: true // 设置抗锯齿
    });
    //renderer.outputEncoding = new sRGBEncoding(); //设置输出编码 弃用
    //设置渲染器宽高
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    
    //渲染动画
    const render = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    //创建加载器
    const textureLoader = new TextureLoader();
    /**
     * 创建一个巨大的天空球体
     */
    const texture = textureLoader.load("/public/IsLand/sky.jpg");
    const skyGeo = new SphereGeometry(1000, 60 ,60);
    const skyMaterial = new MeshBasicMaterial({
        map: texture
    });
    skyGeo.scale(1,1,-1);
    const sky = new Mesh(skyGeo, skyMaterial);
    scene.add(sky);
    //视频纹理
    const video = document.createElement("video") as HTMLVideoElement;
    video.src = "/public/IsLand/sky.mp4";
    video.loop = true; //循环播放
    video.muted = true; //静音播放
    /**
     * 载入环境纹理hdr
     */
    const hdrLoader = new RGBELoader();
    hdrLoader.loadAsync("/public/IsLand/050.hdr").then(teture => {
        texture.mapping = EquirectangularReflectionMapping;
        scene.background = teture;
        scene.environment = teture;
    });
    /**
     * 添加平行光
     */
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(-100, 100, 10);
    scene.add(light);
    /**
     * 创建水面 圆
     */
    const waterGeo = new CircleGeometry(300, 64);
    const flowMap = textureLoader.load('textures/water/Water_1_M_Flow.jpg' );
    const water = new Water(waterGeo, {
        textureWidth: 1024,
        textureHeight: 1024,
        color: 0xeeeeff, 
        flowDirection: new Vector2(1,1), //水的流动方向
        scale: 3, //水面波纹大小
        flowMap: flowMap,
    });
    //水平面抬高
    water.position.y = 3;
    //水面旋转至水平
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    /**
     * 添加小岛模型
     */
    new Promise((resolve) => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("static/draco/");
        loader.setDRACOLoader(dracoLoader);
        loader.load("static/island/island.glb", (gltf) => {
            scene.add(gltf.scene);
            resolve(gltf);
        });
    })

    onMounted(() => {
        //控制器
        const controller = new OrbitControls(camera, renderer.domElement);
        controller.enableDamping = true;
        IsLand.value?.appendChild(renderer.domElement);

        render();
        /**
         * 监听窗口大小
         */
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            //更新相机投影矩阵
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
        }, false);

        /**
         * 双击全屏事件
         */
        window.addEventListener("dblclick", () => {
            const fullscreenElement = document.fullscreenElement;
            if(fullscreenElement) {
                document.exitFullscreen();
            } else {
                renderer.domElement.requestFullscreen();

            }
        });
        /**
         * 鼠标移动事件
         */
        window.addEventListener("mousemove", () => {
            //判断视频是否属于播放状态
            if(video.paused) {
                video.play();
                let texture = new VideoTexture(video)
                skyMaterial.map = texture;
                skyMaterial.map.needsUpdate = true;
                scene.background = texture;
                scene.environment = texture;
            }
        });
        
    });

</script>