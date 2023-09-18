<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    FloorDimensions,
    IceDimensions,
    meterToMeter,
    meterToCentimeter,
    meterToMillimeter,
    StoneDimensions,
    ScoreboardDimensions,
} from "../curling/dimensions.js";
import { ArenaModel } from "../models/arena/arena.js";
import { FloorModel } from "../models/floor/floor.js";
import { IceModel } from "../models/ice/ice.js";
import { ScoreboardModel } from "../models/scoreboard/scoreboard.js";
import { StoneSet } from "../models/stone/stone.js";
import { setupLighting } from "../models/lighting.js";
import { setupCameras } from "../models/cameras.js";
import { dumpGeometry } from "../utils";

const RED = 0;
const YELLOW = 1;

const canvasElement = ref();
const progressBar = ref();

const converter = meterToCentimeter;
const floorDimensions = FloorDimensions.generate(converter);
const iceDimensions = IceDimensions.generate(converter);
const stoneDimensions = StoneDimensions.generate(converter);
const scoreboardDimensions = ScoreboardDimensions.generate(converter);

let arena = null;
let floor = null;
let ice = null;
let scoreboard = null;
let stones = [[], []];
let cameras = null;

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

        const orbitCamera = new THREE.PerspectiveCamera(45, canvasElement.value.width / canvasElement.value.height, 0.1, 20000);
        const orbitControls = new OrbitControls(orbitCamera, renderer.domElement);
        orbitCamera.updateProjectionMatrix();

        const scene = new THREE.Scene();
        const axesHelper = new THREE.AxesHelper(1000);

        const ambient = new THREE.AmbientLight(0xffffff, 1);

        const desiredArenaIceLength = floorDimensions.length;
        const actualArenaIceLength = 2400;
        console.log("designed arena ice length", desiredArenaIceLength);

        const scale = desiredArenaIceLength / actualArenaIceLength;
        arena.scale.set(scale, scale, scale);
        dumpGeometry("arena after scale", arena);

        const box = new THREE.Box3().setFromObject(arena);
        const boundingBox = new THREE.Box3();
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();

        boundingBox.setFromObject(arena);
        box.getCenter(center);
        box.getSize(size);

        const x = center.x + iceDimensions.width / 2 + 150;
        const y = center.y - iceDimensions.length / 2;
        const z = 11;

        floor.position.set(x, center.y, z);

        let origin = new THREE.Vector3(x, y, z + 2);

        ice.position.set(origin.x, origin.y, origin.z);

        scoreboard.position.set(origin.x, origin.y + iceDimensions.length + scoreboardDimensions.back, origin.z);

        const lights = setupLighting(origin, iceDimensions);
        lights.all.forEach((light) => scene.add(light));

        const cameras = setupCameras(origin, center, iceDimensions, converter);
        cameras.forEach((camera) => scene.add(camera));

        orbitCamera.position.set(origin.x, origin.y - meterToCentimeter(20), meterToCentimeter(10));
        orbitCamera.lookAt(origin.x, origin.y + meterToCentimeter(50), origin.z);

        axesHelper.position.set(origin.x, origin.y, origin.z);
        scene.add(axesHelper);
        scene.add(orbitCamera);
        scene.add(ambient);
        scene.add(arena);
        scene.add(scoreboard);
        scene.add(floor);
        scene.add(ice);

        stones[RED].forEach((stone, index) => {
            stone.position.x = origin.x + iceDimensions.width / 2 - stoneDimensions.diameter / 2;
            stone.position.y =
                center.y - iceDimensions.length / 2 + stoneDimensions.diameter * index + stoneDimensions.diameter / 2;
            stone.position.z = origin.z;
            scene.add(stone);
        });

        stones[YELLOW].forEach((stone, index) => {
            stone.position.x = origin.x - iceDimensions.width / 2 + stoneDimensions.diameter / 2;
            stone.position.y =
                center.y - iceDimensions.length / 2 + stoneDimensions.diameter * index + stoneDimensions.diameter / 2;
            stone.position.z = origin.z;
            scene.add(stone);
        });

        renderer.render(scene, cameras[7]); 
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

    manager.itemStart("floor");
    FloorModel.generate(floorDimensions).then((model) => {
        floor = model;
        manager.itemEnd("floor");
    });

    manager.itemStart("ice");
    IceModel.generate(iceDimensions).then((model) => {
        ice = model;
        manager.itemEnd("ice");
    });

    manager.itemStart("scoreboard");
    ScoreboardModel.generate(scoreboardDimensions).then((model) => {
        scoreboard = model;
        manager.itemEnd("scoreboard");
    });

    manager.itemStart("red stones");
    StoneSet.generate(stoneDimensions, "red").then((models) => {
        stones[RED] = models;

        manager.itemEnd("red stones");
    });

    manager.itemStart("yellow stones");
    StoneSet.generate(stoneDimensions, "yellow").then((models) => {
        stones[YELLOW] = models;

        manager.itemEnd("yellow stones");
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
    <canvas ref="canvasElement" />
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
