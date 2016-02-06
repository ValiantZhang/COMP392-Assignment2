/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
//Custom Game Objectsclear
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var sphereMaterial;
var cubeMaterial;
var sunMaterial;
var vegetaMat;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var config;
var colorConfig;
var colorPicker;
/*var shirtTexture = THREE.ImageUtils.loadTexture( "../../Assets/Textures/plaid.jpg" );*/
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    console.log("Added Fog to scene...");
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    /*//Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");*/
    config = function () { this.color = "#000000"; };
    colorConfig = new config();
    //Add a Sphere (sun)
    sphere = new SphereGeometry(4, 10, 50);
    sunMaterial = new LambertMaterial({ color: '0xFBFBEF' });
    sphere = new Mesh(sphere, sunMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;
    scene.add(sphere);
    //Add a Sphere (Planet Vegeta)
    sphere = new SphereGeometry(5, 40, 40);
    vegetaMat = new LambertMaterial({ color: '0xFBFBEF' });
    /*sphereMaterial = new LambertMaterial({ map: shirtTexture });*/
    sphere = new Mesh(sphere, vegetaMat);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 10;
    sphere.position.z = 0;
    scene.add(sphere);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-20, -30, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.0, 0.0, 0.0);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedX', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedY', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', -0.5, 0.5);
    /*    colorPicker = gui.addColor( colorConfig, 'color').onChange(
            function(getColor){
    
            });*/
    //gui.add(controlObject, 'addCube');
    //gui.add(controlObject, 'removeCube');
    //gui.add(controlObject, 'outputObjects');
    //gui.add(controlObject, 'numberOfObjects').listen();
}
/*function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}*/
// Setup main game loop
function gameLoop() {
    stats.update();
    /*    scene.traverse(function(threeObject:THREE.Object3D) {
            if (threeObject == placeholder) {
                threeObject.rotation.x += control.rotationSpeedX;
                threeObject.rotation.y += control.rotationSpeedY;
                threeObject.rotation.z += control.rotationSpeedZ;
        });*/
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 2;
    camera.position.z = 10;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
