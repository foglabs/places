    import * as THREE from '/lib/three.module.js'
    import { VRButton } from '/lib/VRButton.js'
    import { Timer } from "/lib/Timer.js"
    import { Place } from '/lib/Place.js'
    import { Character } from '/lib/Character.js'
    import { JunkPiece } from '/lib/JunkPiece.js'
    import { Game } from '/lib/Game.js'
    import { Pointer } from '/lib/Pointer.js'
    // import { GLTFLoader } from '/v3/lib/GLTFLoader.js';

    var container
    var camera, scene, renderer
    var controller
    var painter

    var cursor = new THREE.Vector3();

    container = document.createElement( 'div' )
    document.body.appendChild( container )

    var cube
    var scene
    var place
    var pointer
    var floor
    var rx,ry,rz
    var markerJunkTimer = new Timer()
    markerJunkTimer.start()
    var destinationTimer = new Timer()
    destinationTimer.start()
    var cullTimer = new Timer()
    cullTimer.start()

    var lastPosTimer = new Timer()
    lastPosTimer.start()

    var game = new Game
    var junk = []
    // var characters = {}
    // var laser

    var geometry
    var material
    var line
    var positions = new Float32Array( 6 )
    geometry = new THREE.BufferGeometry()

    // this indicates that one set of 3 indices == one point
    // so no changy
    geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )

    // this is confusing, I THINK this means how many vertices (sets of 3)
    // geometry.setDrawRange(0,3)
    var drawCount = 0
    material = new THREE.LineBasicMaterial( { color: 0xff0022, linewidth: 4 } )
    line = new THREE.Line( geometry,  material )

    init();
    animate();

    function randomSign(){
      return Math.random() > 0.5 ? 1 : -1
    }

    function addRandomCube(){
      let mat, newcube
      if(Math.random() > 0.5){
        mat = new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 })
        newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,120], mat )
      } else {
        mat = new THREE.MeshStandardMaterial( { color: '#ffffff', metalness: 1, roughness: 0.1, transparent: true })
        newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,253,180], mat )
      }
      newcube.setPosition(randomSign() * Math.random()*2, randomSign() * Math.random()*2, randomSign() * Math.random()*2)
      junk.push(newcube)
      scene.add( newcube.mesh );
    }

    function createScenery(type=DEMO){
      if(type == DEMO){

        const loader = new THREE.TextureLoader()

        let textyMap = loader.load('/textures/floor-text.jpg') 
        textyMap.wrapS = THREE.RepeatWrapping
        textyMap.wrapT = THREE.RepeatWrapping

        let chars = {}

        floor = new JunkPiece(new THREE.BoxGeometry(5, 0.1, 5), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,120,250], new THREE.MeshPhysicalMaterial( { map: textyMap, transparent: true, transmission: 0, reflectivity: 1, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
        floor.setPosition(0,FLOOR,0)
        floor.pushable = false
        scene.add(floor.mesh)
        chars[floor.mesh.id] = floor

        let wall = new JunkPiece(new THREE.BoxGeometry(2, 2, 0.1), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [120,120,120])
        wall.setPosition(0,0.8,2.5)
        wall.pushable = false
        scene.add(wall.mesh)
        chars[wall.mesh.id] = wall

        let wall2 = new JunkPiece(new THREE.BoxGeometry(1, 1, 0.1), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [120,120,120])
        wall2.setPosition(0,0.8,-2.5)
        wall.pushable = false
        scene.add(wall2.mesh)
        chars[wall2.mesh.id] = wall2

        var char23491miehjf = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [76,234,141], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
        char23491miehjf.mesh.position.set(0.2,1,-0.5)
        char23491miehjf.mesh.rotation.set(0,0,0)
        scene.add( char23491miehjf.mesh )
        chars[char23491miehjf.mesh.id] = char23491miehjf

        var char6dlf0kvj5bk = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [21,116,100], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
        char6dlf0kvj5bk.mesh.position.set(0.11999999999999998,1,-0.5)
        char6dlf0kvj5bk.mesh.rotation.set(0,0,0)
        scene.add( char6dlf0kvj5bk.mesh )
        chars[char6dlf0kvj5bk.mesh.id] = char6dlf0kvj5bk

        var charemk64ptg2g6 = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [208,51,118], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
        charemk64ptg2g6.mesh.position.set(-0.04000000000000005,1,-0.5)
        charemk64ptg2g6.mesh.rotation.set(0,0,0)
        scene.add( charemk64ptg2g6.mesh )
        chars[charemk64ptg2g6.mesh.id] = charemk64ptg2g6

        var charhqrbj6qyll = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [61,243,107], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
        charhqrbj6qyll.mesh.position.set(-0.16000000000000015,1,-0.5)
        charhqrbj6qyll.mesh.rotation.set(0,0,0)
        scene.add( charhqrbj6qyll.mesh )
        chars[charhqrbj6qyll.mesh.id] = charhqrbj6qyll

        var charspsd61t1nrf = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [55,170,168], new THREE.MeshStandardMaterial( { color: '#37aaa8', transparent: true }) )
        charspsd61t1nrf.mesh.position.set(-0.27000000000000025,1,-0.5)
        charspsd61t1nrf.mesh.rotation.set(0,0,0)
        scene.add( charspsd61t1nrf.mesh )
        chars[charspsd61t1nrf.mesh.id] = charspsd61t1nrf

        var char6d65qt1pvt9 = new Character( new THREE.SphereGeometry( 0.1, 32, 32 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshStandardMaterial( { color: '#3cbc2e', transparent: true }) )
        char6d65qt1pvt9.mesh.position.set(-0.00000000000000004,1,-0.5)
        char6d65qt1pvt9.mesh.rotation.set(0,0,0)
        scene.add( char6d65qt1pvt9.mesh )
        chars[char6d65qt1pvt9.mesh.id] = char6d65qt1pvt9

        var charsbpl14mlaw = new Character( new THREE.BoxGeometry( 0.5399999999999998,1.9100000000000006,0.5199999999999999 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [64,50,170], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.9, reflectivity: 0.5, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.4 }) )
        charsbpl14mlaw.mesh.position.set(0,1.4,-2)
        charsbpl14mlaw.mesh.rotation.set(0,0.2,0)
        scene.add( charsbpl14mlaw.mesh )
        chars[charsbpl14mlaw.mesh.id] = charsbpl14mlaw

        var charps8qiin114 = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [128,104,57], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.9, reflectivity: 0.5, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.4 }) )
        charps8qiin114.mesh.position.set(0,0,0)
        charps8qiin114.mesh.rotation.set(0,0.5,0)
        scene.add( charps8qiin114.mesh )
        chars[charps8qiin114.mesh.id] = charps8qiin114

        var charpz9evj23her = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,99,26], new THREE.MeshStandardMaterial( { color: '#00631a', transparent: true }) )
        charpz9evj23her.mesh.position.set(0.36000000000000015,1.2,-0.03)
        charpz9evj23her.mesh.rotation.set(0,-0.7,0)
        scene.add( charpz9evj23her.mesh )
        chars[charpz9evj23her.mesh.id] = charpz9evj23her

        var charivk9xnmlmh = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [115,25,18], new THREE.MeshStandardMaterial( { color: '#731912', transparent: true }) )
        charivk9xnmlmh.mesh.position.set(0.36000000000000015,1.2,-0.5200000000000002)
        charivk9xnmlmh.mesh.rotation.set(0,0.6,0)
        scene.add( charivk9xnmlmh.mesh )
        chars[charivk9xnmlmh.mesh.id] = charivk9xnmlmh

        var charyqwybqd5wm = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [190,38,142], new THREE.MeshStandardMaterial( { color: '#be268e', transparent: true }) )
        charyqwybqd5wm.mesh.position.set(0.8100000000000005,1.2,-0.26)
        charyqwybqd5wm.mesh.rotation.set(0,1.2,0)
        scene.add( charyqwybqd5wm.mesh )
        chars[charyqwybqd5wm.mesh.id] = charyqwybqd5wm

        var char8nlhojct64c = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [152,75,139], new THREE.MeshStandardMaterial( { color: '#984b8b', transparent: true }) )
        char8nlhojct64c.mesh.position.set(0.05999999999999992,1.2,-0.29000000000000004)
        char8nlhojct64c.mesh.rotation.set(0,0.4,0)
        scene.add( char8nlhojct64c.mesh )
        chars[char8nlhojct64c.mesh.id] = char8nlhojct64c

        var charq9c90nqtfbc = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [115,230,151], new THREE.MeshStandardMaterial( { color: '#73e697', transparent: true }) )
        charq9c90nqtfbc.mesh.position.set(0.7000000000000004,1.2,-0.44000000000000017)
        charq9c90nqtfbc.mesh.rotation.set(0.1,0.19999999999999998,0)
        scene.add( charq9c90nqtfbc.mesh )
        chars[charq9c90nqtfbc.mesh.id] = charq9c90nqtfbc

        var charpfmmm449km9 = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [102,165,128], new THREE.MeshStandardMaterial( { color: '#66a580', transparent: true }) )
        charpfmmm449km9.mesh.position.set(0.5300000000000002,1.2,-0.6000000000000003)
        charpfmmm449km9.mesh.rotation.set(0.1,0.4,0)
        scene.add( charpfmmm449km9.mesh )
        chars[charpfmmm449km9.mesh.id] = charpfmmm449km9

        var charxw9srji3yj = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [131,58,150], new THREE.MeshStandardMaterial( { color: '#833a96', transparent: true }) )
        charxw9srji3yj.mesh.position.set(0.6300000000000003,1.2,-0.16999999999999993)
        charxw9srji3yj.mesh.rotation.set(0,0.6,0)
        scene.add( charxw9srji3yj.mesh )
        chars[charxw9srji3yj.mesh.id] = charxw9srji3yj

        return chars

      }


      // scene.position.set(group.position.x+0.2,group.position.y+1,group.position.z-0.5)
    }

    function addCubeAtPointer(){
      let newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,23,0])
      newcube.setPosition(cursor.x,cursor.y,cursor.z)
      junk.push(newcube)
      scene.add( newcube.mesh );
    }

    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );


      scene = new THREE.Scene()
      
      var chars = createScenery()
      place = new Place("#ff0000", chars, floor)
      // scene.background = new THREE.Color( '#330203' );
      scene.background = new THREE.Color( place.backgroundHex );

      // add a fuckin cube
      var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      cube = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,0], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
      // cube.setPosition(0,1,-1)
      cube.setPosition(0,1,-0.5)
      cube.mesh.rotation.y = 0.8
      scene.add( cube.mesh )
      cube.routePoints = [[-0.2,1.2,-1],[-0.2,1.2,0],[0.8,1.2,0],[0.8,1.2,-1]]
      // cube.routePoints = [[-0.2,1.2,-1],[-0.4,1.2,-1]]
      place.characters[cube.mesh.id] = cube

      pointer = new Pointer()
      // put the lil sphere where the cursor actually is
      scene.add( pointer.mesh )
      
      // cam away
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 )
      camera.position.set(0,1+PLAYERHEIGHT,0)

      // stock renderer
      renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
      renderer.setPixelRatio( window.devicePixelRatio )
      renderer.setSize( window.innerWidth, window.innerHeight )
      renderer.xr.enabled = true
      renderer.shadowMap.enabled = true
      container.appendChild( renderer.domElement )

      //butt ot enter vr
      document.body.appendChild( VRButton.createButton( renderer ) )

      // model

      // var light = new THREE.HemisphereLight( 0xffffff, 0x000080, 0.5 )
      // light.position.set( 0.5, 1, 0.5 )
      // scene.add( light )

      // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
      // directionalLight.position.set(1,1,1)
      // directionalLight.target.position.set(-1,-1,-1)
      // scene.add( directionalLight )
      // scene.add( directionalLight.target )
      
      var light = new THREE.PointLight( 0xffffdd, 0.014, 100 )
      light.position.set( 3, 3, 3 )
      var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
      var lightMarker = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,255], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
      lightMarker.setPosition(light.position.x,light.position.y,light.position.z)
      scene.add( lightMarker.mesh )
      scene.add( light )

      scene.add( line )

      controller = renderer.xr.getController( 0 )
      console.log( 'controller', controller )
      // let controller2 = renderer.xr.getController( 1 )
      // console.log( 'controller2', controller2 )

      // select button
      controller.addEventListener( 'selectstart', onSelectStart )
      controller.addEventListener( 'selectend', onSelectEnd )
              
      // what the hell is this?
      controller.userData.skipFrames = 0
      scene.add( controller )



      // let ge = new THREE.Geometry();
      // ge.vertices.push(
      //     new THREE.Vector3(0, 0, 0),
      //     new THREE.Vector3(0, 0, length),
      // );
      // laser = new THREE.Line(ge, new THREE.LineBasicMaterial({ color: "#ff0000" }))
      // laser.matrixAutoUpdate = false
      // laser.matrix.fromArray(controller.matrixWorld)
      // laser.updateMatrixWorld(true)
      // scene.add(laser)


      window.addEventListener( 'resize', onWindowResize, false )
    }

    function onSelectStart() {
      console.log( 'bitch its onSelectStart' )
      this.userData.isSelecting = true
      this.userData.skipFrames = 2

    }
    function onSelectEnd() {
      console.log( 'bitch its onSelectEnd' )
      this.userData.isSelecting = false;
    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize( window.innerWidth, window.innerHeight )
    }


    function handleController( controller ) {

      // otherwise calc the pointer's grabbing box, to intersect wit characters and pick em up
      pointer.grabBox.bbox.setFromObject(pointer.grabBox.mesh)

      var userData = controller.userData;

      // set cursor pos from controller pos
      cursor.set( 0, 0, - 0.2 ).applyMatrix4( controller.matrixWorld )
      // console.log( 'cursor', cursor )
      // laser.matrix.fromArray( controller.matrixWorld.elements );
      // laser.updateMatrixWorld(true);

      // set pointer ray trajectory
      pointer.mesh.position.set(controller.position.x, controller.position.y, controller.position.z)
      pointer.grabBox.mesh.position.set(controller.position.x, controller.position.y, controller.position.z)

      if(pointer.grabbedId){
        // if its grabbed, carry it with the pointer
        place.characters[ pointer.grabbedId ].mesh.position.set(controller.position.x, controller.position.y, controller.position.z)
      }
      
      positions = line.geometry.attributes.position.array

      // camera to cursor
      // positions[0] = camera.position.x
      // positions[1] = camera.position.y + PLAYERHEIGHT
      // positions[2] = camera.position.z
      // positions[3] = cursor.x
      // positions[4] = cursor.y
      // positions[5] = cursor.z

      // cursor to projected point out there
      // positions[0] = cursor.x
      // positions[1] = cursor.y
      // positions[2] = cursor.z
      // positions[3] = cursor.x * 2 - camera.position.x
      // positions[4] = cursor.y * 2 - camera.position.y + PLAYERHEIGHT
      // positions[5] = cursor.z * 2 - camera.position.z

      // camera to proj point out there
      // positions[0] = camera.position.x
      // positions[1] = camera.position.y + PLAYERHEIGHT
      // positions[2] = camera.position.z
      // positions[3] = cursor.x * 8 - camera.position.x
      // positions[4] = cursor.y * 8 - camera.position.y + PLAYERHEIGHT
      // positions[5] = cursor.z * 8 - camera.position.z

      // controller to proj point out there
      positions[0] = controller.position.x
      positions[1] = controller.position.y
      positions[2] = controller.position.z
      positions[3] = controller.position.x * 2 - camera.position.x
      positions[4] = controller.position.y * 2 - camera.position.y
      positions[5] = controller.position.z * 2 - camera.position.z

      // the actual targetray from xr pose
      line.matrix.fromArray( controller.matrix.toArray()  )
      line.updateMatrixWorld(true)


      // char grabbing and collision
      let charKeys = k(place.characters)
      var char, otherChar
      for(var i=0; i<charKeys.length; i++){
        char = place.characters[charKeys[i]]

        if(char.mesh.material.color.getHexString() == "0000ff"){
          char.mesh.material.color.setRGB( char.baseColor[0], char.baseColor[1], char.baseColor[2] )
        }

        char.handleCollision()
      }

      if(lastPosTimer.time() > 600){
        lastPosTimer.reset()
        pointer.samplePosition()
      }

      if ( userData.isSelecting === true ) {
        // trigger is currently pulled

        console.log( 'gbid', pointer.grabbedId )
        console.log( 'inter', pointer.grabBox.bbox.intersectsBox(char.bbox) )
        if(!pointer.grabbedId && pointer.grabBox.bbox.intersectsBox(char.bbox)){
          // if we intersected
          console.log( 'grabbing ', char.mesh.id )
          pointer.grabbedId = char.mesh.id
        }

        let camx,camy,camz
        camx = camera.position.x
        camy = camera.position.y+PLAYERHEIGHT
        camz = camera.position.z

        // add markerjunk at projected point
        // if( true && markerJunkTimer.time() > 420){
        //   markerJunkTimer.reset()
        //   let thisgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
        //   let markerJunk = new JunkPiece(thisgeo, new THREE.Box3( new THREE.Vector3(), new THREE.Vector3() ), [0,255,0], new THREE.MeshStandardMaterial( {color: "#0000ff" } ) )
        //   markerJunk.setPosition(controller.position.x*2-camx ,controller.position.y*2-camy ,controller.position.z*2-camz )
        //   scene.add(markerJunk.mesh)
        //   markerJunk.pushable = true
        //   junk.push(markerJunk)
        // }

        // let origin = new THREE.Vector3(camx,camy,camz)
        // let dir = new THREE.Vector3(camx - controller.position.x, camy - controller.position.y, camz - controller.position.z)

        // let camx,camy,camz
        // camx = camera.position.x
        // camy = camera.position.y+PLAYERHEIGHT
        // camz = camera.position.z
        // let origin = new THREE.Vector3(cursor.x,cursor.y,cursor.z)
        // direciton from cam position to Pointer
        // let dir = new THREE.Vector3(camx - cursor.x, camy - cursor.y, camz - cursor.z)

        // dir from cam to extended pointer point :D
        let dir = new THREE.Vector3( controller.position.x-camx, controller.position.y-camy, controller.position.z-camz ).normalize()

        // pointer.raycaster.set(origin, dir)
        // pointer.raycaster.set( controller.getWorldPosition(), controller.getWorldDirection() )
        pointer.raycaster.set( controller.getWorldPosition(), dir )

        line.material.color.setRGB(12,34,128)

        let pushThese = []

        // if interseects, make it red
        var intersects = pointer.raycaster.intersectObjects( scene.children )
        let thisgeo
        for ( var i = 0; i < intersects.length; i++ ) {
          // intersects[ i ].object.material.color.set( 0x0000ff )

          if(intersects[i].object.id != line.id){
  
            // intersection markers
            if( true && markerJunkTimer.time() > 420){
              markerJunkTimer.reset()
              thisgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
              let markerJunk = new JunkPiece(thisgeo, new THREE.Box3( new THREE.Vector3(), new THREE.Vector3() ), [0,255,0], new THREE.MeshStandardMaterial( {color: "#0000ff" } ) )
              markerJunk.setPosition(intersects[i].point.x,intersects[i].point.y,intersects[i].point.z)
              scene.add(markerJunk.mesh)
              markerJunk.pushable = true
              junk.push(markerJunk)
            }

            // pushem
            if(pointer.grabbedId){
              // if grabbing, push crap out of the way when were near

              char = place.characters[intersects[i].object.id]
              if(char && char.pushable){
                char.mesh.material.color.setRGB(255,0,0)
                // do some shit
                char.accx += (char.mesh.position.x - intersects[i].point.x)*3
                char.accy += (char.mesh.position.y - intersects[i].point.y)*3
                char.accz += (char.mesh.position.z - intersects[i].point.z)*3

                console.log( 'now I push your shit', char.mesh.id, char.accx )
              }
            }
          }
        }

      } else {
        // game.destination = [0, 1.8, -1]
        line.material.color.setRGB(255,34,24)

        // stopped trigger hold, stop grabbing
        let grabbedId = pointer.grabbedId
        pointer.grabbedId = null
        if(grabbedId){
          pointer.throw(place.characters[grabbedId])
        }

      }
    }


    function handleJunk(){
      if(destinationTimer.time() > 4000){
        // wait 8s before changing destination
        destinationTimer.reset()

        let x,y,z
        x = randomSign() * Math.random() * 2
        y = randomSign() * Math.random() * 2
        z = randomSign() * Math.random() * 2
        game.destination = [x,y,z]

        // random point for end of pointing stick flavor
        // rx = Math.random() * 2 * randomSign()
        // ry = Math.random() * 2 * randomSign()
        // rz = Math.random() * 2 * randomSign()
      }

      let junkPiece
      for(var i=0; i<junk.length; i++){
        junkPiece = junk[i]
        if(junkPiece){

          // handle momentum
          junkPiece.handleMovement()

          // if were set to follow cursor
          if(junkPiece.follower){
            // this is green cube point
            // cursor.x, etc..
            junkPiece.moveTowardsPoint(game.destination[0],game.destination[1],game.destination[2], 2)
          }

          // handle rotation
          junkPiece.animation()
          junkPiece.handleMovement()
        }
      }


      if(cullTimer.time() > 600){
        cullTimer.reset()
        if(junk.length > 4){
          let cullNum = Math.ceil( (junk.length/2)*Math.random() ) 
          cullJunk( cullNum )
        }
      }
    }

    function cullJunk(num) {
      let pieceIndex
      let deleteInds = []
      // console.log( 'now cullin', num )

      for(var i=0; i<num; i++){
  
        pieceIndex = Math.floor(Math.random() * junk.length)
        if(junk[pieceIndex]){
          // console.log( 'now to cull', pieceIndex )
          junk[ pieceIndex ].remove()
          delete junk[pieceIndex]
        }
      }

      for(var i=0; i<junk.length; i++){
        if(!junk[i]){
          junk.splice(i,1)  
        }
      }
    }

    function animate() {
      renderer.setAnimationLoop( render );
    }

    function render() {
      if(game.cubeTimer.time() > 1000){
        game.cubeTimer.reset()
        addRandomCube()
      }

      handleJunk()
      // check controller interactions
      handleController( controller );

      if(drawCount == 2){
        // need to do this ONCE after each position change to work
        line.geometry.attributes.position.needsUpdate = true
        drawCount = 0

      }
      drawCount += 1

      let char, charKeys
      charKeys = k(place.characters)
      // console.log( 'characterskey', charKeys )
      for(var i=0; i<charKeys.length; i++){
        char = place.characters[charKeys[i]]
        char.animation()
        char.handleMovement()
      }
        
      renderer.render( scene, camera );

    }

    // function onDocumentKeyDown(event) { 
    //   // grab to see if we should bump
    //   if(event.key == "ArrowLeft"){
    //     cube.position.set(cube.position.x, cube.position.y, cube.position.z - 0.3 )
    //   } else if(event.key == "ArrowRight"){
    //     cube.position.set(cube.position.x, cube.position.y, cube.position.z + 0.3 )
    //   } else if(event.key == "ArrowUp"){
    //     cube.position.set(cube.position.x + 0.3, cube.position.y, cube.position.z )
    //   } else if(event.key == "ArrowDown"){
    //     cube.position.set(cube.position.x - 0.3, cube.position.y, cube.position.z )
    //   }

    // }
    // document.addEventListener("keydown", onDocumentKeyDown, false);



      // exports.pointer = pointer
      // exports.scene = scene
      // exports.game = game
      // exports.junk = junk
      // exports.characters = characters
      // exports.floor = floor


      export { pointer, scene, place, game, junk, controller }