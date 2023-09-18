import * as THREE from "three";

const setupCameras = (origin, center, iceDimensions, converter) => {
    const cameras = [];

    const shooterCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const nearCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const sideCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const farCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const iceLevelCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const skipCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const scoreboardCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, converter(100));
    const noseBleedCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, converter(100));
    
    cameras.push(shooterCamera);
    cameras.push(nearCamera);
    cameras.push(sideCamera);
    cameras.push(farCamera);
    cameras.push(skipCamera);
    cameras.push(iceLevelCamera);
    cameras.push(scoreboardCamera);
    cameras.push(noseBleedCamera);

    shooterCamera.position.set(origin.x, origin.y - converter(1), origin.z + converter(2));
    shooterCamera.lookAt(origin.x, origin.y + converter(20), origin.z);

    nearCamera.position.set(origin.x, origin.y - converter(5), origin.z + converter(6));
    nearCamera.lookAt(origin.x, origin.y, origin.z + converter(6));

    sideCamera.position.set(
        origin.x + converter(18),
        center.y,
        origin.z + converter(5)
    );
    sideCamera.lookAt(center.x, center.y, origin.z);
    sideCamera.rotateZ(Math.PI / 2);

    farCamera.position.set(origin.x, origin.y + converter(50), origin.z + converter(6));
    farCamera.lookAt(
        origin.x,
        origin.y + iceDimensions.hogLine + iceDimensions.hogToHog,
        origin.z - converter(6)
    );
    farCamera.rotateZ(Math.PI);

    skipCamera.position.set(
        origin.x,
        origin.y + iceDimensions.hogLine + iceDimensions.hogToHog + iceDimensions.hogLine - iceDimensions.backLine,
        origin.z + converter(2)
    );
    skipCamera.lookAt(origin.x, origin.y + iceDimensions.hogLine + iceDimensions.hogToHog, origin.z - converter(1));
    skipCamera.rotateZ(Math.PI);

    iceLevelCamera.position.set(origin.x, origin.y + iceDimensions.hogLine + iceDimensions.hogToHog, origin.z + 1);
    iceLevelCamera.lookAt(origin.x, origin.y + iceDimensions.length, origin.z);

    scoreboardCamera.position.set(
        origin.x,
        origin.y + iceDimensions.length - iceDimensions.backLine,
        origin.z + converter(1)
    );
    scoreboardCamera.lookAt(origin.x, origin.y + iceDimensions.length, origin.z);

    noseBleedCamera.position.set(
        origin.x + converter(40),
        origin.y + iceDimensions.length / 2,
        origin.z + converter(20)
    );
    noseBleedCamera.lookAt(origin.x, origin.y + iceDimensions.length / 2, origin.z + converter(1));
    noseBleedCamera.rotateZ(Math.PI / 2);

    return cameras;
}
export { setupCameras };
