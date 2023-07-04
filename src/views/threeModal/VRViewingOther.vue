<template>
    <div ref="VRViewingOther" class="threeModal"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      Mesh,
      MeshBasicMaterial,
      PerspectiveCamera,
      Scene,
      SphereGeometry,
      WebGLRenderer,
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

    const VRViewingOther = ref<HTMLDivElement>();
    //场景
    const scene = new Scene();
    //相机
    const camera = new PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 1000
    );
    camera.position.z = 0.1;
    scene.add(camera);
    
    //渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    //渲染动画
    const render = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    
    /**
     * 添加球体
     */
    const geometry = new SphereGeometry(5, 32, 32);
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("/VRViewing_images/hdr/Living.hdr", (texture) => {
        const material = new MeshBasicMaterial({ map: texture });
        const sphere = new Mesh(geometry, material);
        sphere.geometry.scale(1,1,-1);
        scene.add(sphere);
    });
  


    onMounted(() => {
        //控制器
        const controller = new OrbitControls(camera,renderer.domElement);
        controller.enableDamping = true;
        VRViewingOther.value?.appendChild(renderer.domElement);
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
    });

</script>