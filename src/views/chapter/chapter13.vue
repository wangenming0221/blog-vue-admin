<template>
    <div ref="chapter13Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
        Mesh,
        PerspectiveCamera,
        Scene,
        WebGLRenderer, 
        CubeTextureLoader,
        SphereGeometry,
        MeshStandardMaterial,
        AmbientLight,
        DirectionalLight,
        EquirectangularReflectionMapping
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //倒入轨道控制器
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

    const chapter13Ref = ref<HTMLDivElement>();
    //创建场景
    const scene = new Scene();
    //加载hdr环境图
    const rgbeLoader = new RGBELoader();
    rgbeLoader.loadAsync("/public/hdr/002.hdr").then(texture => {
        texture.mapping = EquirectangularReflectionMapping; //等距圆柱经纬球
        scene.background = texture; //场景纹理
        scene.environment = texture; //环境纹理
    });
    //创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0,0,10);
    scene.add(camera);
    //设置cube纹理加载器
    const cubeTextcureLoader = new CubeTextureLoader();
    // 灯光
    // 环境光
    const light = new AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(light);
    //直线光源
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    const envMapTexture = cubeTextcureLoader.load([
        "/public/environmentMaps/1/px.jpg", //正方向x
        "/public/environmentMaps/1/nx.jpg", //负方向x
        "/public/environmentMaps/1/py.jpg", //正方向y
        "/public/environmentMaps/1/ny.jpg", //负方向y
        "/public/environmentMaps/1/pz.jpg", //正方向z
        "/public/environmentMaps/1/nz.jpg", //负方向z
    ]);
    const sphereGeometry = new SphereGeometry(1,20,20);
    const material = new MeshStandardMaterial({ 
        metalness: 0.7, //暗度
        roughness: 0.1, //光滑 
        //envMap: envMapTexture, //环境贴图
    });
    const sphere = new Mesh(sphereGeometry, material);
    scene.add(sphere);
    /**
     * 渲染器
     */
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    //给场景添加背景
    scene.background = envMapTexture;
    //给场景的所有物体添加默认环境贴图
    scene.environment = envMapTexture;
    /**
     * 创建轨道控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    onMounted(() => {
        chapter13Ref.value?.appendChild(renderer.domElement);
        render();

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
    })

</script>

<style lang="scss">
    .chapter {
        width: 100%;
        height: 80vh;
    }
</style>