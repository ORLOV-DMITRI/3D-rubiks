import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;

function createRenderer() {
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    
    return renderer;
}

function createCameraAndScene() {
    const fov = 100;
    const aspect = width / height;
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 4;
    const scene = new THREE.Scene();
    
    return {camera, scene};
}
let boxesMesh = [];
function createRubik() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const positions = [-1.1, 0, 1.1]; // Возможные координаты для X, Y и Z
 
    
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000 }), // правая (красный)
        new THREE.MeshBasicMaterial({ color: 0x0000ff }), // левая (синий)
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // верхняя (зелёный)
        new THREE.MeshBasicMaterial({ color: 0xffff00 }), // нижняя (жёлтый)
        new THREE.MeshBasicMaterial({ color: 0xffffff }), // передняя (белый)
        new THREE.MeshBasicMaterial({ color: 0xffa500 }), // задняя (оранжевый)
    ];
    
    for (let x of positions) {
        for (let y of positions) {
            for (let z of positions) {
                const material = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    flatShading: true,
                });
                const wireMaterial = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    wireframe: true
                });
                const wireMesh = new THREE.Mesh(geometry, wireMaterial);
                wireMesh.scale.setScalar(1.001);
                const boxMesh = new THREE.Mesh(geometry, materials);
                
                boxMesh.add(wireMesh);
                boxMesh.position.set(x, y, z);
                
                boxesMesh.push(boxMesh);
            }
        }
    }
    
    
    return boxesMesh;
}




function createLight() {
    return new THREE.HemisphereLight(0x0099ff, 0xaa5500)
}


export function startRubik() {
    const renderer = createRenderer();
    const {camera, scene} = createCameraAndScene();
    const boxesMesh = createRubik();
    const hemiLight = createLight();
    
    
    
    const rubiksCube = new THREE.Group();
    
    boxesMesh.forEach(boxMesh => {
        rubiksCube.add(boxMesh)
    })
    rubiksCube.scale.setScalar(0.5)
    
    scene.add(rubiksCube);
    
    scene.add(hemiLight);
    
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    
    function animate(time = 0) {
        requestAnimationFrame(animate);
        // boxMesh.rotation.y = time * 0.0004;
        renderer.render(scene, camera);
        controls.update()
    }
    animate()
    
    
}
