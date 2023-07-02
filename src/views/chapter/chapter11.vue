<template>
    <div ref="chapter11Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
    import { 
      Color,
      MeshBasicMaterial,
      PerspectiveCamera,
      Scene,
      WebGLRenderer, 
      BufferGeometry,
      BufferAttribute,
      Mesh,
      AxesHelper
    } from "three"; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

    const chapter11Ref = ref<HTMLDivElement>();

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,10);
    scene.add(camera);
    /**
     * 创建几何体
     */
    const geometry = new BufferGeometry();
    const vertics = new Float32Array([
        -1.0, -1.0, 1.0, 
        1.0, -1.0, 1.0, 
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0
    ]);
    /**
     * 设置材质
     */
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    /**
     * 设置顶点
     * 参数：一个一维数组 vertics, 没3个值作为一个坐标
     */
    geometry.setAttribute("position", new BufferAttribute(vertics, 3))
    /**
     * 设置物体
     */
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    //renderer.setClearColor(new Color(0xeeeeee));
    /**
     * 添加辅助线
     */
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    /**
     * 添加轨道
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    const render = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    onMounted(() => {
        chapter11Ref.value?.appendChild(renderer.domElement);
        
        render();

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            //更新相机投影矩阵
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
        }, false);
    });

</script>

<style lang="scss">
    .chapter {
        width: 100%;
        height: 80vh;
    }
</style>