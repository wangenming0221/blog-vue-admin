<template>
	<div style="position: relative;">
	    <div style="position: absolute;right: 10%;top: 20px;display: flex;">
            <span class="colorPicker"><input ref="bodyColor" type="color" value="#ff0000" /><br/>车体</span>
            <span class="colorPicker"><input ref="detailsColor" type="color" value="#ffffff" /><br/>内饰</span>
            <span class="colorPicker"><input ref="glassColor" type="color" value="#ffffff" /><br/>前窗</span>
        </div>


        <div ref="CarAutoShow" class="threeModal"></div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { 
      Color,
      GridHelper,
      PerspectiveCamera,
      Scene,
      WebGLRenderer,
      MathUtils,
      EquirectangularReflectionMapping,
      Fog,
      DirectionalLight,
      MeshPhysicalMaterial,
      MeshStandardMaterial,
      PlaneGeometry,
      MeshBasicMaterial,
      MultiplyBlending,
      TextureLoader,
      Mesh,
      ACESFilmicToneMapping
    } from "three"; 
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'; //解压缩

    //容器
    const CarAutoShow = ref<HTMLDivElement>();
    //颜色选择器
    const bodyColor = ref<HTMLInputElement>();
    const detailsColor = ref<HTMLInputElement>();
    const glassColor = ref<HTMLInputElement>();
    //场景
    let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer;
	let grid: any;
	let controls;
    const wheels: any = [];

    /**
     * 添加汽车模型
     */
    const init = () => {
        //渲染器
        renderer = new WebGLRenderer({
            antialias: true, //抗锯齿
        });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize(window.innerWidth - 300, window.innerHeight - 100);
		renderer.setAnimationLoop( render );
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.85;
		renderer.useLegacyLights = false;
        //容器加载
        CarAutoShow.value?.appendChild(renderer.domElement);
        //添加相机
        camera = new PerspectiveCamera(
            40, //视角
            window.innerWidth / window.innerHeight, 
            0.1, 
            100 //最大距离
        );
        camera.position.set( 4.25, 1.4, - 4.5 );
        //控制器
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.maxDistance = 9;
        controls.maxPolarAngle = MathUtils.degToRad( 90 );
		controls.target.set( 0, 0.5, 0 );
		controls.update();
        //场景
        scene = new Scene();
		scene.background = new Color( 0x333333 );
		scene.environment = new RGBELoader().load( 'textures/equirectangular/venice_sunset_1k.hdr' );
		scene.environment.mapping = EquirectangularReflectionMapping;
		scene.fog = new Fog( 0x333333, 10, 15 );
        //网格地面      
        grid = new GridHelper( 20, 40, 0xffffff, 0xffffff );  
		grid.material.opacity = 0.2;
		grid.material.depthWrite = false;
		grid.material.transparent = true;
		scene.add( grid );
        //材质
        let bodyMaterial = new MeshPhysicalMaterial({
            color: 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03
        });
        let detailsMaterial = new MeshStandardMaterial( {
            color: 0xffffff, metalness: 1.0, roughness: 0.5
        });
        let glassMaterial = new MeshPhysicalMaterial( {
            color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
        });

        bodyColor.value?.addEventListener('input', (event: any) => {
            bodyMaterial.color.set(event?.target?._value);
        });
        let shadow = new TextureLoader().load( '/public/CarAutoShow/ferrari_ao.png' );
        let loader = new GLTFLoader();
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("static/libs/draco/gltf/");
        loader.setDRACOLoader(dracoLoader);
        loader.load("static/car/ferrari.glb", (gltf) => {
            let carModel: any = gltf.scene.children[0];

            carModel.getObjectByName( 'body' ).material = bodyMaterial;
            carModel.getObjectByName( 'rim_fl' ).material = detailsMaterial;
			carModel.getObjectByName( 'rim_fr' ).material = detailsMaterial;
			carModel.getObjectByName( 'rim_rr' ).material = detailsMaterial;
			carModel.getObjectByName( 'rim_rl' ).material = detailsMaterial;
			carModel.getObjectByName( 'trim' ).material = detailsMaterial;
			carModel.getObjectByName( 'glass' ).material = glassMaterial;


            wheels.push(
				carModel.getObjectByName( 'wheel_fl' ),
				carModel.getObjectByName( 'wheel_fr' ),
				carModel.getObjectByName( 'wheel_rl' ),
				carModel.getObjectByName( 'wheel_rr' )
			);

            // shadow
			const mesh = new Mesh(
				new PlaneGeometry( 0.655 * 4, 1.3 * 4 ),
				new MeshBasicMaterial( {
					map: shadow, 
                    blending: MultiplyBlending, 
                    toneMapped: false, 
                    transparent: true
				} )
			);
			mesh.rotation.x = - Math.PI / 2;
			mesh.renderOrder = 2;
			carModel.add(mesh);

            scene.add(carModel);
        });
    };
    /**
     * 添加灯光
     */
    const addLight = () => {
        let directLight1 = new DirectionalLight(0xffffff, 1);
        directLight1.position.set(0, 0, 10);
        scene.add(directLight1);
        let directLight2 = new DirectionalLight(0xffffff, 1);
        directLight1.position.set(0, 0, -10);
        scene.add(directLight2);
        let directLight3 = new DirectionalLight(0xffffff, 1);
        directLight1.position.set(10, 0, 0);
        scene.add(directLight3);
        let directLight4 = new DirectionalLight(0xffffff, 1);
        directLight1.position.set(0, 10, 0);
        scene.add(directLight4);
        let directLight5 = new DirectionalLight(0xffffff, 1);
        directLight5.position.set(-10, 0, 0);
        scene.add(directLight5);
        let directLight6 = new DirectionalLight(0xffffff, 1);
        directLight6.position.set(5, 10, 0);
        scene.add(directLight6);
        let directLight7 = new DirectionalLight(0xffffff, 1);
        directLight7.position.set(0, 10, 5);
        scene.add(directLight7);
        let directLight8 = new DirectionalLight(0xffffff, 1);
        directLight8.position.set(0, 10, -5);
        scene.add(directLight8);
        let directLight9 = new DirectionalLight(0xffffff, 1);
        directLight9.position.set(-5, 10, 0);
        scene.add(directLight9);
    }
    //渲染动画
    const render = () => {
        let time = - performance.now() / 1000;
		for ( let i = 0; i < wheels.length; i ++ ) {
			wheels[i].rotation.x = time * Math.PI * 2;
		}
        grid.position.z = - ( time ) % 1; //让网格后移动，看起来像车在往前开
		renderer.render(scene, camera );
		requestAnimationFrame(render)
    }
    //监听器
    const addListerer = () => {
         /**
         * 监听窗口大小
         */
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
            let fullscreenElement = document.fullscreenElement;
            if(fullscreenElement) {
                document.exitFullscreen();
            } else {
                renderer.domElement.requestFullscreen();

            }
        });
    };

    onMounted(() => {
        //监听器
        addListerer();
        //灯光
        //addLight();
        //动画
        //render();
        //模型
        init();
    });

</script>

<style>
    .colorPicker {
        margin: 10px;
        text-align: center;
    }
</style>