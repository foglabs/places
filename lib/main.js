    import { Util } from "/lib/Util.js"
    import * as THREE from '/lib/three.module.js'
    import { VRButton } from '/lib/VRButton.js'
    import { Timer } from "/lib/Timer.js"
    import { Place } from '/lib/Place.js'
    import { Demo } from '/lib/Demo.js'
    import { RelaxingRain } from '/lib/RelaxingRain.js'
    import { Character } from '/lib/Character.js'
    import { Sound } from '/lib/Sound.js'
    import { JunkPiece } from '/lib/JunkPiece.js'
    import { Game } from '/lib/Game.js'
    import { Pointer } from '/lib/Pointer.js'
    // import { GLTFLoader } from '/v3/lib/GLTFLoader.js';

    var container
    var camera, scene, renderer
    var controller
    var painter

    var util = new Util()

    var cursor = new THREE.Vector3();

    container = document.createElement( 'div' )
    document.body.appendChild( container )

    var scene
    var place
    var pointer
    
    const textureLoader = new THREE.TextureLoader()
    const audioLoader = new THREE.AudioLoader()
    const listener = new THREE.AudioListener();

    var markerJunkTimer = new Timer()
    markerJunkTimer.start()
    
    var lastPosTimer = new Timer()
    lastPosTimer.start()

    var game = new Game

    
    var material
    var line
    var positions = new Float32Array( 6 )
    var bg = new THREE.BufferGeometry()

    // this indicates that one set of 3 indices == one point
    // so no changy
    bg.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )

    // this is confusing, I THINK this means how many vertices (sets of 3)
    // geometry.setDrawRange(0,3)
    var drawCount = 0
    material = new THREE.LineBasicMaterial( { color: 0xff0022, linewidth: 4 } )
    line = new THREE.Line( bg,  material )

    init();
    animate();

    function createPlace(type=DEMO) {
      if(type==DEMO){
        return new Demo()
      } else if(type == RELAXINGRAIN){
        return new RelaxingRain()
      }
    }

    function addCubeAtPointer(){
      let newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,23,0])
      newcube.setPosition(cursor.x,cursor.y,cursor.z)
      place.junk.push(newcube)
      scene.add( newcube.mesh );
    }

    function init() {

      container = document.createElement( 'div' );
      document.body.appendChild( container );

      scene = new THREE.Scene()
      
      place = createPlace(RELAXINGRAIN)
      console.log( 'exist', place.sounds[util.k(place.sounds)[0]] )

      // scene.background = new THREE.Color( '#330203' );
      scene.background = new THREE.Color( place.backgroundHex );

      pointer = new Pointer()
      // put the lil sphere where the cursor actually is
      scene.add( pointer.mesh )
      
      // cam away
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 )
      camera.position.set(0,1+PLAYERHEIGHT,0)

      camera.add( listener );


      // stock renderer
      renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
      renderer.setPixelRatio( window.devicePixelRatio )
      renderer.setSize( window.innerWidth, window.innerHeight )
      renderer.xr.enabled = true
      renderer.shadowMap.enabled = true
      container.appendChild( renderer.domElement )

      //butt to enter vr
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


      // console.log( 'just set grabbox bbx', pointer.grabBox.bbox.min, pointer.grabBox.bbox.max )

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
      } else {
        // otherwise calc the pointer's grabbing box, to intersect wit characters and pick em up
        pointer.grabBox.bbox.setFromObject(pointer.grabBox.mesh)
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
      let charKeys = util.k(place.characters)
      var char, otherChar
      for(var i=0; i<charKeys.length; i++){
        char = place.characters[charKeys[i]]

        if(char.mesh.material.color.getHexString() == "0000ff"){
          char.mesh.material.color.setRGB( char.baseColor[0], char.baseColor[1], char.baseColor[2] )
        }

        if ( userData.isSelecting === true ) {
          if(!pointer.grabbedId && char.grabbable && pointer.grabBox.bbox.intersectsBox(char.bbox)){
            // if we intersected
            console.log( 'started grabbing ', char.mesh.id )
            pointer.grabbedId = char.mesh.id
          }
        }

        char.handleCollision()
      }

      if(lastPosTimer.time() > 600){
        // for throwing
        lastPosTimer.reset()
        pointer.samplePosition()
      }

      if ( userData.isSelecting === true ) {
        // trigger is currently pulled

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
        //   place.junk.push(markerJunk)
        // }

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
            if( true && markerJunkTimer.time() > 120){
              markerJunkTimer.reset()
              thisgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
              let markerJunk = new JunkPiece(thisgeo, new THREE.Box3( new THREE.Vector3(), new THREE.Vector3() ), [0,255,0], new THREE.MeshStandardMaterial( {color: "#0000ff" } ) )
              markerJunk.setPosition(intersects[i].point.x,intersects[i].point.y,intersects[i].point.z)
              scene.add(markerJunk.mesh)
              markerJunk.pushable = true
              place.junk.push(markerJunk)
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
        // console.log( 'stopp grabbing' )
        pointer.grabbedId = null
        if(grabbedId){
          pointer.throw(place.characters[grabbedId])
        }

      }
    }

    function animate() {
      renderer.setAnimationLoop( render );
    }

    function render() {
      if(game.cubeTimer.time() > 1000){
        game.cubeTimer.reset()
        game.addRandomCube()
      }

      place.handle()

      // check controller interactions
      handleController( controller );

      if(drawCount == 2){
        // need to do this ONCE after each position change to work
        line.geometry.attributes.position.needsUpdate = true
        drawCount = 0

      }
      drawCount += 1
        
      renderer.render( scene, camera );

    }

    export { util, textureLoader, audioLoader, listener, pointer, scene, place, game, controller }