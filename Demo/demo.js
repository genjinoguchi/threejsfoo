var Demo = {};

Demo.init = function() {
	Demo.scene = new THREE.Scene();
	Demo.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	
	Demo.renderer = new THREE.WebGLRenderer();
	Demo.renderer.setClearColorHex();
	Demo.renderer.setClearColor(new Three.Color(0xEEEEEE));
	Demo.renderer.setSize(window.innerWidth, window.innerHeight);
}
