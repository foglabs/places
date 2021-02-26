import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { JunkPiece } from "./JunkPiece.js"
import { Sound } from "./Sound.js"
import { MusicPlayer } from "./MusicPlayer.js"
import { GoBoard } from "./GoBoard.js"
import { Album } from "./Album.js"
import { Remote } from "./Remote.js"
import { DeskLamp } from '/lib/DeskLamp.js'
import { util, textureLoader, scene } from "./main.js"

class RelaxingRain extends Place {
  constructor(){

    var backgroundHex = "#030312"
    // var backgroundHex = "#FFFFFF"
    // var backgroundHex = "#000000"

    // I need a light
    // let light = new THREE.SpotLight( 0xffffdd, 0.211, 100 )
    // light.position.set( 1, 2, -2 )
    // let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
    // let lightMarker = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,255], new THREE.MeshStandardMaterial( {color: "#ffffdd" } ) )
    // lightMarker.setPosition(light.position.x,light.position.y,light.position.z)
    // light.castShadow = true
    // light.lookAt(0,1.0,1)
    // light.shadow.mapSize.width = 1024*4
    // scene.add( lightMarker.mesh )
    // scene.add( light )


    // dfeault 0.018
    var spotlight = new THREE.SpotLight("#0000bb", 0.008)
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024*4
    spotlight.shadow.mapSize.height = 1024*4
    // spotlight.position.set(-0.6600000000000004,2,-1.0300000000000002)
    // spotlight.lookAt(0,1.2,-0.3499999999999999)
    spotlight.position.set(-1, 1.8, -0.75)
    spotlight.lookAt(0,-2,0)
    spotlight.shadow.camera.near = 0.5; // default
    spotlight.shadow.camera.far = 30; // default
    spotlight.shadow.focus = 1; // default
    scene.add(spotlight)

    // var bluemarker = new Character( new THREE.BoxGeometry( 0.02,0.02,0.02 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: null, bumpScale: 0.8, bumpMap: null }) )
    // bluemarker.move(spotlight.position.x+0.05,spotlight.position.y+0.354,spotlight.position.z-0.08)
    // bluemarker.mesh.rotation.set(0,0,0)
    // bluemarker.mesh.castShadow = true
    // bluemarker.mesh.receiveShadow = true
    // bluemarker.pushable = false
    // scene.add(bluemarker.mesh)


    // var lighter = new THREE.HemisphereLight("#ffffff", "#000000", 0.006)
    // scene.add(lighter)

    var spotlight2 = new THREE.SpotLight("#ddddaa", 0.0008)
    // spotlight2.castShadow = true
    spotlight2.shadow.mapSize.width = 1024*4
    spotlight2.shadow.mapSize.height = 1024*4
    spotlight2.position.set(-1.06,1,0.4)
    spotlight2.lookAt(-1,-5,0)
    scene.add(spotlight2)
    spotlight2.shadow.camera.near = 0.5; // default
    spotlight2.shadow.camera.far = 500; // default
    spotlight2.shadow.focus = 1; // default
    scene.add(spotlight2)

    let wallMap = textureLoader.load('/textures/rain-wall-text.png') 
    wallMap.wrapS = THREE.RepeatWrapping
    wallMap.wrapT = THREE.RepeatWrapping
    wallMap.repeat.set(2,15)
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let characters = {}



    let doorMap = textureLoader.load('/textures/door.png') 
    doorMap.wrapS = THREE.RepeatWrapping
    doorMap.wrapT = THREE.RepeatWrapping
    doorMap.repeat.set(1,1)
    let doorBump = textureLoader.load('/textures/doorB.png') 
    doorBump.wrapS = THREE.RepeatWrapping
    doorBump.wrapT = THREE.RepeatWrapping
    doorBump.repeat.set(1,1)

    var door = new Character( new THREE.BoxGeometry( 0.02,0.8,0.3 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshPhysicalMaterial( { map: doorMap, bumpScale: 0.01, bumpMap: doorBump }) )
    door.move(spotlight2.position.x+0.05,spotlight2.position.y+0.354,spotlight2.position.z-0.08)
    door.mesh.rotation.set(0,0,0)
    door.mesh.castShadow = true
    door.mesh.receiveShadow = true

    door.pushable = false

    scene.add( door.mesh )
    characters[door.mesh.id] = door

    // roof
    // { map: wallMap, transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 })
    // var char4wd7el71edr = new Character( new THREE.BoxGeometry( 1.369999999999997,0.030000000000000016,1.389999999999997 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: roofMap, bumpMap: roofBump, bumpScale: 0.0009 }) )
    // char4wd7el71edr.move(0,2.5,-0.3499999999999999)
    // char4wd7el71edr.mesh.rotation.set(0,0,0)
    // scene.add( char4wd7el71edr.mesh )
    // char4wd7el71edr.pushable = false
    // char4wd7el71edr.grabbable = false
    // char4wd7el71edr.mesh.receiveShadow = true
    // characters[char4wd7el71edr.mesh.id] = char4wd7el71edr

    let floorObjects = []

    // columns
    var charm6awq5verz = new Character( new THREE.BoxGeometry( 0.07,1.6399999999999989,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009}) )

    charm6awq5verz.move(0.6500000000000004,1.7,0.3200000000000006)
    charm6awq5verz.mesh.rotation.set(0,0,0)
    scene.add( charm6awq5verz.mesh )
    charm6awq5verz.pushable = false
    charm6awq5verz.grabbable = false
    charm6awq5verz.mesh.receiveShadow = true
    characters[charm6awq5verz.mesh.id] = charm6awq5verz
    floorObjects.push( charm6awq5verz )

    var charrjbg8ps445p = new Character( new THREE.BoxGeometry( 0.07,1.6499999999999988,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009}) )
    charrjbg8ps445p.move(-0.6700000000000004,1.7,0.3200000000000006)
    charrjbg8ps445p.mesh.rotation.set(0,0,0)
    scene.add( charrjbg8ps445p.mesh )
    charrjbg8ps445p.pushable = false
    charrjbg8ps445p.grabbable = false
    charrjbg8ps445p.mesh.receiveShadow = true
    characters[charrjbg8ps445p.mesh.id] = charrjbg8ps445p
    floorObjects.push( charrjbg8ps445p )

    var charoxfjg4clrw = new Character( new THREE.BoxGeometry( 0.06000000000000001,1.6399999999999989,0.06000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009}) )
    charoxfjg4clrw.move(-0.6600000000000004,1.7,-1.0300000000000002)
    charoxfjg4clrw.mesh.rotation.set(0,0,0)
    scene.add( charoxfjg4clrw.mesh )
    charoxfjg4clrw.pushable = false
    charoxfjg4clrw.grabbable = false
    charoxfjg4clrw.mesh.receiveShadow = true
    characters[charoxfjg4clrw.mesh.id] = charoxfjg4clrw
    floorObjects.push( charoxfjg4clrw )

    var char4rsqwejs7bc = new Character( new THREE.BoxGeometry( 0.07,1.6399999999999989,0.05000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009}) )
    char4rsqwejs7bc.move(0.6600000000000004,1.7,-1.0300000000000002)
    char4rsqwejs7bc.mesh.rotation.set(0,0,0)
    scene.add( char4rsqwejs7bc.mesh )
    char4rsqwejs7bc.pushable = false
    char4rsqwejs7bc.grabbable = false
    char4rsqwejs7bc.mesh.receiveShadow = true
    characters[char4rsqwejs7bc.mesh.id] = char4rsqwejs7bc
    floorObjects.push( char4rsqwejs7bc )

    // go board
    var char24xq7w9ca9 = new GoBoard(wallMap, wallBump)
    char24xq7w9ca9.move(0,1.19,-0.9499999999999999)
    char24xq7w9ca9.mesh.rotation.set(0,0,0)
    scene.add( char24xq7w9ca9.mesh )
    char24xq7w9ca9.pushable = false
    char24xq7w9ca9.grabbable = false
    characters[char24xq7w9ca9.mesh.id] = char24xq7w9ca9
    floorObjects.push( char24xq7w9ca9 )

    let tableMap = textureLoader.load('/textures/rain-table-text.jpg') 
    tableMap.wrapS = THREE.RepeatWrapping
    tableMap.wrapT = THREE.RepeatWrapping
   
    // let tableMapA = textureLoader.load('/textures/rain-table-textA.png') 
    // tableMapA.wrapS = THREE.RepeatWrapping
    // tableMapA.wrapT = THREE.RepeatWrapping
   
    let tableMapB = textureLoader.load('/textures/rain-table-textB.png') 
    tableMapB.wrapS = THREE.RepeatWrapping
    tableMapB.wrapT = THREE.RepeatWrapping

    // crate
    var charqfgf20fm3nd = new Character( new THREE.BoxGeometry( 0.2100000000000001,0.2200000000000001,0.2000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: tableMap, bumpScale: 0.8, bumpMap: tableMapB }) )
    charqfgf20fm3nd.move(0.0900000000000003,1.2,-0.66)
    charqfgf20fm3nd.mesh.rotation.set(0,0,0)
    charqfgf20fm3nd.mesh.castShadow = true
    charqfgf20fm3nd.mesh.receiveShadow = true
    scene.add( charqfgf20fm3nd.mesh )
    characters[charqfgf20fm3nd.mesh.id] = charqfgf20fm3nd
 
     // crate2
    var charqfgf20fm3nd2 = new Character( new THREE.BoxGeometry( 0.2100000000000001,0.2200000000000001,0.2000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: tableMap, bumpScale: 0.8, bumpMap: tableMapB }) )
    charqfgf20fm3nd2.move(-0.18,1.9,-0.66)
    charqfgf20fm3nd2.mesh.rotation.set(2,2,0)
    charqfgf20fm3nd2.mesh.castShadow = true
    charqfgf20fm3nd2.mesh.receiveShadow = true
    scene.add( charqfgf20fm3nd2.mesh )
    characters[charqfgf20fm3nd2.mesh.id] = charqfgf20fm3nd2
 console.log( 'its ', charqfgf20fm3nd2.mesh.id )


    // da blox
    var box
    var boxPositions = []
    let bp


    for(var a=0; a<3;a++){
      for(var b=0; b<3;b++){
        for(var c=0; c<3;c++){
          bp = {}
          bp["a"] = a * 0.1 - 0.092
          bp["b"] = b * 0.1 + 0.4 + FLOOR
          bp["c"] = c * 0.1 - 1.042
          boxPositions.push( bp )
        }
      }
    }


    // table
    var charctw2g1t5rg5 = new Character( new THREE.BoxGeometry( 0.3100000000000002,0.39000000000000026,0.34000000000000025 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [110,110,110], new THREE.MeshStandardMaterial( { map: tableMap, bumpScale: 0.8, bumpMap: tableMapB}) )
    charctw2g1t5rg5.move(-0.4,1.008,-0.9399999999999999)
    charctw2g1t5rg5.mesh.rotation.set(0,0,0)
    charctw2g1t5rg5.pushable = false
    charctw2g1t5rg5.grabbable = false
    charctw2g1t5rg5.castShadow = true
    charctw2g1t5rg5.receiveShadow = true
    scene.add( charctw2g1t5rg5.mesh )
    characters[charctw2g1t5rg5.mesh.id] = charctw2g1t5rg5
    floorObjects.push( charctw2g1t5rg5 )

    // table2
    var charctw2g1t5rg52 = new Character( new THREE.BoxGeometry( 0.3100000000000002,0.36000000000000026,0.94000000000000025 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [110,110,110], new THREE.MeshStandardMaterial( { map: tableMap, bumpScale: 0.8, bumpMap: tableMapB}) )
    charctw2g1t5rg52.move(-0.8,1.008,-0.4399999999999999)
    charctw2g1t5rg52.mesh.rotation.set(0,0,0)
    charctw2g1t5rg52.pushable = false
    charctw2g1t5rg52.grabbable = false
    charctw2g1t5rg52.castShadow = true
    charctw2g1t5rg52.receiveShadow = true
    scene.add( charctw2g1t5rg52.mesh )
    characters[charctw2g1t5rg52.mesh.id] = charctw2g1t5rg52
    floorObjects.push( charctw2g1t5rg52 )

    // table3
    var charctw2g1t5rg53 = new Character( new THREE.BoxGeometry( 0.3100000000000002,0.36000000000000026,0.34000000000000025 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [110,110,110], new THREE.MeshStandardMaterial( { map: tableMap, bumpScale: 0.8, bumpMap: tableMapB}) )
    charctw2g1t5rg53.move(0,1.008,-0.9399999999999999)
    charctw2g1t5rg53.mesh.rotation.set(0,0,0)
    charctw2g1t5rg53.pushable = false
    charctw2g1t5rg53.grabbable = false
    charctw2g1t5rg53.castShadow = true
    charctw2g1t5rg53.receiveShadow = true
    scene.add( charctw2g1t5rg53.mesh )
    characters[charctw2g1t5rg53.mesh.id] = charctw2g1t5rg53
    floorObjects.push( charctw2g1t5rg53 )

    // floor
    let floorMap = textureLoader.load('/textures/rain-wood-floor.png') 
    floorMap.wrapS = THREE.RepeatWrapping
    floorMap.wrapT = THREE.RepeatWrapping
    floorMap.repeat.set(30,4)
    let floorBump = textureLoader.load('/textures/rain-wood-floorB.png') 
    floorBump.wrapS = THREE.RepeatWrapping
    floorBump.wrapT = THREE.RepeatWrapping
    floorBump.repeat.set(30,4)

    var floor = new JunkPiece(new THREE.BoxGeometry(1.8, 0.1, 2.2), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshPhysicalMaterial( { map: floorMap, bumpMap: floorBump, bumpScale: 0.0015 }) )
    // huh
    floor.setPosition(-0.1,FLOOR,0)
    floor.pushable = false
    floor.grabbable = false
    // :D
    floor.mesh.receiveShadow = true
    // add floor to track
    characters[floor.mesh.id] = floor
    scene.add(floor.mesh)

    floorObjects.push( floor )

    var roof = new Character( new THREE.BoxGeometry( 1.6,0.1,1.6 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: floorMap, clearcoat: 0.4, transmission: 0, bumpMap: floorBump, bumpScale: 0.0009}) )
    roof.move(0,2.4,-0.4)
    roof.mesh.rotation.set(0,0,0)
    scene.add( roof.mesh )
    roof.pushable = false
    roof.grabbable = false
    roof.mesh.receiveShadow = true
    characters[roof.mesh.id] = roof
    // floorObjects.push( roof )

    // sounds
    var sounds = {}
    // rain in the sky
    let sound = new Sound("rain1", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound.move(0.4, 3.2,-0.7)
    sound.routePoints = [ [0.4, 3.2,-0.7], [-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7] ]
    sounds[sound.name] = sound

    // wider route
    let sound1 = new Sound("rain2", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound1.move(-2.6, 3.2,2.9)
    sound1.routePoints = [ [2.6, 3.2,-2.9], [-2.6, 3.2,2.9], [2.6, 3.2,2.9], [2.6, 3.2,-2.9] ]
    sounds[sound1.name] = sound1

    // same route as first one
    // let sound2 = new Sound("rain3", "/sounds/rain-Rclip.mp3", Math.max(0.4, Math.random() * 0.89 ) , true, true)
    // sound2.move(0.4, 3.2,-0.7)
    // sound2.routePoints = [[-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7], [0.4, 3.2,-0.7] ]
    // sounds[sound2.name] = sound2

    // wioder
    let sound3 = new Sound("rain4", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound3.move(0-3.6, 3.8,2.9)
    sound3.routePoints = [[-3.6, 3.8,2.9], [3.6, 3.8,2.9], [3.6, 3.8,-2.9], [3.6, 3.8,-2.9]]
    sounds[sound3.name] = sound3

    let sound7 = new Sound("relaxrain", "/sounds/freerelax-rain-clipped-short.mp3", 2, true, true)
    sound7.move(-0.4,1.8,-0.4)
    // sound7.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound7.name] = sound7

    let sound8 = new Sound("stream", "/sounds/gpStreamClip-short.mp3", 0.5, true, true)
    sound8.move(0,-1,-2)
    // sound8.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound8.name] = sound8

    // thunders
    let sound4 = new Sound("thunder1", "/sounds/freerelax-thunder4.mp3", 1, false, false)
    sound4.move(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound4.name] = sound4
    
    let sound5 = new Sound("thunder2", "/sounds/freerelax-thunder6.mp3", 1, false, false)
    sound5.move(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound5.name] = sound5
    
    super(backgroundHex, characters, floorObjects, sounds)

    let boxClick = () => {
      // shoot it in a random direction
      for(var i=0; i<this.boxIds.length; i++){
        this.characters[this.boxIds[i]].pushable = true
        this.characters[this.boxIds[i]].accx = Math.random()
        this.characters[this.boxIds[i]].accy = Math.random()
        this.characters[this.boxIds[i]].accz = Math.random()
      }
      
    }

    boxClick = boxClick.bind(this)

    this.boxIds = []
    this.boxTimer = new Timer()
    this.boxTimer.start()
    
    for(var i=0; i<27; i++){

      box = new Character( new THREE.BoxGeometry(0.07,0.07,0.07), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,0,255], new THREE.MeshPhysicalMaterial( { color: "#ff00ff" }), boxClick )
      box.move( boxPositions[i].a, boxPositions[i].b, boxPositions[i].c )
      box.mesh.castShadow = true
      box.mesh.receiveShadow = true
      box.pushable = false
      box.clickable = true
      box.scalable = true

      scene.add( box.mesh )
      this.characters[box.mesh.id] = box
      this.boxIds.push(box.mesh.id)
    }    

    // for updown buttons
    this.spotlight = spotlight

    this.thunderTimer = new Timer()
    this.thunderTimer.start()

    this.loadModel('/models/desklamp.glb', (model) => {
      this.models['/models/desklamp.glb'] = model
      this.desklamp = new DeskLamp()
    })

    // let starColor = "#dddd22"
    this.starSpeed = 1
    let starColor = [221,221,34]
    this.stars = []

    // // stars
    let starsGeo, star, numStars
    let brightness = 1
    // reused for rain 
    let pt,x,y,z
    for(var q=0; q<12; q++){

      starsGeo = new THREE.Geometry();
      numStars = 500 + Math.floor( Math.random() * 500)
      for(let i=0;i<numStars;i++) {
        // x = Math.random() * 200 - 100
        // y = Math.random() * 200 - 100
        // z = Math.random() * 200 - 100

        pt = util.randomPointAway(128,4)

        star = new THREE.Vector3( pt[0],pt[1],pt[2] )
        starsGeo.vertices.push(star);
      }
      let starsMaterial = new THREE.PointsMaterial({
        color: util.rgbToHex(starColor[0],starColor[1],starColor[2]),
        // size: 0.03
        size: Math.random() * 0.02 + 0.03

      })
      let thisRain = new THREE.Points(starsGeo,starsMaterial)
      this.stars.push( thisRain )
      scene.add( thisRain )

      // vary next star set
      starColor[0] = Math.max ( Math.floor( brightness * starColor[0] + Math.random() * 120 - 60 ), 0 )
      starColor[1] = Math.max ( Math.floor( brightness * starColor[1] +  Math.random() * 120 - 60 ), 0 )
      starColor[2] = Math.max ( Math.floor( brightness * starColor[2] +  Math.random() * 120 - 60 ), 0 )

      // make next star set dimmer
      brightness = brightness - (0.05 + Math.random() * 0.1)
    }

    let pgroup = new THREE.Group()
    let p,pc,pg,pm,pp, pos, gp,gpscale,gpopac
    for(var i=0; i<16; i++){
      pg = new THREE.SphereGeometry(0.1+Math.random()/2, 32, 32)

      pc = util.randomHex(180)
      pm = new THREE.MeshBasicMaterial({color: pc})

      p = new THREE.Mesh(pg,pm)

      pp = util.randomPointAway(64,16)
      // pp = util.randomPointAway(2,1)
      pos = new THREE.Vector3( pp[0],pp[1],pp[2] )
      p.position.set(pos.x,pos.y,pos.z)
      // p.position.set(0,0,0)
      pgroup.add(p)

      
      gpscale = Math.random() * 1.8
      gpopac = 0.8/gpscale

      pm = new THREE.MeshBasicMaterial({blending: THREE.AdditiveBlending, transparent: true, opacity: gpopac, color: util.randomHex(255) })
      gp = new THREE.Mesh(pg, pm)
      gp.scale.set(gpscale,gpscale,gpscale)
      gp.position.set(p.position.x,p.position.y,p.position.z)
      // p.position.set(0,0,0)
      pgroup.add(gp)

    }

    this.planets = pgroup
    scene.add(pgroup)

    // rain baby
    let rainGeo, rainDrop
    rainGeo = new THREE.Geometry();
    for(let i=0;i<64;i++) {
      x = Math.random() * 60 - 30
      y = Math.random() * 110 - 10
      z = Math.random() * 60 - 30

      if(x < 2 && x > -2){
        x = x + 2
      }
      if(z < 2 && z > -2){
        z = z + 2
      }

      rainDrop = new THREE.Vector3(x,y,z)
      rainDrop.velocity = 0
      rainGeo.vertices.push(rainDrop);
    }

    let rainMaterial = new THREE.PointsMaterial({
      color: "#777799",
      size: 0.05,
      // opacity: 0.2
    })

    this.rainSpinAmount = 0.0008
    this.rain = new THREE.Points(rainGeo,rainMaterial)
    this.rain.castShadow = false
    this.rain.receiveShadow = false
    scene.add(this.rain)

    this.clouds = []
    // let cloudTexture = textureLoader.load("/textures/cloud.png")
    // cloudTexture.wrapS = THREE.RepeatWrapping
    // cloudTexture.wrapT = THREE.RepeatWrapping
    // // cloudTexture.repeat = 10
    let cloudGeo = new THREE.PlaneBufferGeometry(160,160);
    // let cloudMaterial = new THREE.MeshBasicMaterial({
    //   // this prevents tearing at transparent edges between different cloud pieces
    //   // depthTest: false,
    //   color: "#880088",
    //   opacity: 0.02,
    //   map: cloudTexture,
    //   transparent: true
    // })

    let cloudTexture2 = textureLoader.load("/textures/cloud2.png")
    cloudTexture2.wrapS = THREE.RepeatWrapping
    cloudTexture2.wrapT = THREE.RepeatWrapping
    // cloudTexture2.repeat = 1
    let cloudMaterial2 = new THREE.MeshBasicMaterial({
      // depthTest: false,
      color: "#110011",
      opacity: 0.22,
      map: cloudTexture2,
      transparent: true,
    })

    // let cloudTexture3 = textureLoader.load("/textures/cloud3.png")
    // cloudTexture3.wrapS = THREE.RepeatWrapping
    // cloudTexture3.wrapT = THREE.RepeatWrapping
    // // cloudTexture3.repeat = 1
    // let cloudMaterial3 = new THREE.MeshBasicMaterial({
    //   depthTest: false,
    //   color: "#880088",
    //   // opacity: 0.02,
    //   map: cloudTexture3,
    //   transparent: true
    // })

    let cloud, rando
    y = 20

    for(let p=0; p<1; p++) {
      // rando = Math.random()
      // if(rando<0.33){
      //   cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
      // }else if(Math.random()<0.66){
      //   cloud = new THREE.Mesh(cloudGeo,cloudMaterial2);
      // } else {
      //   cloud = new THREE.Mesh(cloudGeo,cloudMaterial3);
      // }
    cloud = new THREE.Mesh(cloudGeo,cloudMaterial2);


      x = Math.random() * 20 - 10
      y = y
      z = Math.random() * 20 - 10

      cloud.position.set(
        x,y,z
      )

      cloud.rotation.x = util.radian(90)
      // cloud.rotation.y = -0.12
      cloud.rotation.z = Math.random()*360
      // cloud.material.opacity = 0.1

      cloud.rotationSpeed = 0.0005 * Math.random() - 0.00025

      // too much damn shadow
      cloud.castShadow = false
      cloud.receiveShadow = false

      this.clouds.push(cloud)
      scene.add(cloud)
    }

    // mountain plane
    let mountainGeo, mountainMat, selectedMap, mountainMap, mountainMap2, mountainMap3, forestMap

    forestMap = textureLoader.load("/textures/forest-small.png")
    mountainGeo = new THREE.SphereGeometry( 0.8, 32, 32 )

    // xyz
    this.mountains = []
    for(var i=0; i<6; i++){
      mountainMat = new THREE.MeshBasicMaterial( { map: forestMap, color: "#000100", side: THREE.DoubleSide } )  
      
      this.mountains[i] = new THREE.Mesh( mountainGeo, mountainMat )
      // too much shadow from clouds mane
      this.mountains[i].receiveShadow = false
      this.mountains[i].castShadow = false
      // at least 4 away, random within 0-5, pos or neg
      x = util.randomSign() * (Math.random() * 1 + 1.3)
      y = -0.4
      z = util.randomSign() * (Math.random() * 1 + 1.3)

      this.mountains[i].position.set(x, y ,z)
      this.mountains[i].scale.set(1 + Math.random(), 1 + Math.random(), 1 + Math.random())
      scene.add(this.mountains[i])
    }


    this.loadModel('/models/stereo.glb', (model) => {

      // we'll ref the model through tis inside MusicPlayer
      this.models['/models/stereo.glb'] = model

      this.musicPlayer = new MusicPlayer()
      this.musicPlayer.pushable = false
      this.musicPlayer.grabbable = false
      this.musicPlayer.move(-0.49,1.24,-0.9499999999999999)

      this.characters[this.musicPlayer.mesh.id] = this.musicPlayer

      scene.add( this.musicPlayer.mesh )


      // needs to be laoded here because it uses musicPlayer in its click actions
      let rempos = new THREE.Vector3(-0.3,FLOOR+0.5,-0.78)
      this.remote = new Remote(rempos)
      this.characters[this.remote.mesh.id] = this.remote
      scene.add(this.remote.mesh)


    })

    // light.lookAt(this.musicPlayer.mesh)
    this.createAlbums()

    this.goBoard = char24xq7w9ca9


    // this abomination is because we need to wait until these models are loaded before using them, or else we just load them 8 times 
    this.loadModel('/models/pottedplant.glb', (model) => {

      // thats one
      console.log( 'one time' )
      this.models['/models/pottedplant.glb'] = model

      this.loadModel('/models/plant2.glb', (model) => {

        // thats two
        console.log( 'two time' )
        this.models['/models/plant2.glb'] = model


        this.loadModel('/models/plant3strip.glb', (model) => {

          // thats two
          console.log( 'three time' )
          this.models['/models/plant3strip.glb'] = model


          // now actually use them here:
          let depth, lat
          for(var i=0; i<5; i++){
            depth = 0.4 + Math.random()/6
            lat = i/4 - 0.4
            if(Math.random() < 0.33 ){
              // ensure that its loaded, then make it
              this.createPlant(this.models['/models/pottedplant.glb'].clone(), new THREE.Vector3(lat,1,depth), 0.06 )
            } else if(Math.random() < 0.66) {
              this.createPlant(this.models['/models/plant2.glb'].clone(), new THREE.Vector3(lat,1.04,depth), 0.005 )  
            } else {
              this.createPlant(this.models['/models/plant3strip.glb'].clone(), new THREE.Vector3(lat,0.98,depth), 0.04 )  
            }
          }

          for(var i=0; i<3; i++){
            depth = 0.4 + Math.random()/6
            lat = i/5 - 0.8
            if(Math.random() < 0.33 ){
              // ensure that its loaded, then make it
              this.createPlant(this.models['/models/pottedplant.glb'].clone(), new THREE.Vector3(depth,1,lat), 0.06 )
            } else if(Math.random() < 0.66) {
              this.createPlant(this.models['/models/plant2.glb'].clone(), new THREE.Vector3(depth,1.04,lat), 0.005 )  
            } else {
              this.createPlant(this.models['/models/plant3strip.glb'].clone(), new THREE.Vector3(depth,0.98,lat), 0.04 )  
            }
          }


        })

      })

    })

  }

  createPlant(mesh, position, scale){ 
    // mesh.material = new THREE.MeshPhysicalMaterial({map: mesh.material.map, color: mesh.material.color, side: THREE.DoubleSide})
    mesh.castShadow = true
    mesh.receiveShadow = true
    // mesh.material = new THREE.MeshBasicMaterial({ color: new THREE.Color("#333333"), map: mesh.material.map, side: THREE.DoubleSide, metalness: 0 })

    let plant = new Character(null, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], null, null, null, mesh)

    let sizeDiff = 1 + Math.random()/10
    plant.mesh.scale.x = scale * sizeDiff
    plant.mesh.scale.y = scale * sizeDiff
    plant.mesh.scale.z = scale * sizeDiff
    plant.mesh.position.set(position.x, position.y, position.z)

    plant.pushable = false
    plant.grabbable = true
    plant.clickable = false
    plant.droppable = false
    plant.rotatable = false

// boom
    this.characters[plant.mesh.id] = plant
    scene.add(plant.mesh)
  }

  createAlbums(){
    // this.albums = {}

    let labDreamUrls = [
      "https://fog-places.s3.amazonaws.com/LabDream/01+-+how.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/02+-+bowl.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/03+-+crack.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/04+-+dodo.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/05+-+puck.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/06+-+staff.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/07+-+san.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/08+-+top.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/09+-+chan.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/10+-+pie.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/11+-+waka.mp3",
      "https://fog-places.s3.amazonaws.com/LabDream/12+-+paw.mp3"
    ]

    let labDream = new Album("Blue Light", "https://fog-places.s3.amazonaws.com/LabDream/LabDreamCover.png", labDreamUrls)
    // this.albums["labDream"] = labDream

    labDream.mesh.position.set( -0.8, 1.4, -0.8 )
    scene.add(labDream.mesh)

    this.characters[labDream.mesh.id] = labDream

    let lateContactUrls = [
      "https://fog-places.s3.amazonaws.com/LateContactMastered/01.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/02.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/03.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/04.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/05.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/06.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/07.mp3",
      "https://fog-places.s3.amazonaws.com/LateContactMastered/08.mp3"
    ]


    let lateContact = new Album("Blue Light", "https://fog-places.s3.amazonaws.com/LateContactMastered/LateContactMasteredCover.png", lateContactUrls)
    // this.albums["lateContact"] = lateContact

    lateContact.mesh.position.set( -0.8, 1.4, -0.6 )
    scene.add(lateContact.mesh)

    this.characters[lateContact.mesh.id] = lateContact


    // osunds
    let blueLightUrls = [
      "https://fog-places.s3.amazonaws.com/BlueLight/01+-+frek.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/02+-+bact.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/03+-+swoud.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/04+-+lenschill.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/05+-+gauss.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/06+-+lye.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/07+-+tru.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/08+-+roux.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/09+-+dire.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/10+-+lenssmoke.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/11+-+whii.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/12+-+eoop.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/13+-+uup.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/14+-+sunk.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/15+-+brain.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/16+-+lenssax2.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/17+-+cut.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/18+-+pong.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/19+-+notha.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/20+-+grau.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/21+-+sleap.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/22+-+fold.mp3",
      "https://fog-places.s3.amazonaws.com/BlueLight/23+-+boog.mp3",
    ]

    let blueLight = new Album("Blue Light", "https://fog-places.s3.amazonaws.com/BlueLight/BlueLightCover.png", blueLightUrls)
    // this.albums["BlueLight"] = blueLight

    blueLight.mesh.position.set( -0.8, 1.4, -0.4 )
    scene.add(blueLight.mesh)

    this.characters[blueLight.mesh.id] = blueLight
  }

  randomThunderName(){
    let names = ["thunder1","thunder2"]
    return names[Math.floor(Math.random() * names.length)];
  }

  handleRain(){
    this.rain.rotation.y += 0.01

    this.rain.geometry.vertices.forEach(p => {
      p.velocity -= 0.004 + Math.random() * 0.002;
      p.y += p.velocity

      // p.x += Math.random() * 0.01 - 0.005
      // p.z += Math.random() * 0.01 - 0.005

      if (p.y < -10) {
        p.y = 10
        p.velocity = 0
      }
    })
    this.rain.geometry.verticesNeedUpdate = true
    this.rain.rotation.y += this.rainSpinAmount

    // change rainspin amount by random factor
    if(Math.random() > 0.799){

      if( Math.abs( this.rainSpinAmount ) > 0.000004 ){

      } else {
        // normal speed change
        this.rainSpinAmount += Math.random() * 0.000005 - 0.00000025
      }
    }
  }

  customHandle(){

    if(this.boxIds){
      if(this.boxTimer.time() > 12000){
        this.boxTimer.reset()
        for(var i=0; i<this.boxIds.length; i++){
          // this.characters[this.boxIds[i]].mesh.scale.set( Math.random() * 3,Math.random() * 3,Math.random() * 3 )
          // this.characters[this.boxIds[i]].scalex = Math.random() * 1.33
          // this.characters[this.boxIds[i]].scaley = Math.random() * 1.33
          // this.characters[this.boxIds[i]].scalez = Math.random() * 1.33


           // choose new orientation every 3s
          this.characters[this.boxIds[i]].rotx = Math.random() * Math.PI / 8
          this.characters[this.boxIds[i]].roty = Math.random() * Math.PI / 8
          this.characters[this.boxIds[i]].rotz = Math.random() * Math.PI / 8
        }  
      }
      
    }

    if(this.stars){
      // slowly rotate the star field, just like mom used to make!
      // this.stars.rotation0.x += 0.00001

      for(var i=0; i<this.stars.length; i++){
        // this.stars[i].rotation.x += 0.00001
        this.stars[i].rotation.x += 0.00006 * this.starSpeed
      }
    }
    if(this.planets){
      this.planets.rotation.x += 0.00008 * this.starSpeed
    }

    this.clouds.forEach(p => {
      p.rotation.z -= p.rotationSpeed
    })

    this.handleRain()

    // thunder sound fx
    if(this.thunderTimer.time() > 2000){

      if(Math.random() > 0.9995){
        this.thunderTimer.reset()
        let randomThunderName = this.randomThunderName()
        console.log( 'thunder now' )
        // reposition each time
        this.sounds[randomThunderName].move(Math.random()*3, 3.4, Math.random()*3)

        this.sounds[randomThunderName].setVolume( Math.random()*2 )

        this.sounds[randomThunderName].play()
      }
    }
  }
}

export { RelaxingRain }
