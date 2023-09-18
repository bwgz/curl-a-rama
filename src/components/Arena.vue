<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ArenaModel } from "../models/arena/arena.js";
import { dumpGeometry } from "../utils";
const canvasElement = ref();
const progressBar = ref();

let arena = null;

onMounted(() => {
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        console.log("Started loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    };
    manager.onLoad = function () {
        const canvas = canvasElement.value;
    console.log("canvas", canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const orbitCamera = new THREE.PerspectiveCamera(45, canvasElement.value.width / canvasElement.value.height, 0.1, 6000);
    const orbitControls = new OrbitControls(orbitCamera, renderer.domElement);
    orbitCamera.updateProjectionMatrix();

    const scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(1000);

    const ambient = new THREE.AmbientLight(0xffffff, 1);

    const box = new THREE.Box3().setFromObject(arena);
    const boundingBox = new THREE.Box3();
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    boundingBox.setFromObject(arena);
    box.getCenter(center);
    box.getSize(size);
    axesHelper.position.set(center.x + 100, center.y - 800, center.z - 800);

    orbitCamera.position.set(center.x, center.y -2000, center.z - 500);
    orbitCamera.lookAt(center.x, center.y, center.z - 800);

    scene.add(axesHelper);
    scene.add(orbitCamera);
    scene.add(ambient);
    scene.add(arena);

    renderer.render(scene, orbitCamera)
    progressBar.value.style.display = "none";
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log("Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    };

    manager.itemStart("arena");
    ArenaModel.generate(manager).then((model) => {
        arena = model;
        dumpGeometry("arena", arena);
        manager.itemEnd("arena");
    });

});

</script>

<template>
    <div ref="progressBar" class="progress-bar-container">
        <label class="display-2" for="progress-bar">Get Ready to Rock</label>
        <div class="spinner-border text-primary" role="status">
            <span id="progress-bar" class="sr-only">Loading...</span>
        </div>
    </div>
    <canvas ref="canvasElement"/>
</template>

<style scoped>
canvas {
  pointer-events: all;
}


.progress-bar-container {
    left: 50%;
    top: 50%;
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#c {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
