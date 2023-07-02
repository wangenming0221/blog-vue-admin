<template>
    <div ref="chapter10Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      BoxGeometry,
      Mesh,
      MeshBasicMaterial,
      PerspectiveCamera,
      Scene,
      WebGLRenderer, 
      AxesHelper,
      PlaneGeometry,
      TextureLoader,
      DoubleSide,
      BufferAttribute,
MeshStandardMaterial
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //倒入轨道控制器
import { buffer } from 'stream/consumers';


    const chapter10Ref = ref<HTMLDivElement>();
    //创建场景
    const scene = new Scene();
    //创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0,0,10);
    scene.add(camera);

    //添加几何体
    const cubeGeometry = new BoxGeometry(2,2,2);
    
    /**
     * 倒入纹理
     */
    const textureLoader = new TextureLoader();
    //创建光源
    const doorAoTexture = textureLoader.load("/public/textures/door/ambientOcclusion.jpg"); //导入环境遮挡图
    
    const doorColorTexture = textureLoader.load("/public/textures/door/color.jpg"); //导入图片
    //const texture = textureLoader.load("/public/textures/door/metalness.jpg"); //导入图片
    const doorHeightTexture = textureLoader.load("/public/textures/door/height.jpg") //导入置换贴图
    /**
     * 设置透明
     */
    const doorAplhaTexture = textureLoader.load("/public/textures/door/alpha.jpg");
    //材质
    const cubeMaterial = new MeshBasicMaterial({ 
        color: "#ffff00",
        map: doorColorTexture,
        //alphaMap: doorAplhaTexture,
        transparent: true,
        aoMap: doorAoTexture,
        opacity: 0.5,
        side: DoubleSide, //只设置两面
    });
    //   const cubeMaterial = new MeshStandardMaterial({ 
    //     color: "#ffff00",
    //     map: doorColorTexture,
    //     //alphaMap: doorAplhaTexture,
    //     transparent: true,
    //     aoMap: doorAoTexture,
    //     opacity: 0.5,
    //     side: DoubleSide, //只设置两面
    //     displacementMap: doorHeightTexture,
    //     displacementScale: 0.05,
    // });
    /**
     * 使用uv贴图
     */
    const planeGeometry = new PlaneGeometry(1,1);

    /**
     * 添加平面
     */
    const plane = new Mesh(
        planeGeometry,
        cubeMaterial
    );
    plane.position.set(3,0,0);
    scene.add(plane)
    //给平面设置第二组uv
    planeGeometry.setAttribute("uv2",new BufferAttribute(planeGeometry.attributes.uv.array, 2) );
    //将几何体添加到场景
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

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
        chapter10Ref.value?.appendChild(renderer.domElement);
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