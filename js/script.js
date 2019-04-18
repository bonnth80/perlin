
var canvX = document.getElementById("canvasRenderer");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, .75, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400,300);

canvX.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial({color: 0xFF0000, side: THREE.DoubleSide});
var cube = new THREE.Mesh( geometry, material );

var planeGeometry = new THREE.PlaneGeometry(2,2);
var planeMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF, side: THREE.DoubleSide, transparent: true, opacity: .4});
var plane = new THREE.Mesh( planeGeometry, planeMaterial );

var camPos1 = new THREE.Vector3(3.88, 2.82, 4.65),
    camRot1 = new THREE.Euler(-0.21,0.57,0,'XYZ', function onRotationChange() {
        quaternion.setFromEuler( rotation, false );
    });

camera.position.copy(camPos1);
camera.rotation.copy(camRot1);

scene.add( cube );
scene.add( plane );


var panXSpeed = 0.0,
    panYSpeed = 0.0,
    panZSpeed = 0.0,
    rotateXSpeed = 0.0,
    rotateYSpeed = 0.0,
    rotateZSpeed = 0.0;

var animate = function () {
    requestAnimationFrame( animate );

    camera.position.x += panXSpeed;
    camera.position.y += panYSpeed;
    camera.position.z += panZSpeed;
    camera.rotation.x += rotateXSpeed;
    camera.rotation.y += rotateYSpeed;
    camera.rotation.z += rotateZSpeed;
    renderer.render(scene, camera);
};

if (Detector.webgl) {
    // Initiate function or other initializations here
    console.log("camera position: " + camera.position.x + " " + camera.position.y + " " + camera.position.z + ", rotation: " + camera.rotation.x + " " + camera.rotation.y + " " + camera.rotation.z);
    animate();
} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}

var btnPanUp    = document.getElementById('btnPanUp'),
    btnPanDown  = document.getElementById('btnPanDown'),
    btnPanUp    = document.getElementById('btnPanUp'),
    btnPanDown  = document.getElementById('btnPanDown'),
    btnPanUp    = document.getElementById('btnPanUp'),
    btnPanDown  = document.getElementById('btnPanDown'),
    btnPanUp    = document.getElementById('btnPanUp'),
    btnPanDown  = document.getElementById('btnPanDown');

var btnRotateUp     = document.getElementById('btnRotateUp'),
    btnRotateDown   = document.getElementById('btnRotateDown'),
    btnRotateUp     = document.getElementById('btnRotateUp'),
    btnRotateDown   = document.getElementById('btnRotateDown'),
    btnRotateUp     = document.getElementById('btnRotateUp'),
    btnRotateDown   = document.getElementById('btnRotateDown');

var btnBankLeft     = document.getElementById('btnBankLeft'),
    btnBankRight   = document.getElementById('btnBankRight');

var btnFreeze   = document.getElementById('btnFreeze'),
    btnZoomExtend = document.getElementById('btnZoomExtend');

btnPanUp.addEventListener('click', function(){
    panYSpeed += .01;
})

btnPanDown.addEventListener('click', function(){
    panYSpeed -= .01;
})

btnPanLeft.addEventListener('click', function(){
    panXSpeed -= .01;
})

btnPanRight.addEventListener('click', function(){
    panXSpeed += .01;
})

btnPanForward.addEventListener('click', function(){
    panZSpeed -= .01;
})

btnPanBack.addEventListener('click', function(){
    panZSpeed += .01;
})


btnRotateUp.addEventListener('click', function(){
    rotateXSpeed += .01;
})

btnRotateDown.addEventListener('click', function(){
    rotateXSpeed -= .01;
})

btnRotateLeft.addEventListener('click', function(){
    rotateYSpeed += .01;
})

btnRotateRight.addEventListener('click', function(){
    rotateYSpeed -= .01;
})

btnBankLeft.addEventListener('click', function(){
    rotateZSpeed += .01;
})

btnBankRight.addEventListener('click', function(){
    rotateZSpeed -= .01;
})

btnFreeze.addEventListener('click', freezeCamera())

btnZoomExtend.addEventListener('click', function(){
    freezeCamera();
    camera.position.copy(new THREE.Vector3(0,0,4));
    camera.rotation.copy(new THREE.Euler(0,0,0,'XYZ', function onRotationChange() {
        quaternion.setFromEuler( rotation, false );    
    }));
});

function freezeCamera() {    
    rotateXSpeed = 0.0;
    rotateYSpeed = 0.0;
    rotateZSpeed = 0.0;
}