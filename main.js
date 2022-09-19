import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/SMAAPass.js';
import { GUI } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/libs/lil-gui.module.min.js';
// import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js';
import { LoadingManager } from 'https://cdn.skypack.dev/three@0.136/src/loaders/LoadingManager.js';
import { OutlinePass } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/OutlinePass.js';

// Audio Play
const playingaudio = new Audio();
playingaudio.src = 'Audio/main-music.mp3'
playingaudio.loop = true
playingaudio.volume = 1

const menuaudio = new Audio();
menuaudio.src = 'Audio/low_bass_audio.mp3'
menuaudio.loop = true
menuaudio.volume = 0

const audiobtn = document.querySelector('.audio-icon')
const audioicon = document.querySelector('.audio-icon i')


let clickcount = 1;

audiobtn.addEventListener('click', () =>{

    if(clickcount == 1){
        playingaudio.volume = 0;
        menuaudio.volume = 0
     audioicon.classList = 'bi bi-volume-mute';
     clickcount = 0;
    }

    else {
        playingaudio.volume = 1;
        menuaudio.volume = 1
        audioicon.classList = 'bi bi-volume-up-fill'
        clickcount = 1;
    }
     
})

// Menu Logic 

const menubtn = document.querySelector('.menu-btn')
const menuclosebtn = document.querySelector('.menu-close-btn')

menubtn.addEventListener('click', () =>{


   document.querySelector('.menu').classList.toggle('open-menu')

    anime({
        targets: playingaudio,
        volume: [1,0],
        easing: 'easeInOutSine'
    })

    anime({
        targets: menuaudio,
        volume: [0,1],
        easing: 'easeInOutSine'
    })

  anime({
    targets: '.menu-items h1',
    translateY: ['45px','0px'],
    filter: ['blur(20px)','blur(0px)'],
    opacity: [0,1],
    delay: function(el,i){
      return (i * 100) + 150
    },
    easing: 'easeInOutCubic'
  })
  
})

menuclosebtn.addEventListener('click', () =>{
   document.querySelector('.menu').classList.toggle('open-menu')

   anime({
    targets: playingaudio,
    volume: [0,1],
    easing: 'easeInOutSine'
})

anime({
    targets: menuaudio,
    volume: [1,0],
    easing: 'easeInOutSine'
})

} )

document.querySelector('.trailer-player-close').addEventListener('click', () =>{
    document.querySelector('.play-trailer-modal').style.display = 'none'
})

document.querySelector('.play-trailer-btn').addEventListener('click', () =>{
    document.querySelector('.play-trailer-modal').style.display = 'grid'

})

// Camera reset logic

const camera_resetbtn = document.querySelector('.reset-camera-btn')

document.addEventListener('mousedown', () =>{
    console.log(camera.position)
     if(camera.position.x > 275 || camera.position.x < -290){
       // cameraControls.fitToSphere( boundingsphere, false )
     

        cameraControls.fitToBox( boundingsphere, false  )
     }

     

    else if(camera.position.z >300 || camera.position.z < -300){
       
       // cameraControls.fitToSphere( boundingsphere, false )
        cameraControls.fitToBox( boundingsphere, false)
        
    }

    else if(camera.position.z >230 || camera.position.z < -235){
        anime({
            targets: fadevalue,
            value: [fadevalue.value,1],
            ease: 'easeInOutSine',
            duration: 2000,
            complete: function(){
                anime({
                    targets: fadevalue,
                    value: [fadevalue.value,0],
                    ease: 'easeInOutSine',
                    duration: 1000,
                    delay: 1200
                   })
            },
            delay:100
           })
    }

    else if(camera.position.x > 220 || camera.position.x < -220){
        anime({
            targets: fadevalue,
            value: [fadevalue.value,1],
            ease: 'easeInOutSine',
            duration: 2000,
            complete: function(){
                anime({
                    targets: fadevalue,
                    value: [fadevalue.value,0],
                    ease: 'easeInOutSine',
                    duration: 1000,
                    delay: 1200
                   })
            },
            delay:100
           })
        
    }


 
})

camera_resetbtn.addEventListener('click', () =>{
     cameraControls.setPosition( -16, 120, 140,true)
})

// cameraControls.fitToSphere( sphereOrMesh, enableTransition )

// Modal logic

const newmodal = document.querySelector('.new-modal')
const modalclosebtn = document.querySelector('.modal-close-btn')

modalclosebtn.addEventListener('click', () =>{
     newmodal.classList.remove('active-modal')
})

document.querySelector('.profile-link').addEventListener('click', () =>{
    newmodal.classList.add('active-modal')

})
//  Enter City

document.querySelector('.Enter-btn').addEventListener('click', () =>{
   playingaudio.play()
    menuaudio.play()

    anime({
        targets: '.preloader',
        translateX: '-120%',
        filter: ['blur(0px)','blur(30px)'],
        easing: 'easeInOutCubic',
        delay: 200,
    })                 
})


CameraControls.install( { THREE: THREE } );

let mixer,outlinePass;
let selectedObjects = [];

             // Scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color('#4E005B')
         
             // Camera
 			const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.001, 15000 );
            camera.position.set(0,150,240)

            // Renderer
			const renderer = new THREE.WebGLRenderer({
                antialias: true,
                logarithmicDepthBuffer: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            renderer.setPixelRatio( window.devicePixelRatio / 1.4);




// Camera Controls

const cameraState = {
    mousePos: new THREE.Vector2(0, 0),
    virtualMousePos: new THREE.Vector2(0, 0),
    cameraAngle: [
        new THREE.Vector3(250, 145, 0),
        new THREE.Vector3(250, 145, 0),
        new THREE.Vector3(200, 145, 0),
        new THREE.Vector3(200, 100, 0),
        new THREE.Vector3(200, 100, 0),
        new THREE.Vector3(200, 100, 0),
        new THREE.Vector3(130, 50, 0),
        new THREE.Vector3(100, 40, 0),
        new THREE.Vector3(60, 30, 0),
    ],
    cameraMethod: 5,
    isClicked: false,
    targetPos: new THREE.Vector3(0, 0, 0),
    isTargetMoving: false,
};
const yAxis = new THREE.Vector3(0, 1, 0);
const xAxis = new THREE.Vector3(1, 0, 0);
const basePlane = new THREE.Plane(yAxis, 0);

const cameraControls = new CameraControls( camera, renderer.domElement );
cameraControls.verticalDragToForward = true;
cameraControls.dollyToCursor = true;
// cameraControls.boundaryEnclosesCamera = true

// const bb = new THREE.Box3(
//     new THREE.Vector3( -195.0, 35.0, -200.0 ),
//     new THREE.Vector3( 180.0, 180.0, 350.0 )
// );
// cameraControls.setBoundary( bb );


cameraControls.maxPolarAngle = (Math.PI * 0.5) - 0.25;
cameraControls.minPolarAngle = (Math.PI * 0.5) - 0.3;
cameraControls.minDistance = 400;
cameraControls.maxDistance = 1000;
cameraControls.maxZoom = 100;
cameraControls.minZoom = 100;

document.addEventListener('wheel', e => {
    if (e.deltaY < 0) {
        
            console.log(Math.min(cameraState.cameraMethod + 3, cameraState.cameraAngle.length - 1))
            cameraState.cameraMethod = Math.min(cameraState.cameraMethod + 3, cameraState.cameraAngle.length - 1);
        
      
    } else {
        cameraState.cameraMethod = Math.max(cameraState.cameraMethod -3, 0);
        console.log('else ' + Math.max(cameraState.cameraMethod - 3, 0))
    }
})
document.querySelector('canvas').addEventListener('mousedown', e => {
    cameraState.isClicked = true;
    cameraState.mousePos.setX(e.pageX);   cameraState.mousePos.setY(e.pageY);
    cameraState.targetPos = cameraControls.getTarget();
    cameraState.virtualMousePos.setX(e.pageX);   cameraState.virtualMousePos.setY(e.pageY);

    
	//calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( allobjs);

    for ( let i = 0; i < intersects.length; i ++ ) {
        

            cameraState.cameraMethod = 8;
            cameraState.isTargetMoving = true;
            cameraState.targetPos = intersects[0].point.clone().setY(0);
        
    }

    if(intersects[0].object){
         newmodal.classList.add('active-modal')
    }

    
})
const mouseMoveHandler = e => {
    if (!cameraState.isClicked) {
        e.preventDefault();
        return;
    }
    cameraState.mousePos.setX(e.pageX);   cameraState.mousePos.setY(e.pageY);
}
document.querySelector('canvas').addEventListener('mousemove', mouseMoveHandler);

const cameraMover = (delta) => {
    let camPos, targetPos;
    let arm;
    camPos = cameraControls.getPosition();
    targetPos = cameraControls.getTarget();
    arm = targetPos.clone().sub(camPos);
    const norm = arm.clone().setY(0).normalize().multiplyScalar(delta.y * Math.log(camPos.y) / 26);
    arm.applyAxisAngle(yAxis, delta.x / 1000);
    targetPos = camPos.clone().add(arm);
    camPos.add(norm);
    targetPos.add(norm);
    targetPos.setY(0);
    
    // camPos.x -= deltaX;
    // targetPos.x -= deltaX;
    // camPos.z -= deltaY;
    // targetPos.z -= deltaY;
    cameraControls.setPosition(...camPos);
    cameraControls.setTarget(...targetPos);
    cameraState.virtualMousePos.add(delta);
};
const updateCamera = () => {
    const delta = cameraState.mousePos.clone().sub(cameraState.virtualMousePos).multiplyScalar(0.05);
    cameraMover(delta);

    const cameraPos = cameraControls.getPosition();
    const targetPos = cameraControls.getTarget();
    const cameraAngle = cameraPos.clone().sub(targetPos);
    const projectedAngle = new THREE.Vector3();
    basePlane.projectPoint(cameraAngle, projectedAngle);
    const direction = xAxis.clone().cross(projectedAngle).normalize().y;
    const angle = (Math.PI * 2 + xAxis.angleTo(projectedAngle) * direction) % (Math.PI * 2);
    const normalizedAngle = cameraAngle.clone().applyAxisAngle(yAxis, -angle);
    const newNormalizedAngle = normalizedAngle.add(cameraState.cameraAngle[cameraState.cameraMethod].clone().sub(normalizedAngle).multiplyScalar(0.03));
    const newCameraAngle = newNormalizedAngle.applyAxisAngle(yAxis, angle);
    const newCameraPos = targetPos.clone().add(newCameraAngle);

    if (cameraState.isTargetMoving) {
        const delta = cameraState.targetPos.clone().sub(targetPos);
        const newTargetPos = delta.clone().multiplyScalar(0.05).add(targetPos);
        cameraControls.setTarget(...newTargetPos);
        if (delta.length() < 1e-3) {
            cameraState.isTargetMoving = false;
        }
    }
    cameraControls.setPosition(...newCameraPos);
}
document.addEventListener('mouseup', () => {
    cameraState.isClicked = false;
})




cameraControls.mouseButtons.left = CameraControls.ACTION.NONE
cameraControls.mouseButtons.right = CameraControls.ACTION.NONE
cameraControls.mouseButtons.middle = CameraControls.ACTION.NONE
cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE
cameraControls.addEventListener( 'controlstart', function() {
    switch ( cameraControls.currentAction ) {
            case CameraControls.ACTION.ROTATE:
            case CameraControls.ACTION.TOUCH_ROTATE: {

                renderer.domElement.classList.add( '-dragging' );
                break;

            }

            case CameraControls.ACTION.TRUCK:
            case CameraControls.ACTION.TOUCH_TRUCK: {

                renderer.domElement.classList.add( '-moving' );
                break;

            }

            case CameraControls.ACTION.DOLLY:
            case CameraControls.ACTION.ZOOM: {

                renderer.domElement.classList.add( '-zoomIn' );
                break;

            }

            case CameraControls.ACTION.TOUCH_DOLLY_TRUCK:
            case CameraControls.ACTION.TOUCH_ZOOM_TRUCK: {

                renderer.domElement.classList.add( '-moving' );
                break;

            }

            default: {
                break;
            }
        }
} );
cameraControls.addEventListener( 'controlend', function() {

    renderer.domElement.classList.remove(
        '-dragging',
        '-moving',
        '-zoomIn'
    );

} );


            // Raycaster 

            const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {



	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    checkIntersection();

}

window.addEventListener( 'pointermove', onPointerMove );

            // Scene background 

            const backgroundgeometry = new THREE.SphereGeometry(800,60,60)
            const backgroundmaterial = new THREE.ShaderMaterial( {

                uniforms: {
            
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() }
            
                },
            
                vertexShader: `
                   varying vec2 uUV;

                   void main(){
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                       uUV = uv;
                   } 
                `,
            
                fragmentShader: `
                varying vec2 uUV;

                void main() {
                
                    vec3 colorA = vec3(0.2,0.2,0.0);
                    vec3 colorB = vec3(0.4,0.4,1.0);
                    vec3 color = mix(colorA, colorB, 1.0);

                    gl_FragColor = vec4(color,1.0);
                }
                `,
                side: THREE.DoubleSide,
            } );

             const backgroundobj = new THREE.Mesh(backgroundgeometry,backgroundmaterial);
             scene.add(backgroundobj)

         
         
             // Effect composer
let bloomeffect = {
    bloomThreshold: 0.78,
    bloomStrength: 0.78,
    bloomRadius: 0.5
}
            
				const renderScene = new RenderPass( scene, camera );

				const composer = new EffectComposer( renderer );
				composer.addPass( renderScene );

                const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), bloomeffect.bloomThreshold, bloomeffect.bloomStrength, bloomeffect.bloomRadius );
			    bloomPass.threshold = bloomeffect.bloomThreshold

                composer.addPass( bloomPass );


                const antialiaspass = new SMAAPass( window.innerWidth * renderer.getPixelRatio(), window.innerHeight * renderer.getPixelRatio() );
				composer.addPass( antialiaspass );

                // Outline Pass

                outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
				composer.addPass( outlinePass );

			const params = {
				edgeStrength: 5.0,
				edgeGlow: 1.0,
				edgeThickness: 4.0,
				pulsePeriod: 0,
				rotate: false,
				usePatternTexture: false
			};

            function Configuration() {

				this.visibleEdgeColor = '#FF0A0A';
				this.hiddenEdgeColor = '#FF0A0A';

			}

			const conf = new Configuration();
            
            outlinePass.visibleEdgeColor.set('#EE0000')
            
            // Lights
    

        const light = new THREE.HemisphereLight( 'white', 'white', 0.3 );
scene.add( light );

   
  
// Screen Resize

window.addEventListener('resize', function()

	{
	let width = window.innerWidth;
	let height = window.innerHeight;
	renderer.setSize( width, height );
    renderer.setPixelRatio( window.devicePixelRatio /1.5 );

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	} );

    function createpoint(name){
        const newelem = document.createElement('i')
        newelem.classList.add('bi')
        newelem.classList.add('bi-geo-alt-fill')
        newelem.classList.add('point')
        newelem.id = name;
        document.body.appendChild(newelem)
         return newelem
        }

   
        const boundingshader = new THREE.ShaderMaterial( {

            uniforms: {
        
                time: { value: 1.0 },
                resolution: { value: new THREE.Vector2() },
                alpha: {value: 1.0},
            },
        
            vertexShader: `
               varying vec2 uUV;

               void main(){
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   uUV = uv;
               } 
            `,
        
            fragmentShader: `
            uniform float time;
            uniform float alpha;
            varying vec2 uUV;

            void main() {
                 
                 
                gl_FragColor = vec4(0.0,0.0,1.0, alpha);
            }
            `,
            
            wireframe: true,
            transparent: true
        } );


        const boundingspheregeometry = new THREE.BoxGeometry(640,550,700,70,70,70);
        const boundingsphere = new THREE.Mesh(boundingspheregeometry,boundingshader)
        scene.add(boundingsphere) 
        boundingsphere.visible = true

       
 // Model loading   

 let model;
 let allobjs = []


 const manager = new THREE.LoadingManager();

 const loader = new GLTFLoader(manager);

 manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

   document.querySelector('.percentage').innerText = ((itemsLoaded / itemsTotal) * 100).toFixed(1) + '%'
};

manager.onLoad = function ( ) {

    document.querySelector('.Enter-btn').style.display = 'block'

new RGBELoader().load('Environment/Environment.hdr',function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    
       scene.environment = texture;
    })

};

//  const dracoLoader = new DRACOLoader();
//  dracoLoader.setDecoderPath( 'draco/gltf/' );
 
//  loader.setDRACOLoader( dracoLoader );

let fadevalue = {
    value: 0.0
};



const pathaddress = 'Models/';

loadmodel('NFT-city')



function loadmodel(modelname){

    
    loader.load(pathaddress + modelname + '.glb', (gltf) =>{
            model = gltf.scene;
              scene.add(model)
           



              let allanimations = []
    
               mixer = new THREE.AnimationMixer( gltf.scene );
    
              gltf.animations.forEach(function(el,i){
               allanimations.push(gltf.animations[ i ])
          
              })
    
              allanimations.forEach(function(el,i){
              
              mixer.clipAction(el).setDuration( 1 ).play();
              })

   
              gltf.scene.traverse((child) =>{

                //  allobjs.push(child)
            
    
                if(child.isMesh && child.userData.clicked){
                  
                    allobjs.push(child) 
             
                }
    
                  if(child.isMesh && child.material.map){
                     child.material.map.anisotropy = 1;
                  }
    
              })
    
        

    
    
    
        })
    
     

}

function addSelectedObject( object ) {

    selectedObjects = [];
    selectedObjects.push( object );

}

let selectedObject;

function checkIntersection(){
    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( allobjs );

    if ( intersects.length > 0 ) {
        document.querySelector('canvas').style.cursor = 'pointer'

       selectedObject = intersects[ 0 ].object;
        addSelectedObject( selectedObject );
        outlinePass.selectedObjects = selectedObjects;
    

    } else {

        document.querySelector('canvas').style.cursor = 'grab'
        selectedObject = null
        outlinePass.selectedObjects = []
        // outlinePass.selectedObjects = [];

    }

}

let time = 0;

            const clock = new THREE.Clock();

            // Animate

			function animate() {
				requestAnimationFrame( animate );
                const delta = clock.getDelta();

                if ( mixer ) mixer.update( clock.getDelta() * 8);
                cameraControls.update(0.01)
                updateCamera();
               time += 0.01

              boundingshader.uniforms.alpha.value = fadevalue.value;

                 composer.render();

			};

			animate();
 

