var camera, scene, renderer, labelsRenderer;
var controls;
var root;
var MOLECULES = {
    "Ethanol": "ethanol.pdb",
    "Aspirin": "aspirin.pdb",
    "Caffeine": "caffeine.pdb",
    "Nicotine": "nicotine.pdb",
    "LSD": "lsd.pdb",
    "Cocaine": "cocaine.pdb",
    "Cholesterol": "cholesterol.pdb",
    "Lycopene": "lycopene.pdb",
    "Glucose": "glucose.pdb",
    "Aluminium oxide": "Al2O3.pdb",
    "Cubane": "cubane.pdb",
    "Copper": "cu.pdb",
    "Fluorite": "caf2.pdb",
    "Salt": "nacl.pdb",
    "YBCO superconductor": "ybco.pdb",
    "Buckyball": "buckyball.pdb",
    //"Diamond": "diamond.pdb",
    "Graphite": "graphite.pdb"
};

var loader = new THREE.PDBLoader();
init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1000;
    scene.add( camera );
    var light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( -1, -1, 1 );
    scene.add( light );
    root = new THREE.Group();
    scene.add( root );
    //
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x050505 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( 'viewport' ).appendChild( renderer.domElement );
    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById( 'viewport' ).appendChild( labelRenderer.domElement );
    //
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 500;
    controls.maxDistance = 2000;
    //
    loadMolecule( "data/OR17_210-nonanone_1-100.pdb" );

    //
    window.addEventListener( 'resize', onWindowResize, false );
}


//
function loadMolecule( url ) {
    while ( root.children.length > 0 ) {
        var object = root.children[ 0 ];
        object.parent.remove( object );
    }

    loader.load( url, function ( geometry, geometryBonds, json ) {
        var boxGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        var sphereGeometry = new THREE.IcosahedronBufferGeometry( 1, 2 );
        var offset = geometry.center();
        geometryBonds.translate( offset.x, offset.y, offset.z );
        var positions = geometry.getAttribute( 'position' );
        var colors = geometry.getAttribute( 'color' );
        var position = new THREE.Vector3();
        var color = new THREE.Color();
        for ( var i = 0; i < positions.count; i ++ ) {
            position.x = positions.getX( i );
            position.y = positions.getY( i );
            position.z = positions.getZ( i );
            color.r = colors.getX( i );
            color.g = colors.getY( i );
            color.b = colors.getZ( i );
            var element = geometry.elements[ i ];
            var material = new THREE.MeshPhongMaterial( { color: color } );
            var object = new THREE.Mesh( sphereGeometry, material );
            object.position.copy( position );
            object.position.multiplyScalar( 75 );
            object.scale.multiplyScalar( 25 );
            root.add( object );
            var atom = json.atoms[ i ];
            var text = document.createElement( 'div' );
            text.className = 'label';
            text.style.color = 'rgb(' + atom[ 3 ][ 0 ] + ',' + atom[ 3 ][ 1 ] + ',' + atom[ 3 ][ 2 ] + ')';
            text.textContent = atom[ 4 ];
            var label = new THREE.CSS2DObject( text );
            label.position.copy( object.position );
            root.add( label );
        }

        positions = geometryBonds.getAttribute( 'position' );
        var start = new THREE.Vector3();
        var end = new THREE.Vector3();
        for ( var i = 0; i < positions.count; i += 2 ) {
            start.x = positions.getX( i );
            start.y = positions.getY( i );
            start.z = positions.getZ( i );
            end.x = positions.getX( i + 1 );
            end.y = positions.getY( i + 1 );
            end.z = positions.getZ( i + 1 );
            start.multiplyScalar( 75 );
            end.multiplyScalar( 75 );
            var object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( 0xffffff ) );
            object.position.copy( start );
            object.position.lerp( end, 0.5 );
            object.scale.set( 5, 5, start.distanceTo( end ) );
            object.lookAt( end );
            root.add( object );
        }

        render();
    }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    }, function ( xhr ) {
    } );
}
//
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    labelRenderer.setSize( window.innerWidth, window.innerHeight );
    render();
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    // var time = Date.now() * 0.0004;
    // root.rotation.x = time;
    // root.rotation.y = time * 0.7;
    render();
}
function render() {
    renderer.render( scene, camera );
    labelRenderer.render( scene, camera );
}