<template>
    <div ref="chapter12Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      BoxGeometry,
      Mesh,
      PerspectiveCamera,
      Scene,
      WebGLRenderer, 
      AxesHelper,
      PlaneGeometry,
      TextureLoader,
      DoubleSide,
      BufferAttribute,
      MeshStandardMaterial,
      AmbientLight,
      DirectionalLight,
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //倒入轨道控制器


    const chapter12Ref = ref<HTMLDivElement>();
    //创建场景
    const scene = new Scene();
    //创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0,0,10);
    scene.add(camera);

    //添加几何体
    const cubeGeometry = new BoxGeometry(1, 1, 1, 100, 100, 100);
    
    /**
     * 倒入纹理
     */
    const textureLoader = new TextureLoader();
    const doorAoTexture = textureLoader.load("/public/textures/door/ambientOcclusion.jpg"); //导入环境遮挡图
    const doorColorTexture = textureLoader.load("/public/textures/door/color.jpg"); //导入图片
    const doorAplhaTexture = textureLoader.load("/public/textures/door/alpha.jpg");
    /**
     * 加载进度
     */
     
    /**
     * 置换贴图
     */
    const doorHeightTexture = textureLoader.load("/public/textures/door/height.jpg")
     /**
      * 粗糙度贴图
      */
    const roughnessTexture = textureLoader.load("/public/textures/door/roughness.jpg")
     /**
      * 金属贴图
      */
    const metalnessTexture = textureLoader.load("/public/textures/door/metalness.jpg")    
    /**
     * 法线贴图
     */
    const normalTexture = textureLoader.load("/public/textures/door/normal.jpg")
    //材质
    const material = new MeshStandardMaterial({ 
        color: "#ffff00",
        map: doorColorTexture,
        alphaMap: doorAplhaTexture,
        transparent: true,
        aoMap: doorAoTexture,
        aoMapIntensity: 1,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        roughness: 1,
        roughnessMap: roughnessTexture,
        metalness: 1,
        metalnessMap: metalnessTexture,
        normalMap: normalTexture,
    });
    material.side = DoubleSide;
    const cube = new Mesh(cubeGeometry, material);
    scene.add(cube);
    // 给cube添加第二组uv
    cubeGeometry.setAttribute(
    "uv2",
    new BufferAttribute(cubeGeometry.attributes.uv.array, 2)
    );

    // 添加平面
    const planeGeometry = new PlaneGeometry(1, 1, 200, 200);
    const plane = new Mesh(planeGeometry, material);
    plane.position.set(1.5, 0, 0);
    scene.add(plane);
    // console.log(plane);
    // 给平面设置第二组uv
    planeGeometry.setAttribute(
    "uv2",
    new BufferAttribute(planeGeometry.attributes.uv.array, 2)
    );
    // 灯光
    // 环境光
    const light = new AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(light);
    //直线光源
    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    /**
     * 渲染器
     */
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    /**
     * 添加坐标辅助器
     * 参数：坐标轴长度
     * 红色是x轴，绿色是y轴，蓝色是z轴
     */
    const axesHelper = new AxesHelper( 5 );
    scene.add(axesHelper);
    /**
     * 创建轨道控制器
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    onMounted(() => {
        chapter12Ref.value?.appendChild(renderer.domElement);
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