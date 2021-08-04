import * as THREE from "./libs/three.module.js";
import * as ORBIT from "./libs/OrbitControls.module.js";
import * as FPC from "./libs/FirstPersonControls.module.js";
import * as PLC from "./libs/PointerLockControls.module.js";
import {cControl, absoluteCoordinates, createCamera, createPointLight, createVenus, createBackground, createUranus, createSaturn, createSun, createNeptune, createMercury, createEarth, createMoon, createJupiter, createMars, createPlanetCenter, createLightDirectional, shadowProperties} from "./create.js";

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE PLANET PROPERTIES
///////////////////////////////////////////////////////////////////////////////////////	

//make all planets relative to earths radius(size), rotation(day), orbit(year)
const planetProp = {};

planetProp.sun = {radius: 30};
planetProp.earth = {radius: 1*9.5*0.1, rotation: 1/150, orbit: 1/365};//0.4 is min size
planetProp.earth.sunDist = 17.25 + planetProp.sun.radius; //change multiplacation to make solar system orbits smaller
planetProp.sun.rotation = planetProp.earth.rotation / 35;
planetProp.mercury = {radius: 0.383*9.5*0.1, sunDist: 5.1 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 58.8 , orbit: planetProp.earth.orbit / 0.241};
planetProp.venus = {radius: 0.949*9.5*0.1, sunDist: 12.25 + planetProp.sun.radius, rotation: planetProp.earth.rotation / -243 , orbit: planetProp.earth.orbit / 0.615};
planetProp.moon = {radius: 0.2724*planetProp.earth.radius, earthDist: planetProp.earth.radius + 0.5, orbit: planetProp.earth.orbit * 13.37};
planetProp.mars = {radius: 0.532*9.5*0.1, sunDist: 28.4 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 1.03, orbit: planetProp.earth.orbit / 1.88};
planetProp.jupiter = {radius: 11.21*9.5*0.1, sunDist: 85.5 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 0.415, orbit: planetProp.earth.orbit / 11.9};
planetProp.saturn = {radius: 9.45*9.5*0.1, sunDist: 167 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 0.445, orbit: planetProp.earth.orbit / 29.4};
planetProp.uranus = {radius: 4.01*9.5*0.1, sunDist: 335.5 + planetProp.sun.radius, rotation: planetProp.earth.rotation / -0.72, orbit: planetProp.earth.orbit / 83.7};
planetProp.neptune = {radius: 3.88*9.5*0.1, sunDist: 500 + planetProp.sun.radius, rotation: planetProp.earth.rotation /0.673 , orbit: planetProp.earth.orbit / 163.7};
//uranus +335.5

//CREATE SCENE
const scene = new THREE.Scene();

//CREATE RENDERER
const renderer = new THREE.WebGLRenderer(); //choose renderer webGL
renderer.setSize( window.innerWidth, window.innerHeight ); // set size of rendered window
renderer.shadowMap.enabled = true; //active the shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // choose the type of algorithm that calculates the shadows
document.body.appendChild( renderer.domElement ); //add everything to html doc for display

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE PLANETS
///////////////////////////////////////////////////////////////////////////////////////	
//SUN
var sun = createSun(0, planetProp.sun.radius);
scene.add(sun);

//CREATE EARTH
var earth = createEarth(planetProp.earth.sunDist, planetProp.earth.radius);
var earthContainer = new THREE.Object3D();
earthContainer.add(earth);
scene.add(earthContainer);

//CREATE MOON
var moonContainer = new THREE.Object3D();
var moon = createMoon(planetProp.moon.earthDist, planetProp.moon.radius);
moonContainer.add(moon);
earth.add(moonContainer);

//JUPITER
var jupiter = createJupiter(planetProp.jupiter.sunDist, planetProp.jupiter.radius);
var jupiterContainer = new THREE.Object3D();
jupiterContainer.add(jupiter);
scene.add(jupiterContainer);

//MARS
var mars = createMars(planetProp.mars.sunDist, planetProp.mars.radius);
var marsContainer = new THREE.Object3D();
marsContainer.add(mars);
scene.add(marsContainer);

//MERCURY
var mercury = createMercury(planetProp.mercury.sunDist, planetProp.mercury.radius);
var mercuryContainer = new THREE.Object3D();
mercuryContainer.add(mercury);
scene.add(mercuryContainer);

//NEPTUNE
var neptune = createNeptune(planetProp.neptune.sunDist, planetProp.neptune.radius);
var neptuneContainer = new THREE.Object3D();
neptuneContainer.add(neptune);
scene.add(neptuneContainer);

//SATURN
var saturn = createSaturn(planetProp.saturn.sunDist, planetProp.saturn.radius);
var saturnContainer = new THREE.Object3D();
saturnContainer.add(saturn);
scene.add(saturnContainer);

//URANUS
var uranus = createUranus(planetProp.uranus.sunDist, planetProp.uranus.radius);
var uranusContainter = new THREE.Object3D();
uranusContainter.add(uranus);
scene.add(uranusContainter);

//VENUS
var venus = createVenus(planetProp.venus.sunDist, planetProp.venus.radius);
var venusContainer = new THREE.Object3D();
venusContainer.add(venus);
scene.add(venusContainer);

//RANDOM PLANETARY POSITION
earthContainer.rotation.y = Math.random() * 8 - 4; //earth
moonContainer.rotation.y = Math.random() * 8 - 4; //moon
mercuryContainer.rotation.y = Math.random() * 8 - 4; //mercury
venusContainer.rotation.y = Math.random() * 8 - 4; //venus
marsContainer.rotation.y = Math.random() * 8 - 4; //mars
jupiterContainer.rotation.y = Math.random() * 8 - 4; //jupiter
saturnContainer.rotation.y = Math.random() * 8 - 4; //saturn
uranusContainter.rotation.y = Math.random() * 8 - 4; //uranus
neptuneContainer.rotation.y = Math.random() * 8 - 4; //neptun

//SPACE BACKGROUND
var space = createBackground(1000);
scene.add(space);

/* var boyGeom = new THREE.BoxGeometry(1000, 10, 1000);
var box = new THREE.Mesh(boyGeom);
scene.add(box); */
////////////////////////////////////////////////////////////////////////////////////////
//////CREATE CAMERA
///////////////////////////////////////////////////////////////////////////////////////		
//SUN CAM
//create camera
/* const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set(-200, 200, 0); //positions camera of x,y,z
camera.lookAt(0, 0, 0); //defines where its pointing to x,y,z
//add camera controls orbit
const cameraControl = new ORBIT.OrbitControls(camera, renderer.domElement); //specify you want to control camera and the HTMLDOMElement used for event listener
cameraControl.target.set(0, 0, 0); //around which point you should orbit
cameraControl.update();//must be added after any camera transformations!!! */

//GENERAL
var planets = ["sun", "mercury", "venus", "earth", "moon", "mars", "jupiter", "saturn", "uranus", "neptune"];
var planetsObj = [sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune];
var index = 1;
var targetP = absoluteCoordinates(planetsObj[index]); //get planets global position
const camera = createCamera(targetP, (planetProp[planets[index]].radius * 2));
planetsObj[index].add(camera);
const cameraControl = cControl(camera, renderer.domElement, targetP);

//EART CAM
/* var targetP = new THREE.Vector3();//to save earth global position
earth.getWorldPosition(targetP); */
//create camera
/* const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set(targetP.x + 10, targetP.y + 10, targetP.z);
//camera.lookAt(targetP);
earth.add(camera);
console.log(camera); */
//add camera controls orbit
/* const cameraControl = new ORBIT.OrbitControls(camera, renderer.domElement);
cameraControl.target = targetP; */

cameraControl.update();//must be added after any camera transformations!!!




////////////////////////////////////////////////////////////////////////////////////////
//////CREATE LIGHTS
///////////////////////////////////////////////////////////////////////////////////////		
//ADD SUN POINT LIGHT
var sunLight = createPointLight();
scene.add(sunLight);

//LIGHT AMBIENT
const lightA = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(lightA);

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE EVENTS
///////////////////////////////////////////////////////////////////////////////////////		


var clock = new THREE.Clock();
const animate = function () {
    requestAnimationFrame( animate );

    //ROTATE ALL PLANETS
    earth.rotation.y += planetProp.earth.rotation;
    moonContainer.rotation.y -= planetProp.earth.rotation; // counter the moon from orbiting by rotating the earth
    sun.rotation.y += planetProp.sun.rotation;
    venus.rotation.y += planetProp.venus.rotation;
    mercury.rotation.y += planetProp.mercury.rotation;
    mars.rotation.y += planetProp.mars.rotation;
    jupiter.rotation.y += planetProp.jupiter.rotation;
    saturn.rotation.y += planetProp.saturn.rotation;
    uranus.rotation.y += planetProp.uranus.rotation;
    neptune.rotation.y += planetProp.neptune.rotation;

    //ORBIT ALL PLANETS
    earthContainer.rotation.y += planetProp.earth.orbit; //earth
    moonContainer.rotation.y += planetProp.moon.orbit; //moon
    mercuryContainer.rotation.y += planetProp.mercury.orbit; //mercury
    venusContainer.rotation.y += planetProp.venus.orbit; //venus
    marsContainer.rotation.y += planetProp.mars.orbit; //mars
    jupiterContainer.rotation.y += planetProp.jupiter.orbit; //jupiter
    saturnContainer.rotation.y += planetProp.saturn.orbit; //saturn
    uranusContainter.rotation.y += planetProp.uranus.orbit; //uranus
    neptuneContainer.rotation.y += planetProp.neptune.orbit; //neptune

    //ROTATE EARTH AND VENUS ATMOSPHERE
    earth.children[0].rotation.y -= planetProp.earth.rotation - 1/50; //rotate clouds on earth

    //CAMERA CONTROLS
    planetsObj[index].getWorldPosition(targetP);//earth coordinates
    cameraControl.update();
    camera.updateProjectionMatrix();
 


    renderer.render(scene, camera );
};

animate();