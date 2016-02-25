/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var SphereGeometry = THREE.SphereGeometry;
var RingGeometry = THREE.TorusGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var sphere;
var plane;
//Planets
var planetVegeta;
var planetNamek;
var planetKai;
var planetHera;
var planetFrieza;
var moon79;
var planetFriezaPivot;
//Meshes
var sphere;
var sphereMaterial;
var sphereMaterial;
var sunMaterial;
var vegetaMaterial;
var namekMaterial;
var kaiMaterial;
var heraMaterial;
var heraRingMaterial;
var friezaMaterial;
var moon79Material;
//var shirtTexture = THREE.ImageUtils.loadTexture( "../../Assets/Textures/plaid.jpg" );
//Lights
var ambientLight;
var spotLight;
//Controls
var control;
var gui;
var stats;
var step = 0;
var config;
var colorConfig;
var colorPicker;
var isFollowingMoonPlanet = false;
var focusVector = new THREE.Vector3();
var cameraControls;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    /*    scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
        console.log("Added Fog to scene...");*/
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    //Add a Plane to the Scene
    /*    plane = new gameObject(
            new PlaneGeometry(60, 40, 1, 1),
            new LambertMaterial({ color: 0xffffff }),
            0, 0, 0);
    
        plane.rotation.x = -0.5 * Math.PI;
    
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");*/
    config = function () { this.color = "#000000"; };
    colorConfig = new config();
    planetFriezaPivot = new THREE.Object3D();
    planetVegeta = new THREE.Object3D();
    planetNamek = new THREE.Object3D();
    planetHera = new THREE.Object3D();
    planetHeraRing = new THREE.Object3D();
    planetKai = new THREE.Object3D();
    planetFrieza = new THREE.Object3D();
    moon79 = new THREE.Object3D();
    //Add a Sphere (sun)
    sun = new SphereGeometry(5, 50, 50);
    sunMaterial = new LambertMaterial({ color: 0xffff66, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/gas.png") });
    sun = new Mesh(sun, sunMaterial);
    sun.castShadow = true;
    sun.position.x = 0;
    sun.position.y = 0;
    sun.position.z = 0;
    //Add Light to the Sun
    pointLight = new PointLight(0xffff00, 10.0, 100);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    sun.add(pointLight);
    scene.add(sun);
    //Add a Sphere (planet vegeta)
    vegeta = new SphereGeometry(3, 10, 10);
    vegetaMaterial = new LambertMaterial({ color: 0xBADAEB, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/metal.jpg") });
    vegeta = new Mesh(vegeta, vegetaMaterial);
    vegeta.castShadow = true;
    vegeta.position.x = 0;
    vegeta.position.y = 10;
    vegeta.position.z = 50;
    planetVegeta.add(vegeta);
    scene.add(planetVegeta);
    //Add a Sphere (planet namek)
    namek = new SphereGeometry(4, 16, 16);
    namekMaterial = new LambertMaterial({ color: 0x3ADF00, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/forest.jpg") });
    namek = new Mesh(namek, namekMaterial);
    namek.castShadow = true;
    namek.position.x = 0;
    namek.position.y = 5;
    namek.position.z = 15;
    planetNamek.add(namek);
    scene.add(planetNamek);
    //Add a Sphere (kai's planet)
    kai = new SphereGeometry(2, 5, 5);
    kaiMaterial = new LambertMaterial({ color: 0xF7FE2E, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/fluffy.jpg") });
    kai = new Mesh(kai, kaiMaterial);
    kai.castShadow = true;
    kai.position.x = 0;
    kai.position.y = -25;
    kai.position.z = 25;
    planetKai.add(kai);
    scene.add(planetKai);
    //Add a Sphere (planet hera)
    hera = new SphereGeometry(2, 5, 5);
    heraMaterial = new LambertMaterial({ color: 0xFE2E64, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/bones.jpg") });
    hera = new Mesh(hera, heraMaterial);
    hera.castShadow = true;
    hera.position.x = 0;
    hera.position.y = 0;
    hera.position.z = 40;
    planetHera.add(hera);
    //Add Hera's Ring
    heraRing = new RingGeometry(4, 0.7, 2, 30);
    heraRingMaterial = new LambertMaterial({ color: 0xFE2E64, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/asteroidBelt.jpg") });
    heraRing = new Mesh(heraRing, heraRingMaterial);
    heraRing.castShadow = true;
    heraRing.rotation.x = 90;
    heraRing.position.z = 40;
    planetHeraRing.add(heraRing);
    planetHera.add(planetHeraRing);
    scene.add(planetHera);
    //Add a Sphere (planet frieza)
    frieza = new SphereGeometry(4, 8, 8);
    friezaMaterial = new LambertMaterial({ color: 0x5882FA, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/ice.jpg") });
    frieza = new Mesh(frieza, friezaMaterial);
    frieza.castShadow = true;
    planetFrieza.position.x = 0;
    planetFrieza.position.y = 0;
    planetFrieza.position.z = 30;
    planetFrieza.add(frieza);
    planetFriezaPivot.add(planetFrieza);
    scene.add(planetFriezaPivot);
    //Add a Sphere (frieza's moon)
    fmoon79 = new SphereGeometry(1, 10, 10);
    moon79Material = new LambertMaterial({ color: 0xF8E0E0, map: THREE.ImageUtils.loadTexture("../../Assets/Textures/Planets/foam.jpg") });
    fmoon79 = new Mesh(fmoon79, moon79Material);
    fmoon79.castShadow = true;
    fmoon79.position.x = 0;
    fmoon79.position.y = 0;
    fmoon79.position.z = 7;
    moon79.add(fmoon79);
    planetFrieza.add(moon79);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    // add controls
    gui = new GUI();
    control = new Control(0.0, 0.0, 0.0);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    // render the scene	
    gameLoop();
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'focusMoon');
    gui.add(controlObject, 'viewSolarSystem');
    //gui.add(controlObject, 'removesphere');
    //gui.add(controlObject, 'outputObjects');
    //gui.add(controlObject, 'numberOfObjects').listen();
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    cameraControls.update();
    planetVegeta.rotation.y += 0.01;
    planetVegeta.rotation.z -= 0.002;
    planetKai.rotation.y += 0.008;
    planetKai.rotation.z += 0.01;
    planetHera.rotation.y += 0.004;
    heraRing.rotation.z += 0.1;
    planetNamek.rotation.y += 0.007;
    planetNamek.rotation.z += 0.007;
    planetFrieza.rotation.y += 0.009;
    planetFriezaPivot.rotation.y += 0.005;
    //update position for camera tracking
    scene.updateMatrixWorld();
    focusVector.setFromMatrixPosition(planetFrieza.matrixWorld);
    //boolean for following planet w/ moon, prob do a dropdown later for tracking other planets
    if (isFollowingMoonPlanet == true) {
        camera.lookAt(focusVector);
    }
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -70;
    camera.position.y = 2;
    camera.position.z = 2;
    camera.lookAt(scene.position);
    cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
    console.log("Finished setting up Camera...");
}
