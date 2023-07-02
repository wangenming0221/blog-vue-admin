<template>
    <div ref="chapter1Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from "vue";
    import { 
        Scene, 
        PerspectiveCamera,
        WebGLRenderer, 
        Color,
        AxesHelper,
        PlaneGeometry,
        MeshBasicMaterial,
        Mesh,
        BoxGeometry,
        SphereGeometry
    } from "three"; 
    /**
     * 容器
     */
    const chapter1Ref = ref<HTMLDivElement>();
    /**
     * 创建threejs场景
     */
    const scene = new Scene();
    /**
     * 1.创建摄像机(模拟人眼视觉角度) 参数 -> 夹角，宽高比，最近距离，最远距离
     * 2.设置摄像机位置 参数 -> x轴，y轴，z轴
     * 3.摄像机朝向
     */
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-30, 40, 30); //设置摄像机位置
    camera.lookAt(scene.position); //摄像机朝向
    /**
     * 渲染器
     */
    const renderer = new WebGLRenderer();
    renderer.setClearColor(new Color(0xeeeeee));
    renderer.setSize(1200, 600);
    /**
     * 添加右手坐标系
     */
    const axes = new AxesHelper(20);
    scene.add(axes);
    /**
     * 添加一个平面几何体
     */
    const planeGeometry = new PlaneGeometry(60, 20);
    /**
     * 材质
     */
    const meshBasicMaterial = new MeshBasicMaterial({color: 0xcccccc});
    /**
     * Mesh是一个构造函数 创造一个网格
     */
    const plane = new Mesh(planeGeometry, meshBasicMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    /**
     * 添加一个立方体
     * BoxGeometry设置长宽高
     */
    const cubeGeometry = new BoxGeometry(4, 4, 4);
    const cubeMaterial = new MeshBasicMaterial({color:0xff0000, wireframe: false});
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    /**
     * 设置默认位置
     */
    cube.position.set(2, 2, 2);
    scene.add(cube);
    /**
     * 添加一个球体
     */
    const sphereGeometry = new SphereGeometry(4);
    const sphereMaterial = new MeshBasicMaterial({color:0x7777ff, wireframe: true});
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    onMounted(() => {
        /**
         * 把dom结构渲染到容器
         */
        chapter1Ref.value?.appendChild(renderer.domElement);
        /**
         * 把场景放进来
         * 把摄像机放进来
         */
        renderer.render(scene, camera);
    });

</script>

<style lang="scss">
    .chapter {
        width: 100%;
        height: 80vh;
    }
</style>