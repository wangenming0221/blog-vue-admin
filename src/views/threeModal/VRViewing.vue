<template>
    <div ref="VRViewing" class="threeModal"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      BoxGeometry,
      Mesh,
      MeshBasicMaterial,
      PerspectiveCamera,
      Scene,
      TextureLoader,
      Vector2,
      WebGLRenderer,
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    const VRViewing = ref<HTMLDivElement>();
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
     * 添加立方体
     */
    const geometry = new BoxGeometry(10,10,10);
    // const meterial = new MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new Mesh(geometry, meterial);
    // scene.add(cube);
    /**
     * 添加图片数组
     */
    const arr = ['4_l','4_r','4_u','4_d','4_b','4_f'];
    var boxMaterials: MeshBasicMaterial[] = [];
    arr.map(item => {
        //纹理加载
        let texure = new TextureLoader().load(`/VRViewing_images/living/${item}.jpg`);
        //创建材质
        let baseMaterial = new MeshBasicMaterial({map: texure});
        
        if(item === '4_u' || item === '4_d') { //纹理旋转
            texure.rotation = Math.PI; //旋转180度
            texure.center = new Vector2(0.5,0.5); //中心旋转
            boxMaterials.push(baseMaterial);
        } else {
            boxMaterials.push(baseMaterial);
        }
    });
    const cube = new Mesh(geometry, boxMaterials);
    cube.geometry.scale(1,1,-1);
    scene.add(cube);

    onMounted(() => {
        //控制器
        const controller = new OrbitControls(camera,renderer.domElement);
        controller.enableDamping = true;
        VRViewing.value?.appendChild(renderer.domElement);
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