import * as THREE from '../build/three.module.js';
class App{
    constructor(){
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGL1Renderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }
    _setupCamera(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;    
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    _setupModel(){
        const geometry = new THREE.BoxGeometry(1,1,1);
    
        // 무지개 색상 배열 정의
        const rainbowColors = [
            0xff0000, // 빨강
            0xff7f00, // 주황
            0xffff00, // 노랑
            0x00ff00, // 초록
            0x0000ff, // 파랑
            0x4b0082, // 남색
            0x9400d3  // 보라
        ];
    
        // 각 면에 다른 무지개 색상 적용
        const materials = [
            new THREE.MeshPhongMaterial({ color: rainbowColors[0] }),
            new THREE.MeshPhongMaterial({ color: rainbowColors[1] }),
            new THREE.MeshPhongMaterial({ color: rainbowColors[2] }),
            new THREE.MeshPhongMaterial({ color: rainbowColors[3] }),
            new THREE.MeshPhongMaterial({ color: rainbowColors[4] }),
            new THREE.MeshPhongMaterial({ color: rainbowColors[5] })
        ];
    
        const cube = new THREE.Mesh(geometry, materials);
        this._scene.add(cube);
        this._cube = cube;
    }
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
    }
}

window.onload = function(){
    new App()
}