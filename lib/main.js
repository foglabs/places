    import { Util } from "/lib/Util.js"
    import * as THREE from '/lib/three.module.js'
    import { VRButton } from '/lib/VRButton.js'
    import { Timer } from "/lib/Timer.js"
    import { Place } from '/lib/Place.js'
    import { Demo } from '/lib/Demo.js'
    import { RelaxingRain } from '/lib/RelaxingRain.js'
    import { Character } from '/lib/Character.js'
    import { Component } from '/lib/Component.js'
    import { Sound } from '/lib/Sound.js'
    import { MusicPlayer } from '/lib/MusicPlayer.js'
    import { JunkPiece } from '/lib/JunkPiece.js'
    import { Game } from '/lib/Game.js'
    import { Pointer } from '/lib/Pointer.js'
    import { GLTFLoader } from '/lib/GLTFLoader.js';
    import { OrbitControls } from '/lib/OrbitControls.js';

    var container
    var camera, camGroup, scene, renderer
    var controls
    var controller

    var util = new Util()

    var cursor = new THREE.Vector3();

    container = document.createElement( 'div' )
    document.body.appendChild( container )

    var camx,camy,camz
    var place
    var pointer
    
    const textureLoader = new THREE.TextureLoader()
    const audioLoader = new THREE.AudioLoader()
    const gltfLoader = new GLTFLoader()
    const listener = new THREE.AudioListener()

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
    // line = new THREE.Line( bg,  material )

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
      scene.fog = new THREE.FogExp2("#ffffff", 0.036);
            
      // cam away
      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 500 )

      camera.position.set(0.2,1.3,0.1)
      camx = camera.position.x
      camy = camera.position.y
      camz = camera.position.z
      camera.lookAt(1,FLOOR,0)

      camera.add( listener )

      camGroup = new THREE.Group()
      camGroup.add(camera)
      scene.add(camGroup)

      var plant
      place = createPlace(RELAXINGRAIN)

      // scene.background = new THREE.Color( '#330203' );
      scene.background = new THREE.Color( place.backgroundHex );

      pointer = new Pointer()
      // put the lil sphere where the cursor actually is
      // scene.add( pointer.mesh )
      camGroup.add( pointer.mesh )

      // stock renderer
      renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
      renderer.setPixelRatio( window.devicePixelRatio )

      renderer.setSize( window.innerWidth, window.innerHeight )
      renderer.xr.enabled = true
      renderer.shadowMap.enabled = true
      // for gltf lighting support
      renderer.outputEncoding = THREE.sRGBEncoding
      // uh
      renderer.physicallyCorrectLights = true;

      container.appendChild( renderer.domElement )

      //butt to enter vr
      document.body.appendChild( VRButton.createButton( renderer ) )

      controls = new OrbitControls( camera, renderer.domElement );
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 0;
      controls.maxDistance = 500;
      controls.maxPolarAngle = Math.PI / 2;



      // model

      // var light = new THREE.HemisphereLight( 0xffffff, 0x000080, 0.5 )
      // light.position.set( 0.5, 1, 0.5 )
      // scene.add( light )

      // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
      // directionalLight.position.set(1,1,1)
      // directionalLight.target.position.set(-1,-1,-1)
      // scene.add( directionalLight )
      // scene.add( directionalLight.target )


      // scene.add( line )

      controller = renderer.xr.getController( 0 )
      console.log( 'controller', controller )
      // let controller2 = renderer.xr.getController( 1 )
      // console.log( 'controller2', controller2 )

      // select button
      controller.addEventListener( 'selectstart', onSelectStart )
      controller.addEventListener( 'selectend', onSelectEnd )
              
      // what the hell is this?
      // controller.userData.skipFrames = 0
      
      // works, but stuck at origin
      // scene.add( controller )
      camGroup.add( controller )

      // set player group stuff to real position
      camGroup.position.set(-0.4,0,-0.4)


      window.addEventListener( 'resize', onWindowResize, false )
    }

    function onSelectStart() {
      // console.log( 'bitch its onSelectStart' )
      this.userData.isSelecting = true
      this.userData.skipFrames = 2

    }
    function onSelectEnd() {
      // console.log( 'bitch its onSelectEnd' )
      this.userData.isSelecting = false;
    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize( window.innerWidth, window.innerHeight )
    }

    function handleController( controller ) {

      var userData = controller.userData;

      // set cursor pos from controller pos
      cursor.set( 0, 0, - 0.2 ).applyMatrix4( controller.matrixWorld )

      // set pointer ray trajectory
      let cPos = new THREE.Vector3()
      cPos = camera.getWorldPosition(cPos)
      // camx = cPos.x
      // camy = cPos.y
      // camz = cPos.z

      // let dir = new THREE.Vector3( controller.position.x-camx, controller.position.y-camy, controller.position.z-camz ).normalize()

      let pos = new THREE.Vector3()
      pos = controller.getWorldPosition(pos)

      let dir = new THREE.Vector3()
      dir = controller.getWorldDirection(dir)
      // dir = new THREE.Vector3( pos.x-cPos.x, pos.y-cPos.y, pos.z-cPos.z ).normalize()

      // RAY mmust be set using world position, everything else seems to be regular position ok
      pointer.raycaster.set( pos, dir )

      let charObjs = []
      util.k(place.characters).forEach( (c) => {
        if(place.characters[c].mesh) {
          charObjs.push(place.characters[c].mesh)
        }
      })
      var intersects = pointer.raycaster.intersectObjects( charObjs )

      // ATTEMPT at locking pointer to nearest inter section... only works when really close so maybe a origin/direction issue
      // // fake init distance to simply this loop
      // let closestIntersect = { distance: 10 }
      // for(var i=0; i<intersects.length; i++){

      //   // is not a piece of the pointer and is not too far away and is the shortest yet
      //   if(!pointer.componentIds[intersects[i].object.id] && intersects[i].distance < 1000 && closestIntersect.distance > intersects[i].distance){
      //     closestIntersect = intersects[i]
      //   }
      // }

      // if(closestIntersect.distance < 10){
      //   // we intersect with sommething thats relatively close, lock the pointer to the intersection 
      //   let x,y,z

      //   x = closestIntersect.point.x - pointer.mesh.position.x
      //   y = closestIntersect.point.y - pointer.mesh.position.y
      //   z = closestIntersect.point.z - pointer.mesh.position.z

      //   let newOffset = new THREE.Vector3( x,y,z )
      //   pointer.grabBox.offset = newOffset  
      //   // pointer.move(closestIntersect.point.x,closestIntersect.point.y,closestIntersect.point.z)
      // } else {
      //   let newOffset = new THREE.Vector3( 0,0,0 )
      //   pointer.grabBox.offset = newOffset
      // }

      // just put da pointa where the controller is
      pointer.move(controller.position.x, controller.position.y, controller.position.z)

      if(pointer.grabbedId) {
        // if its grabbed, carry it with the pointer
        let conPos = controller.getWorldPosition()
        place.characters[ pointer.grabbedId ].move(conPos.x, conPos.y, conPos.z)
        // and rotate it
        let objRot = controller.rotation
        objRot.z *= 1.3
        objRot.x *= 1.3
        place.characters[ pointer.grabbedId ].mesh.setRotationFromEuler( objRot )


      } else {
        // otherwise calc the pointer's grabbing box, to intersect wit characters and pick em up
        pointer.grabBox.bbox.setFromObject(pointer.grabBox.mesh)
      }
      
      // positions = line.geometry.attributes.position.array

      // // controller to proj point out there
      // positions[0] = controller.position.x
      // positions[1] = controller.position.y
      // positions[2] = controller.position.z
      // positions[3] = controller.position.x * 2 - camera.position.x
      // positions[4] = controller.position.y * 2 - camera.position.y
      // positions[5] = controller.position.z * 2 - camera.position.z

      // // the actual targetray from xr pose
      // line.matrix.fromArray( controller.matrix.toArray()  )
      // line.updateMatrixWorld(true)

      // char grabbing and collision
      let charKeys = util.k(place.characters)
      var char, otherChar
      for(var i=0; i<charKeys.length; i++){
        char = place.characters[charKeys[i]]

        if(char.components.length > 0){
          for(var z=0; z<char.components.length; z++){
            // set bbox and customanim if available
            char.components[z].animation()
          }
        }

        // if(!char.mesh.material.length && char.mesh.material.color.getHexString() == "0000ff"){
        //   char.mesh.material.color.setRGB( char.baseColor[0], char.baseColor[1], char.baseColor[2] )
        // }

        if ( userData.isSelecting === true ) {
          
          if(char.components.length > 0){
            // if thers compnents on this char

            let comp
            for(var z=0; z<char.components.length; z++){
              comp = char.components[z]

              // clicking components of this obj
              if(comp.clickable){

                if(pointer.grabBox.bbox.intersectsBox(comp.bbox)){
                  // check if any of this chars compnents are getting clicked
                  if(!comp.clicked){
                    comp.handleClick(comp.id)
                  }
                } else {
                  // default, trying to clear explicitly in button action, that may be better
                  comp.clicked = false
                  if(comp.itemType == BUTTON && comp.state == PUSHED){
                    // we're done pushing, let it go
                    console.log( 'let go', comp )
                    comp.state = UNPUSHING
                  }
                }

              }
            }
          }

          if( (char.grabbable || char.clickable) && pointer.grabBox.bbox.intersectsBox(char.bbox) ){

            // grabbing
            if(!pointer.grabbedId && char.grabbable){
              // if we intersected
              console.log( 'started grabbing ', char.mesh.id )
              pointer.grabbedId = char.mesh.id

              // reset grav accel cause we moved it
              char.hitFloor = false
            }

            // clicking regualr obj
            if(char.clickable){
              // oh boy!
              if(!char.clicked){
                char.handleClick()
              }
            }
          }
        } else {
          char.clicked = false
        }
        if(char.pushable){
          char.handleCollision()
        }
      }

      if(lastPosTimer.time() > 600){
        // for throwing
        lastPosTimer.reset()
        pointer.samplePosition()
      }

      if ( userData.isSelecting === true ) {
        // trigger is currently pulled

        // add markerjunk at projected point
        if( true && markerJunkTimer.time() > 420){
          markerJunkTimer.reset()
          let thisgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
          let markerJunk = new JunkPiece(thisgeo, new THREE.Box3( new THREE.Vector3(), new THREE.Vector3() ), [0,255,0], new THREE.MeshStandardMaterial( {color: "#0000ff" } ) )
          markerJunk.setPosition(controller.position.x*2-camx ,controller.position.y*2-camy ,controller.position.z*2-camz )
          scene.add(markerJunk.mesh)
          place.junk.push(markerJunk)
        }


        // doing this all the time now
        // let dir = new THREE.Vector3( controller.position.x-camx, controller.position.y-camy, controller.position.z-camz ).normalize()        
        // pointer.raycaster.set( controller.getWorldPosition(), dir )

        // line.material.color.setRGB(12,34,128)

        // if interseects, make it red
        let thisgeo

        // if we're clicking, use the same intersects from above
        for ( var i = 0; i < intersects.length; i++ ) {

          // intersection markers
          // if( true && markerJunkTimer.time() > 120){
          //   markerJunkTimer.reset()
          //   thisgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
          //   let markerJunk = new JunkPiece(thisgeo, new THREE.Box3( new THREE.Vector3(), new THREE.Vector3() ), [0,255,0], new THREE.MeshStandardMaterial( {color: "#0000ff" } ) )
          //   markerJunk.setPosition(intersects[i].point.x,intersects[i].point.y,intersects[i].point.z)
          //   scene.add(markerJunk.mesh)
          //   markerJunk.pushable = true
          //   place.junk.push(markerJunk)
          // }

          // pushem
          if(pointer.grabbedId){
            // if already grabbing something, push crap out of the way when were near

            char = place.characters[intersects[i].object.id]
            if(char && char.pushable){
              // char.mesh.material.color.setRGB(255,0,0)
              // do some shit


              char.accx += (char.mesh.position.x - intersects[i].point.x)*3
              char.accy += (char.mesh.position.y - intersects[i].point.y)*3
              char.accz += (char.mesh.position.z - intersects[i].point.z)*3

              console.log( 'now I push your shit', char.mesh.id, char.accx )
            }
          }
        }

      } else {
        // game.destination = [0, 1.8, -1]
        // line.material.color.setRGB(255,34,24)

        // stopped trigger hold, stop grabbing
        let grabbedId = pointer.grabbedId
        // console.log( 'stopp grabbing' )
        pointer.grabbedId = null
        if(grabbedId){

          let grabbedChar = place.characters[ grabbedId ]

          // dont love compiling this at time of drop, but better than nothin
          let droppableChars = []

           util.k(place.characters).forEach((id) => {
            if(place.characters[id].droppable){
              droppableChars.push(place.characters[id])
            } else if(place.characters[id].components.length > 0){
              place.characters[id].components.forEach( (c) => {
                // loop through to find droppable subcomponents
                if(c.droppable){
                  droppableChars.push( c )
                }
              })

            }
          })



          console.log( 'dropp char', droppableChars )

          let droppedOn
          for(var i=0; i<droppableChars.length; i++){
            
            if( droppableChars[i].handleHit( grabbedChar )){
              droppedOn = droppableChars[i]
              console.log( 'hit on droppbal', droppedOn.mesh.id )
              break
            }
          }

          if(droppedOn){
            // if grabbed obj is intersecting a droppable obj
            // run droppable obj's function
            droppedOn.handleDrop( grabbedChar )
          } else {
            // just throw it
            pointer.throw( place.characters[grabbedId] )
          }
        }

      }
    }

    function animate() {
      renderer.setAnimationLoop( render );
    }

    function render() {
      // orbit controllys
      controls.update()

      // if(game.cubeTimer.time() > 1000){
      //   game.cubeTimer.reset()
      //   game.addRandomCube()
      // }

      place.handle()

      // check controller interactions
      handleController( controller );

      if(drawCount == 2){
        // need to do this ONCE after each position change to work
        // line.geometry.attributes.position.needsUpdate = true
        drawCount = 0

      }
      drawCount += 1
        
      renderer.render( scene, camera );

    }

    export { util, gltfLoader, textureLoader, audioLoader, listener, pointer, scene, camGroup, place, game, controller }