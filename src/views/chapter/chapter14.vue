<template>
    <div ref="chapter14Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      AmbientLight,
      AxesHelper,
      DirectionalLight,
      Mesh,
      MeshStandardMaterial,
      PerspectiveCamera,
      PlaneGeometry,
      Scene,
      SphereGeometry,
      WebGLRenderer,
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    const chapter14Ref = ref<HTMLDivElement>();
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //设置相机位置
    camera.position.set(0,0,10);
    scene.add(camera);

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    renderer.shadowMap.enabled = true;
    /**
     * 添加一个球
     */
    const sphereGeo = new SphereGeometry(1, 20, 20);
    const meterial = new MeshStandardMaterial();
    const sphere = new Mesh(sphereGeo, meterial);
    sphere.castShadow = true;
    scene.add(sphere); 
    /**
     * 添加一个平面
     */
    const planeGeo = new PlaneGeometry(10, 10);
    const plane = new Mesh(planeGeo, meterial);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
    /**
     * 灯光
     */
    //环境光
    const light = new AmbientLight(0xffffff, 0.5);
    scene.add(light);
    //直线光
    const diretionalLight = new DirectionalLight(0xffffff, 0.5);
    diretionalLight.position.set(10, 10, 10);
    diretionalLight.castShadow = true;
    scene.add(diretionalLight);
    // 目标：灯光与阴影
    // 灯光阴影
    // 1、材质要满足能够对光照有反应
    // 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
    // 3、设置光照投射阴影 directionalLight.castShadow = true;
    // 4、设置物体投射阴影 sphere.castShadow = true;
    // 5、设置物体接收阴影 plane.receiveShadow = true;


    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    onMounted(() => {
        chapter14Ref.value?.appendChild(renderer.domElement);
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