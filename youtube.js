import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { setupMovement } from './movenment.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('myCanvas').appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var videoId = 'e44ZdR7_q6s';

var imgUrl = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';

var loader = new THREE.TextureLoader();

let cube;

loader.load(imgUrl, function (texture) {

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ map: texture });

    cube = new THREE.Mesh(geometry, material);
    cube.material.needsUpdate = true;
    scene.add(cube);

    setupMovement(renderer.domElement, cube);

    animate();
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}