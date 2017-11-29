// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
function immerseMe(backgroundCanvas, foregroundCanvas) {
    // Create an empty scene
    var scene = new THREE.Scene();

    // Create a basic perspective camera
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    camera.position.z = 4;

    // Create fg, bg renderers, cameras
    // BG
    var background = new THREE.WebGLRenderer({
        canvas: backgroundCanvas,
        antialias: true,
        alpha: true
    });
    background.setSize( window.innerWidth, window.innerHeight );

    var backgroundCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 3.75, 10000 );
    backgroundCamera.position.z = 4;

    // FG
    var foreground = new THREE.WebGLRenderer({
        canvas: foregroundCanvas,
        antialias: true,
        alpha: true
    });
    foreground.setSize( window.innerWidth, window.innerHeight );

    var foregroundCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3.78 );
    foregroundCamera.position.z = 4;

    // Responsiveness
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        backgroundCamera.aspect = window.innerWidth / window.innerHeight;
        backgroundCamera.updateProjectionMatrix();

        foregroundCamera.aspect = window.innerWidth / window.innerHeight;
        foregroundCamera.updateProjectionMatrix();

        background.setSize( window.innerWidth, window.innerHeight );
        foreground.setSize( window.innerWidth, window.innerHeight );

    }

    // ------------------------------------------------
    // FUN STARTS HERE
    // ------------------------------------------------

    // Cube
    var geometry = new THREE.BoxGeometry( 0.75, 0.75, 0.75 );
    var material = new THREE.MeshPhongMaterial( { color: "#41f072" } );
    var cube1 = new THREE.Mesh( geometry, material );
    cube1.rotation.x = 2;
    cube1.rotation.y = 0.4;
    scene.add( cube1 );

    // Cube
    var geometry = new THREE.BoxGeometry( 0.75, 0.75, 0.75 );
    var material = new THREE.MeshPhongMaterial( { color: "#cc6481" } );
    var cube2 = new THREE.Mesh( geometry, material );

    scene.add( cube2 );


    // Light
    var light = new THREE.PointLight( 0xffffff, 2, 100 );
    light.position.set( 20, 20, 20 );
    scene.add( light );

    // Render Loop
    var counter = 2;
    var render = function () {
        requestAnimationFrame( render );

        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;

        cube2.rotation.x += 0.01;
        cube2.rotation.y += 0.01;

        cube2.position.y = Math.sin(counter)*0.4 + 0.6;
        cube2.position.x = Math.sin(counter)*2 - 1.6;
        cube2.position.z = Math.cos(counter);

        counter += 0.05;

        // Render the scene
        background.render(scene, backgroundCamera);
        foreground.render(scene, foregroundCamera);
    };

    render();
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}