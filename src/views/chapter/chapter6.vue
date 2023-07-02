<template>
    <div ref="chapter4Ref" class="chapter"></div>
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
        MeshLambertMaterial,
        Mesh,
        BoxGeometry,
        SphereGeometry,
        SpotLight
    } from "three"; 
    /**
     * 容器
     */
    const chapter4Ref = ref<HTMLDivElement>();
    /**
     * 创建threejs场景
     */
    const scene = new Scene();
    const planeGeometry = new PlaneGeometry(60, 20);

    /**
     * 1.创建摄像机(模拟人眼视觉角度) 参数 -> 夹角，宽高比，最近距离，最远距离
     * 2.设置摄像机位置 参数 -> x轴，y轴，z轴
     * 3.摄像机朝向
     *  camera.position.set(-30, 40, 30); //设置摄像机位置
     *  camera.lookAt(scene.position); //摄像机朝向
     */
    const camera = ref();
    /**
     * 灯光
     * 下面的材质 -> wireframe: false设置为实体
     * 下面的renderer配置 -> renderer.shadowMap.enabled = true(可以渲染阴影贴图)
     * 下面的plane.receiveShadow = true; //开启阴影
     * 下面的几何体添加 xxx.castShadow = true
     */
    const spotLight = new SpotLight(0xffffff);
    spotLight.castShadow = true; //开启阴影
    spotLight.position.set(-40, 60 ,-10);
    scene.add(spotLight);
    /**
     * 渲染器
     */
    const renderer = new WebGLRenderer();
    renderer.setClearColor(new Color(0xeeeeee));
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
    renderer.shadowMap.enabled = true; //可以渲染阴影贴图
    /**
     * 添加右手坐标系
     */
    const axes = new AxesHelper(20);
    scene.add(axes);
    /**
     * 材质
     */
    //const meshBasicMaterial = new MeshBasicMaterial({color: 0xcccccc});
    const meshBasicMaterial = new MeshLambertMaterial({color: 0xcccccc});
    /**
     * Mesh是一个构造函数 创造一个网格
     */
    const plane = new Mesh(planeGeometry, meshBasicMaterial);
    plane.receiveShadow = true; //开启阴影
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
    // const cubeMaterial = new MeshBasicMaterial({color:0xff0000, wireframe: false});
    const cubeMaterial = new MeshLambertMaterial({color:0xff0000, wireframe: false}); //为了阴影更改材质
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    /**
     * 设置默认位置
     */
    cube.castShadow = true;
    cube.position.set(2, 2, 2);
    scene.add(cube);
    /**
     * 添加一个球体
     */
    const sphereGeometry = new SphereGeometry(4);
    //const sphereMaterial = new MeshBasicMaterial({color:0x7777ff, wireframe: false});
    const sphereMaterial = new MeshLambertMaterial({color:0x7777ff, wireframe: false});
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.set(35, 4, 2);
    scene.add(sphere);

    /**
     * 添加一个平面几何体
     */
    for(var j = 0;j < planeGeometry.parameters.height / 2; j++) {
        for(var i = 0; i < planeGeometry.parameters.width / 2; i++) {
            const cube = new Mesh(cubeGeometry, cubeMaterial);
            cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + j * 5;
            cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + i * 5;
            cube.position.y = 0;

            scene.add(cube);
        }
    }

    //动画
    let step = 0;
    const renderScence = () => {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;
        step += 0.04;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

        requestAnimationFrame(renderScence);
        renderer.render(scene, camera.value);
    };
    
    /**
     * 在dom创建后加载
     */
    onMounted(() => {
        /**
         * 重制相机
         */
        camera.value = new PerspectiveCamera(45,
            window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.value.position.set(-120, 60, 180);
        camera.value.lookAt(scene.position)
        /**
         * 把dom结构渲染到容器
         */
        chapter4Ref.value?.appendChild(renderer.domElement);
        
        renderScence();
            
        window.addEventListener("resize", () => {
            camera.value.aspect = window.innerWidth / window.innerHeight;
            //更新相机投影矩阵
            camera.value.updateProjectionMatrix();
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