/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import sphereGeometry = THREE.sphereGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import RingGeometry = THREE.TorusGeometry;
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
import CameraController = THREE.TrackballControls;

//Custom Game Objects
import gameObject = objects.gameObject;
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var sphere: Mesh;
var plane: Mesh;

//Planets
var planetVegeta;
var planetNamek;
var planetKai;
var planetHera;
var planetFrieza;
var moon79;
var planetFriezaPivot;

//Meshes
var sphere: Mesh;
var sphereMaterial : MeshLambertMaterial;
var sphereMaterial : MeshLambertMaterial;
var sunMaterial : MeshLambertMaterial;
var vegetaMaterial : MeshLambertMaterial;
var namekMaterial : MeshLambertMaterial;
var kaiMaterial : MeshLambertMaterial;
var heraMaterial : MeshLambertMaterial;
var heraRingMaterial : MeshLambertMaterial;
var friezaMaterial : MeshLambertMaterial;
var moon79Material : MeshLambertMaterial;
var shirtTexture = THREE.ImageUtils.loadTexture( "../../Assets/Textures/plaid.jpg" );

//Lights
var ambientLight: AmbientLight;
var spotLight: SpotLight;

//Controls
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var config;
var colorConfig;
var colorPicker;
var isFollowingMoonPlanet: false;
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
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
/*    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");*/
    
    config = function(){this.color = "#000000";}
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
    sunMaterial = new LambertMaterial({  color: 0xffff00, emissive: 0x808000  });
    sun = new Mesh(sun, sunMaterial);
    sun.castShadow = true;
    sun.position.x = 0;
    sun.position.y = 0;
    sun.position.z = 0;
    
    //Add Light to the Sun
    pointLight = new PointLight(0xffff00, 1.0, 100);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    sun.add(pointLight);
    
    scene.add(sun);
    
    
/*    //Add a Sphere ()
    sphere = new SphereGeometry(5, 10, 10);
    sphereMaterial = new LambertMaterial({ color: 0x000000 });
    sphere = new Mesh(sphere, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 0;
    sphere.position.y = 30;
    sphere.position.z = 0;
    scene.add(sphere);*/
    
    //Add a Sphere (planet vegeta)
    vegeta = new SphereGeometry(3, 10, 10);
    vegetaMaterial = new LambertMaterial({ color: 0x0B2161, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/metal.jpg" });
    vegeta = new Mesh(vegeta, vegetaMaterial);
    vegeta.castShadow = true;
    vegeta.position.x = 0;
    vegeta.position.y = 10;
    vegeta.position.z = 50;
    planetVegeta.add(vegeta);
    scene.add(planetVegeta);
    
    //Add a Sphere (planet namek)
    namek = new SphereGeometry(4, 16, 16);
    namekMaterial = new LambertMaterial({ color: 0x3ADF00, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/forest.jpg" });
    namek = new Mesh(namek, namekMaterial);
    namek.castShadow = true;
    namek.position.x = 0;
    namek.position.y = 5;
    namek.position.z = 15;
    planetNamek.add(namek);
    scene.add(planetNamek);
    
    //Add a Sphere (kai's planet)
    kai = new SphereGeometry(2, 5, 5);
    kaiMaterial = new LambertMaterial({ color: 0xF7FE2E, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/fluffy.jpg" });
    kai = new Mesh(kai, kaiMaterial);
    kai.castShadow = true;
    kai.position.x = 0;
    kai.position.y = -25;
    kai.position.z = 25;
    planetKai.add(kai);
    scene.add(planetKai);
    
    //Add a Sphere (planet hera)
    hera = new SphereGeometry(2, 5, 5);
    heraMaterial = new LambertMaterial({ color: 0xFE2E64, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/bones.jpg" ) });
    hera = new Mesh(hera, heraMaterial);
    hera.castShadow = true;
    hera.position.x = 0;
    hera.position.y = 0;
    hera.position.z = 40;
    planetHera.add(hera);
    
    //Add Hera's Ring
    heraRing = new RingGeometry(4, 0.7, 2, 30);
    heraRingMaterial = new LambertMaterial({color: 0xFE2E64, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/asteroidBelt.jpg" )});
    heraRing = new Mesh(heraRing, heraRingMaterial);
    heraRing.castShadow = true;
    heraRing.rotation.x = 90;
    heraRing.position.z = 40;
    
    planetHeraRing.add(heraRing);
    planetHera.add(planetHeraRing);
    
    scene.add(planetHera);
    
    
    //Add a Sphere (planet frieza)
    frieza = new SphereGeometry(4, 8, 8);
    friezaMaterial = new LambertMaterial({ color: 0x5882FA, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/ice.jpg" ) });
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
    moon79Material = new LambertMaterial({ color: 0xF8E0E0, map:THREE.ImageUtils.loadTexture( "../../Assets/Textures/Planets/foam.jpg" ) });
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
    console.log("Added an Ambient Light to Scene");
	
/*    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff, 1.0, Math.PI/3);
    spotLight.position.set(-500, 0, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");*/
    
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

/*    colorPicker = gui.addColor( colorConfig, 'color').onChange(
        function(getColor){
            //getColor=getColor.replace( '#','0x' );
            sunMaterial.color =  new THREE.Color(getColor);
            vegetaMaterial.color = new THREE.Color(getColor);
            namekMaterial.color = new THREE.Color(getColor);
            kaiMaterial.color =  new THREE.Color(getColor);
            heraMaterial.color = new THREE.Color(getColor);
            friezaMaterial.color =  new THREE.Color(getColor);
            moon79Material.color = new THREE.Color(getColor);
            leftFootMaterial.color =  new THREE.Color(getColor);
            rightFootMaterial.color = new THREE.Color(getColor);
            console.log(getColor);
        });*/

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
function gameLoop(): void {
    stats.update();
    cameraControls.update();
    
/*   scene.traverse(function(threeObject:THREE.Object3D) {
        if (threeObject == blobbyBoy) {
            threeObject.rotation.x += control.rotationSpeedX;
            threeObject.rotation.y += control.rotationSpeedY;
            threeObject.rotation.z += control.rotationSpeedZ;
    });*/
    
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
    
    scene.updateMatrixWorld();
    focusVector.setFromMatrixPosition( planetFrieza.matrixWorld );
    
    if (isFollowingMoonPlanet == true){
        camera.lookAt(focusVector);
    }
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -70;
    camera.position.y = 2;
    camera.position.z = 2;
    camera.lookAt(scene.position);
    cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
    cameraControls.target.set(0,0,0);
    console.log("Finished setting up Camera...");
}
