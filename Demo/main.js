/*
 *   ______________ ___________________________________     ____. _________ ________  ___________   _____   ________   
 *   \__    ___/   |   \______   \_   _____/\_   _____/    |    |/   _____/ \______ \ \_   _____/  /     \  \_____  \  
 *    |    | /    ~    \       _/|    __)_  |    __)_     |    |\_____  \   |    |  \ |    __)_  /  \ /  \  /   |   \ 
 *    |    | \    Y    /    |   \|        \ |        \/\__|    |/        \  |    `   \|        \/    Y    \/    |    \
 *    |____|  \___|_  /|____|_  /_______  //_______  /\________/_______  / /_______  /_______  /\____|__  /\_______  /
 *                  \/        \/        \/         \/                  \/          \/        \/         \/         \/ 
 * 
 */

window.onload = init;

function init() {

	/*
	 * THREEJS DEMO
	 * (a lot of credit to josdirksen, who wrote this amazing tutorial: https://github.com/josdirksen/learning-threejs)
	 * 
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 * three.js is a 3D library that simplifies the implemetnation of WebGL into web apps.
	 *
	 *
	 *
	 *
	 * What is WebGL?
	 * 		It is hardware-accelerated graphics rendering in web apps.
	 * 		What that means is that the graphics things are actually being rendered by the computer's graphics card, leaving the other things (such as physics and other code) to be handled by the computer's CPU.
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 *
	 * three.js is a very fully-developed and very easy to use library.
	 *
	 *
	 *
	 * There is a huge collection of examples online--the main page of threejs.org hosts most of them.
	 *
	 * 
	 *
	 *
	 * Some have even found it flexible enough to implement into their own personal sites, like my personal favorite, Acko.net.
	 *
	 *
	 *
	 *
	 *
	 * 
	 *
	 *
	 *
	 *
	 * threejs is very compatible with HTML5 elements such as the canvas and SVG.
	 * - batman demo -
	 */

	// We put all the three.js loading things in an init function
	// called from the window.onload in order to make sure that
	// all of the other resources are loaded first.






	// The main three.js object. Put everything to be rendered in here.
	var scene = new THREE.Scene();
	//scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );







	// Lighting	
    // add subtle ambient lighting
    var ambiColor = "#1c1c1c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);








	// The camera object, used to store camera configurations		
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = 100;
	camera.position.y = 10;
	camera.position.z = 10;	
    camera.lookAt(new THREE.Vector3(0, 0, 0));








	// The renderer	
	var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setClearColor(new THREE.Color(0x000, 1.0));
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);






	// Add the output of the renderer to the DOM.
	$("#threejs-output").append(renderer.domElement);










	// Variable to keep track of time
	var clock = new THREE.Clock();










	// Code to create a first-person point of view.
	var fpcam = new THREE.FirstPersonControls(camera);
	fpcam.lookSpeed = 0.4;
	fpcam.movementSpeed = 20;
	fpcam.noFly = false;
	fpcam.lookVertical = true;
	fpcam.constrainVertical = true;
	fpcam.verticalMin = 1.0;
	fpcam.verticalMax = 2.0;
	fpcam.lon = -150;
	fpcam.lat = 120;












	// Load the scene		


	// The city
	var loader = new THREE.OBJMTLLoader();
	var cityMesh;
	function setRandomColors(object, scale) {
		var children = object.children;
		if (children && children.length > 0) {
			children.forEach(function (e) {
				setRandomColors(e, scale)
			});
		} else {
			// no children assume contains a mesh
			if (object instanceof THREE.Mesh) {

				object.material.color = new THREE.Color(scale(Math.random()).hex());
				if (object.material.name.indexOf("building") == 0) {
					object.material.emissive = new THREE.Color(0x444444);
					object.material.transparent = true;
					object.material.opacity = 0.8;
				}
			}
		}
	}
	var loadTextures = function (object) {
		var scale = chroma.scale(['red', 'green', 'blue']);
		setRandomColors(object, scale);
		cityMesh = object;
		scene.add(cityMesh);
	};

	var texture = THREE.ImageUtils.loadTexture('./Metro01.JPG');
	loader.load('./city.obj', './city.mtl', loadTextures);




    // create the ground plane
    var textureGrass = THREE.ImageUtils.loadTexture("../assets/textures/ground/grasslight-big.jpg");
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(4, 4);


    var planeGeometry = new THREE.PlaneGeometry(10, 200, 20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({map: textureGrass});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    // add the plane to the scene
    scene.add(plane);





	// Let there be light.	
    var pointColor = "#ffffff";	
    var spotLight = new THREE.DirectionalLight(pointColor);
    spotLight.position.set(1000, 2000, 0);
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 0.1;
    spotLight.shadowCameraFar = 100;
    spotLight.shadowCameraFov = 50;
    spotLight.target = plane;
    spotLight.distance = 0;
    spotLight.shadowCameraNear = 2;
    spotLight.shadowCameraFar = 200;
    spotLight.shadowCameraLeft = -100;
    spotLight.shadowCameraRight = 100;
    spotLight.shadowCameraTop = 100;
    spotLight.shadowCameraBottom = -100;
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapHeight = 2048;


    scene.add(spotLight);





    var textureFlare0 = THREE.ImageUtils.loadTexture("./lensflare0.png");
    var textureFlare3 = THREE.ImageUtils.loadTexture("./lensflare3.png");

    var flareColor = new THREE.Color(0xffaacc);
    var lensFlare = new THREE.LensFlare(textureFlare0, 350, 0.0, THREE.AdditiveBlending, flareColor);

    lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
    lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

    lensFlare.position.copy(spotLight.position);
    scene.add(lensFlare);





	// Some point cloud demos.
	var snowGroup;

	/*
	function createPointClouds(size, transparent, opacity, sizeAttenuation, color) {

		var texture1 = THREE.ImageUtils.loadTexture("./snowflake1.png");
		var texture2 = THREE.ImageUtils.loadTexture("./snowflake2.png");
		var texture3 = THREE.ImageUtils.loadTexture("./snowflake3.png");
		var texture4 = THREE.ImageUtils.loadTexture("./snowflake5.png");

		scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
		scene.add(createPointCloud("system2", texture2, size, transparent, opacity, sizeAttenuation, color));
		scene.add(createPointCloud("system3", texture3, size, transparent, opacity, sizeAttenuation, color));
		scene.add(createPointCloud("system4", texture4, size, transparent, opacity, sizeAttenuation, color));
	}*/

	function createSprites() {

		snowGroup = new THREE.Object3D();
		var range = 2000;
		for (var i = 0; i < 100; i++) {
			snowGroup.add(createSprite(10, true, 0.6, 0xffffff, i % 5, range));
		}
		scene.add(snowGroup);
	}


	function getTexture() {
		var texture = new THREE.ImageUtils.loadTexture("./sprite-sheet.png");
		return texture;
	}


	function createSprite(size, transparent, opacity, color, spriteNumber, range) {

		var spriteMaterial = new THREE.SpriteMaterial({
			opacity: opacity,
			color: color,
			transparent: transparent,
			map: getTexture()}
			);

		// we have 1 row, with five sprites
		spriteMaterial.map.offset = new THREE.Vector2(0.2*spriteNumber, 0);
		spriteMaterial.map.repeat = new THREE.Vector2(1/5, 1);
		spriteMaterial.depthTest = false;

		spriteMaterial.blending = THREE.AdditiveBlending;

		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(size, size, size);
		sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
		sprite.velocityX = 5;


		return sprite;
	}

	createSprites();









	var steps = 0.0;
	function render() {
		steps += 0.01;
		snowGroup.rotation.y = steps;

		var delta = clock.getDelta();
		fpcam.update(delta);
		// Causes the refresh of the page.
		renderer.clear();
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}


	// Start rendering
	render();


}
