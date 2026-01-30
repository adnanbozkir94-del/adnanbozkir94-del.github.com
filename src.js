// Basit Babylon.js tabanlı 3D araba oyunu başlangıcı
import * as BABYLON from 'https://cdn.babylonjs.com/babylon.module.js';

const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  // Light
  const light = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.9;

  // Ground
  const ground = BABYLON.MeshBuilder.CreateGround('ground', {width: 200, height: 200}, scene);
  const groundMat = new BABYLON.StandardMaterial('gMat', scene);
  groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.2);
  ground.material = groundMat;

  // Simple "car" (box)
  const car = BABYLON.MeshBuilder.CreateBox('car', {height: 1, width: 2, depth: 4}, scene);
  car.position.y = 0.6;
  car.position.z = 0;

  const carMat = new BABYLON.StandardMaterial('carMat', scene);
  carMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
  car.material = carMat;

  // Wheels (visual)
  const wheelParams = {diameter: 0.6, thickness: 0.4};
  const wheelBL = BABYLON.MeshBuilder.CreateCylinder('wl1', wheelParams, scene);
  const wheelBR = wheelBL.createInstance('wl2');
  const wheelFL = wheelBL.createInstance('wl3');
  const wheelFR = wheelBL.createInstance('wl4');
  [wheelBL, wheelBR, wheelFL, wheelFR].forEach((w) => {
    w.rotation.z = Math.PI / 2;
    w.parent = car;
    w.material = new BABYLON.StandardMaterial('wMat', scene);
    w.material.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.05);
  });
  wheelBL.position.set(-0.9, -0.35, 1.2);
  wheelBR.position.set(0.9, -0.35, 1.2);
  wheelFL.position.set(-0.9, -0.35, -1.2);
  wheelFR.position.set(0.9, -0.35, -1.2);

  // Follow camera
  const camera = new BABYLON.FollowCamera('followCam', new BABYLON.Vector3(0, 5, -10), scene);
  camera.lockedTarget = car;
  camera.radius = 10; // uzaklık
  camera.heightOffset = 3;
  camera.rotationOffset = 0;
  camera.cameraAcceleration = 0.05;
  camera.maxCameraSpeed = 20;

  // Controls
  const keys = { forward: false, back: false, left: false, right: false };
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.forward = true;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.back = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp' || e.code === 'KeyW') keys.forward = false;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.back = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
  });

  // Simple physics-like movement (konfor amaçlı)
  let speed = 0;
  const maxSpeed = 0.3;
  const accel = 0.02;
  const brake = 0.03;
  const turnSpeed = 0.03;

  scene.onBeforeRenderObservable.add(() => {
    // Acceleration / braking
    if (keys.forward) speed = Math.min(maxSpeed, speed + accel);
    else if (keys.back) speed = Math.max(-maxSpeed/2, speed - accel);
    else {
      // natural slowdown
      if (speed > 0) speed = Math.max(0, speed - brake/2);
      if (speed < 0) speed = Math.min(0, speed + brake/2);
    }

    // Turning (affects rotation when moving)
    if (keys.left && Math.abs(speed) > 0.001) car.rotation.y += turnSpeed * (speed > 0 ? 1 : -1);
    if (keys.right && Math.abs(speed) > 0.001) car.rotation.y -= turnSpeed * (speed > 0 ? 1 : -1);

    // Translate forward based on current rotation
    const forward = new BABYLON.Vector3(
      Math.sin(car.rotation.y) * speed,
      0,
      Math.cos(car.rotation.y) * speed * -1
    );
    car.position.addInPlace(forward);

    // Rotate wheels visually
    const wheelRotation = speed * 5;
    [wheelBL, wheelBR, wheelFL, wheelFR].forEach(w => w.rotation.x += wheelRotation);
  });

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
