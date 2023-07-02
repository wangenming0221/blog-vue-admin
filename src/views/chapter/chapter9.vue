<template>
    <div ref="chapter9Ref" class="chapter"></div>
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
      Clock
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; //倒入轨道控制器
    import { gsap } from "gsap";

    const chapter9Ref = ref<HTMLDivElement>();
    //创建场景
    const scene = new Scene();
    //创建相机
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0,0,10);
    scene.add(camera);

    //添加集合体
    const cubeGeometry = new BoxGeometry(1,1,1);
    const cubeMaterial = new MeshBasicMaterial({ color: 0xffff00 });
    //材质
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    //将集合体添加到场景
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
    /**
     * 设置时钟
     */
    const clock = new Clock();
    /**
     * 设置动画
     */
    gsap.to(cube.position, { 
        x: 5, //x轴移动长度5
        duration: 5, //5秒完成动画
        ease: "power1.inOut", //动画类型 -> 慢-快-慢
        repeat: 2, //重复两次 -1为无限次
        onComplete: () => {
            console.log("动画已结束")
        },
        onStart: () => {
            console.log("动画开始")
        } 
    });
    gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

    const render = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    onMounted(() => {
        chapter9Ref.value?.appendChild(renderer.domElement);
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