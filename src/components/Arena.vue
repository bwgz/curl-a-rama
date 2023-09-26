<script setup>
import { onMounted, ref, toRaw } from "vue";
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
import { Animation } from "../models/animation.js";
import { ThirdPersonCamera } from "../models/third-person-camera.js";
import { dumpGeometry } from "../utils";

const props = defineProps(["teams"]);
const { teams } = toRaw(props);

const loading = ref(0);
const loaded = ref(0);
const progressBar = ref();
const progressBarLoaded = ref();

const TEAM_0 = 0;
const TEAM_1 = 1;

const canvasElement = ref();
const cameraBar = ref();

const converter = meterToCentimeter;
const floorDimensions = FloorDimensions.generate(converter);
const iceDimensions = IceDimensions.generate(converter);
const stoneDimensions = StoneDimensions.generate(converter);
const scoreboardDimensions = ScoreboardDimensions.generate(converter);

let renderer = null;
let scene = null;
let arena = null;
let floor = null;
let ice = null;
let scoreboard = null;
let stones = [[], []];
let cameras = null;
let mixer;

let activeCamera = 0;
function setCamera(index) {
    activeCamera = index;
}

let thirdPersonCamera = null;
const shot = {
    shooter: null,
    stones: null,
};

const clock = new THREE.Clock();

function render() {
    if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);

        thirdPersonCamera.Update(delta);
        cameras[0].updateProjectionMatrix();
    }

    renderer.render(scene, cameras[activeCamera]);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

onMounted(() => {
    const manager = new THREE.LoadingManager();
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
        loaded.value = itemsLoaded;
        loading.value = itemsTotal;
        console.log("Started loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        loaded.value = itemsLoaded;
        loading.value = itemsTotal;
        progressBarLoaded.value.style.width = `${(itemsLoaded / itemsTotal) * 100}%`;
        console.log("Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
    };

    manager.onLoad = function () {
        const canvas = canvasElement.value;
        console.log("canvas", canvas);

        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        scene = new THREE.Scene();
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

        cameras = setupCameras(origin, center, iceDimensions, converter);
        cameras.forEach((camera) => scene.add(camera));

        //axesHelper.position.set(origin.x, origin.y, origin.z);
        //scene.add(axesHelper);
        scene.add(ambient);
        scene.add(arena);
        scene.add(scoreboard);
        scene.add(floor);
        scene.add(ice);

        stones[TEAM_0].forEach((stone, index) => {
            stone.position.x = origin.x + iceDimensions.width / 2 - stoneDimensions.diameter / 2;
            stone.position.y =
                center.y - iceDimensions.length / 2 + stoneDimensions.diameter * index + stoneDimensions.diameter / 2;
            stone.position.z = origin.z;
            scene.add(stone);
        });

        stones[TEAM_1].forEach((stone, index) => {
            stone.position.x = origin.x - iceDimensions.width / 2 + stoneDimensions.diameter / 2;
            stone.position.y =
                center.y - iceDimensions.length / 2 + stoneDimensions.diameter * index + stoneDimensions.diameter / 2;
            stone.position.z = origin.z;
            scene.add(stone);
        });

        shot.stones = stones;

        shot.stones[TEAM_0][0].position.x = origin.x - iceDimensions.width / 2 + stoneDimensions.diameter / 2;
        shot.stones[TEAM_0][0].position.y = origin.y + iceDimensions.length - stoneDimensions.diameter / 2;

        shot.stones[TEAM_0][1].position.x = origin.x + stoneDimensions.diameter / 2;
        shot.stones[TEAM_0][1].position.y =
            origin.y + iceDimensions.hogLine + iceDimensions.hogToHog + meterToCentimeter(2);

        shot.stones[TEAM_0][2].position.x = origin.x + meterToCentimeter(1);
        shot.stones[TEAM_0][2].position.y =
            origin.y + iceDimensions.hogLine + iceDimensions.hogToHog + meterToCentimeter(3);

        shot.stones[TEAM_0][3].position.x = origin.x + meterToCentimeter(1.2);
        shot.stones[TEAM_0][3].position.y =
            origin.y + iceDimensions.hogLine + iceDimensions.hogToHog + meterToCentimeter(6.25);

        shot.stones[TEAM_1][0].position.x = origin.x - stoneDimensions.diameter * 0.75;
        shot.stones[TEAM_1][0].position.y =
            origin.y +
            iceDimensions.hogLine +
            iceDimensions.hogToHog +
            meterToCentimeter(2) +
            stoneDimensions.diameter / 2;

        shot.stones[TEAM_1][1].position.x = origin.x - stoneDimensions.diameter / 2;
        shot.stones[TEAM_1][1].position.y =
            origin.y +
            iceDimensions.hogLine +
            iceDimensions.hogToHog +
            iceDimensions.hogLine -
            (iceDimensions.teeLine + iceDimensions.twelveFootRadius);

        shot.stones[TEAM_1][2].position.x = origin.x - stoneDimensions.diameter * 1.5;
        shot.stones[TEAM_1][2].position.y =
            origin.y +
            iceDimensions.hogLine +
            iceDimensions.hogToHog +
            iceDimensions.hogLine -
            (iceDimensions.teeLine - iceDimensions.fourFootRadius);

        shot.stones[TEAM_1][3].position.x = origin.x + iceDimensions.width / 2 - stoneDimensions.diameter / 2;
        shot.stones[TEAM_1][3].position.y = origin.y + iceDimensions.length - stoneDimensions.diameter / 2;

        shot.shooter = shot.stones[TEAM_0][4];

        thirdPersonCamera = new ThirdPersonCamera({
            camera: cameras[0],
            target: shot.shooter,
            converter: converter,
        });

        thirdPersonCamera.Update(0);

        const finish = new THREE.Vector3(0, 3800, 0);
        const clip = Animation.generate(origin, iceDimensions, finish);
        mixer = new THREE.AnimationMixer(shot.shooter);
        const clipAction = mixer.clipAction(clip);
        clipAction.play();

        animate();
        progressBar.value.style.display = "none";
        cameraBar.value.style.display = "block";
    };

    manager.itemStart("arena");
    ArenaModel.generate(manager).then((model) => {
        arena = model;
        dumpGeometry("arena", arena);

        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const context = canvas.getContext("2d");

        const replacement = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            name: "scoreboard",
        });

        arena.traverse((obj) => {
            if (obj.material && Array.isArray(obj.material)) {
                for (var n = 0; n < obj.material.length; ++n) {
                    if (obj.material[n].name === "scoreboard") {
                        console.log(obj);
                        //obj.material[n] = replacement;
                    }
                }
            }
        });

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
    ScoreboardModel.generate(scoreboardDimensions, teams).then((model) => {
        scoreboard = model;
        manager.itemEnd("scoreboard");
    });

    manager.itemStart("team 0 stones");
    StoneSet.generate(stoneDimensions, teams[TEAM_0].color).then((models) => {
        stones[TEAM_0] = models;

        manager.itemEnd("red stones");
    });

    manager.itemStart("team 1 stones");
    StoneSet.generate(stoneDimensions, teams[TEAM_1].color).then((models) => {
        stones[TEAM_1] = models;

        manager.itemEnd("yellow stones");
    });
});
</script>

<template>
    <div ref="progressBar">
        <div class="d-flex flex-column align-items-center justify-content-center">
            <label class="display-2 p-20" for="progress-bar">Get Ready to Rock</label>
            <div id="progress-bar" class="progress" aria-busy="true" style="width: 400px">
                <div ref="progressBarLoaded" class="progress-bar" role="progressbar"></div>
            </div>
            <div class="text-left text-dark">
                <strong>Completed {{ loaded }} of {{ loading }}.</strong>
            </div>
        </div>
    </div>
    <div ref="cameraBar" style="display: none">
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(0)">Rock Cam</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(1)">Near End</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(2)">Side</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(3)">Far End</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(4)">Skip Cam</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(5)">Ice Level</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(6)">Scoreboard</button>
        <button type="button" class="btn btn-sm btn-primary" @click="setCamera(7)">Nose Bleed</button>
    </div>
    <canvas ref="canvasElement" />
</template>

<style scoped>
button {
    margin: 10px;
}

canvas {
    pointer-events: all;
}

#c {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
