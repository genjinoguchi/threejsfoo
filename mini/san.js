//THREE NECESSARY PARTS TO DISPLAY ANYTHING WITH Three.js: scene, camera, and renderer to render scene with camera

var scene = new THREE.Scene();

/*Camera takes 4 args:
  -->field of view
  -->aspect ration (usually width/height)
  -->near and far: objects further away from far value or closer than near won't be rendered


*/

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

/*
  Renderer:
  -->usually a good idea to set the size we want to render our app to the browser window height and width

*/


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );


//render.domElement is a canvas element used to display scene

document.body.appendChild( renderer.domElement );


var light1 = new THREE.DirectionalLight( 0xffffff, 1.5 );
light1.position.set( 1, 1, 1 );
scene.add( light1 );


var geometry = new THREE.CylinderGeometry(5, 5, 20, 33);


var material = new THREE.MeshPhongMaterial( {
    color: 0xFFFF00, ambient: 0xE6E6FA, specular: 0xffffff, shininess: 250,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors, wireframe:true
} );

/*
  Mesh is an object that takes a geometry and applies a meterial to it
*/

var cylinder = new THREE.Mesh( geometry, material );


//by default, would add the cube to coordinates 
//(0, 0, 0) and would be on top of camera
scene.add( cylinder );
//pull camera back
camera.position.z = 20;

var render = function () {
    requestAnimationFrame( render );
    cylinder.rotation.x += 0.05;
    cylinder.rotation.y += 0.05;
    cylinder.rotation.z += 0.1;
    renderer.render(scene, camera);
};

render();


//if window is resized, change camera aspects and reset render size
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}
window.addEventListener( 'resize', onWindowResize, false );
