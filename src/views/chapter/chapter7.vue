<template>
    <div ref="chapter8Ref" class="chapter"></div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from "vue";
    import { 
        Scene, 
        PerspectiveCamera,
        WebGLRenderer, 
        Color,
        Mesh,
        sRGBEncoding,
        ACESFilmicToneMapping,
        EquirectangularReflectionMapping,
        Fog,
        AxesHelper,
    } from "three"; 
    import Stats from "stats.js";
    import * as dat from "dat.gui";
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

    const scene = new Scene();
    const chapter8Ref = ref<HTMLDivElement>();
    const statusRef = ref<HTMLDivElement>();
    const stats = new Stats();
    const controlRef = ref({
        bodyColor: "#0c0c0c",
        glassColor: "#0c0c0c",
        detailsColor: "#0c0c0c",
    });
    const cameraRef = ref<PerspectiveCamera>();
    const renderRef = ref<WebGLRenderer>();
 
    const initGUI = () => {
        if(document.querySelectorAll(".dg.ac>.dg.main.a").length === 0) {
            const gui = new dat.GUI();
            gui.addColor(controlRef.value, "bodyColor");
            gui.addColor(controlRef.value, "glassColor").listen();
            gui.addColor(controlRef.value, "detailsColor");
        }
    };

    const initCamera = () => {
        cameraRef.value = new PerspectiveCamera(45,
            window.innerWidth / window.innerHeight, 0.1, 1000);
        cameraRef.value.position.set(-30, 40, 30);
        cameraRef.value.lookAt(scene.position)
    };

    const initRenderer = () => {
        renderRef.value = new WebGLRenderer({antialias: true});
        renderRef.value.setPixelRatio(window.devicePixelRatio);
        renderRef.value.setSize(window.innerWidth, window.innerHeight);
        renderRef.value.outputEncoding = sRGBEncoding;
        renderRef.value.toneMapping = ACESFilmicToneMapping;
        renderRef.value.toneMappingExposure = 0.85;
    }; 

    const initScene = () => {
        scene.background = new Color(0x333333);
        scene.environment = new RGBELoader().load();
        scene.environment.mapping = EquirectangularReflectionMapping;
        scene.fog = new Fog(0x333333, 10, 15);
        const axes = new AxesHelper(20);
        scene.add(axes);
    };

    initGUI();
    onMounted(() => {
        stats.dom.style.top = "50px";
        statusRef.value?.append(stats.dom);

        initCamera();
        initRenderer();
        initScene();
    })

</script>

<style lang="scss">
    .chapter {
        width: 100%;
        height: 80vh;
    }
</style>
