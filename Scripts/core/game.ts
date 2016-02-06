/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var sphereMaterial : MeshLambertMaterial;
var cubeMaterial : MeshLambertMaterial;
var sunMaterial : MeshLambertMaterial;
var vegetaMat : MeshLambertMaterial;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
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
    scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
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
    
    config = function(){this.color = "#000000";}
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
    sphere.position.y = 10;nvm
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

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {
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
function gameLoop(): void {
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
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 2;
    camera.position.z = 10;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
