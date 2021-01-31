import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { JunkPiece } from "./JunkPiece.js"
import { Sound } from "./Sound.js"
import { MusicPlayer } from "./MusicPlayer.js"
import { GoBoard } from "./GoBoard.js"
import { Album } from "./Album.js"
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

    var spotlight = new THREE.SpotLight("#0000bb", 0.018)
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024*4
    spotlight.shadow.mapSize.height = 1024*4
    spotlight.position.set(-0.6600000000000004,2,-1.0300000000000002)
    spotlight.lookAt(0,1.2,-0.3499999999999999)

    // light.shadow.mapSize.width = 512; // default
    // light.shadow.mapSize.height = 512; // default
    spotlight.shadow.camera.near = 0.5; // default
    spotlight.shadow.camera.far = 30; // default
    spotlight.shadow.focus = 1; // default

    scene.add(spotlight)

    // var lighter = new THREE.HemisphereLight("#ffffff", "#000000", 0.006)
    // scene.add(lighter)

    // var spotlight2 = new THREE.SpotLight("#dddddd", 0.002)
    // spotlight2.castShadow = true
    // spotlight2.shadow.mapSize.width = 1024*4
    // spotlight2.shadow.mapSize.height = 1024*4
    // spotlight2.position.set(-1,1.8,0)
    // spotlight2.lookAt(1,-1,2)
    // scene.add(spotlight2)
    // // light.shadow.mapSize.width = 512; // default
    // // light.shadow.mapSize.height = 512; // default
    // spotlight2.shadow.camera.near = 0.5; // default
    // spotlight2.shadow.camera.far = 500; // default
    // spotlight2.shadow.focus = 1; // default
    // scene.add(spotlight2)
    
    // light from music player
    // var lcdLight = new THREE.PointLight("#0088dd", 0.0044)
    // lcdLight.castShadow = true
    // lcdLight.shadow.mapSize.width = 1024*4
    // lcdLight.shadow.mapSize.height = 1024*4
    // lcdLight.position.set(-0.4,1.25,-0.9499999999999999)
    // lcdLight.lookAt(1,-1,-2)
    // lcdLight.shadow.camera.near = 0.5; // default
    // lcdLight.shadow.camera.far = 500; // default
    // lcdLight.shadow.focus = 1; // default
    // lcdLight.lookAt(-0.4,0.825,-0.9499999999999999)
    // scene.add(lcdLight)


    // var mountainLight = new THREE.SpotLight("#bbbbbb", 0.41)
    // mountainLight.castShadow = false
    // mountainLight.shadow.mapSize.width = 1024*4
    // mountainLight.shadow.mapSize.height = 1024*4
    // mountainLight.position.set(0,-3,0)
    // mountainLight.lookAt(0,-5,0)

    // // light.shadow.mapSize.width = 512; // default
    // // light.shadow.mapSize.height = 512; // default
    // mountainLight.shadow.camera.near = 0.5; // default
    // mountainLight.shadow.camera.far = 500; // default
    // mountainLight.shadow.focus = 1; // default
    // scene.add(mountainLight)

    // all my charllies
    // let roofMap = textureLoader.load('/textures/rain-wall-text.png') 
    // roofMap.wrapS = THREE.RepeatWrapping
    // roofMap.wrapT = THREE.RepeatWrapping
    // roofMap.repeat.set(2,2)
    // let roofBump = textureLoader.load('/textures/rain-wall-textB.png') 
    // roofBump.wrapS = THREE.RepeatWrapping
    // roofBump.wrapT = THREE.RepeatWrapping
    // roofBump.repeat.set(2,2)

    let wallMap = textureLoader.load('/textures/rain-wall-text.png') 
    wallMap.wrapS = THREE.RepeatWrapping
    wallMap.wrapT = THREE.RepeatWrapping
    wallMap.repeat.set(2,15)
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let characters = {}

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
   
    let tableMapA = textureLoader.load('/textures/rain-table-textA.png') 
    tableMapA.wrapS = THREE.RepeatWrapping
    tableMapA.wrapT = THREE.RepeatWrapping
   
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
    let sound2 = new Sound("rain3", "/sounds/rain-Rclip.mp3", Math.max(0.4, Math.random() * 0.89 ) , true, true)
    sound2.move(0.4, 3.2,-0.7)
    sound2.routePoints = [[-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7], [0.4, 3.2,-0.7] ]
    sounds[sound2.name] = sound2

    // wioder
    let sound3 = new Sound("rain4", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound3.move(0-3.6, 3.8,2.9)
    sound3.routePoints = [[-3.6, 3.8,2.9], [3.6, 3.8,2.9], [3.6, 3.8,-2.9], [3.6, 3.8,-2.9]]
    sounds[sound3.name] = sound3

    let sound7 = new Sound("relaxrain", "/sounds/freerelax-rain-clipped.mp3", 2, true, true)
    sound7.move(-0.4,1.8,-0.4)
    // sound7.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound7.name] = sound7

    let sound8 = new Sound("stream", "/sounds/gpStreamClip.mp3", 0.5, true, true)
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


    this.plants = {}
    // carries our RelaxingRain 'this' when passed in as callback to model load

    this.thunderTimer = new Timer()
    this.thunderTimer.start()

    // // stars
    let starsGeo, star
    let x,y,z
    starsGeo = new THREE.Geometry();
    for(let i=0;i<1000;i++) {
      x = Math.random() * 200 - 100
      y = Math.random() * 200 - 100
      z = Math.random() * 200 - 100

      star = new THREE.Vector3( x,y,z )
      starsGeo.vertices.push(star);
    }

    let starsMaterial = new THREE.PointsMaterial({
      color: "#dddd22",
      size: 0.03
      // size: 0.02,
    })
    this.stars = new THREE.Points(starsGeo,starsMaterial)
    scene.add(this.stars)

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
    let cloudTexture = textureLoader.load("/textures/cloud.png")
    cloudTexture.wrapS = THREE.RepeatWrapping
    cloudTexture.wrapT = THREE.RepeatWrapping
    // cloudTexture.repeat = 10
    let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      // this prevents tearing at transparent edges between different cloud pieces
      depthTest: false,
      // color: "#FF00FF",
      color: "#000000",
      opacity: 0.003,
      map: cloudTexture,
      transparent: true
    })

    let cloudTexture2 = textureLoader.load("/textures/cloud2.png")
    cloudTexture2.wrapS = THREE.RepeatWrapping
    cloudTexture2.wrapT = THREE.RepeatWrapping
    // cloudTexture2.repeat = 1
    let cloudMaterial2 = new THREE.MeshLambertMaterial({
      depthTest: false,
      // color: "#FF00FF",
      color: "#000000",
      opacity: 0.03,
      map: cloudTexture2,
      transparent: true
    })

    let cloudTexture3 = textureLoader.load("/textures/cloud3.png")
    cloudTexture3.wrapS = THREE.RepeatWrapping
    cloudTexture3.wrapT = THREE.RepeatWrapping
    // cloudTexture3.repeat = 1
    let cloudMaterial3 = new THREE.MeshLambertMaterial({
      depthTest: false,
      // color: "#FF00FF",
      color: "#000000",
      opacity: 0.03,
      map: cloudTexture3,
      transparent: true
    })

    let cloud, rando
    for(let p=0; p<12; p++) {
      rando = Math.random()
      if(rando<0.33){
        cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
      }else if(Math.random()<0.66){
        cloud = new THREE.Mesh(cloudGeo,cloudMaterial2);
      } else {
        cloud = new THREE.Mesh(cloudGeo,cloudMaterial3);
      }
      x = Math.random() * 400 - 200
      y = 300
      z = Math.random() * 400 - 200

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
    let mountainGeo, mountainMat, selectedMap, mountainMap, mountainMap2, mountainMap3, forestMap, forestBump

    forestMap = textureLoader.load("/textures/forest.png")
    // forestBump = textureLoader.load("/textures/forestB.png")

    // mountainMap = textureLoader.load("/textures/mountainD.png")
    // mountainMap2 = textureLoader.load("/textures/mountain2D.png")
    // mountainMap3 = textureLoader.load("/textures/mountain3D.png")
    
    // mountainGeo = new THREE.PlaneGeometry( 10, 10, 100, 100 )
    mountainGeo = new THREE.SphereGeometry( 0.8, 32, 32 )

    // xyz
    this.mountains = []
    for(var i=0; i<6; i++){
      // rando = Math.random()
      // if(rando<0.33){
      //   selectedMap = mountainMap
      // }else if(Math.random()<0.66){
      //   selectedMap = mountainMap2
      // } else {
      //   selectedMap = mountainMap3
      // }

      // mountainMat = new THREE.MeshPhysicalMaterial( { map: forestMap, bumpMap: forestBump, color: "#ffffff", side: THREE.DoubleSide } )  
      mountainMat = new THREE.MeshBasicMaterial( { map: forestMap, color: "#000100", side: THREE.DoubleSide } )  
      
      // , displacementMap: selectedMap, displacementScale: 1, emissive: "#009900", emissiveIntensity: 0.01

      this.mountains[i] = new THREE.Mesh( mountainGeo, mountainMat )
      // too much shadow from clouds mane
      this.mountains[i].receiveShadow = false
      this.mountains[i].castShadow = false
      // at least 4 away, random within 0-5, pos or neg
      x = util.randomSign() * (Math.random() * 1 + 1.3)
      y = -0.4
      z = util.randomSign() * (Math.random() * 1 + 1.3)
      // x = 0
      // y = 0
      // z = 0

      this.mountains[i].position.set(x, y ,z)
      this.mountains[i].scale.set(1 + Math.random(), 1 + Math.random(), 1 + Math.random())
      // this.mountains[i].rotation.x = util.radian(90)
      // this.mountains[i].rotation.z = util.radian(Math.random())
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
      this.characters[this.musicPlayer.playButton.mesh.id] = this.musicPlayer.playButton
      this.characters[this.musicPlayer.stopButton.mesh.id] = this.musicPlayer.stopButton
      this.characters[this.musicPlayer.nextButton.mesh.id] = this.musicPlayer.nextButton
      this.characters[this.musicPlayer.prevButton.mesh.id] = this.musicPlayer.prevButton

      scene.add( this.musicPlayer.mesh )
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

        // now actually use them here:
        let depth, lat
        for(var i=0; i<10; i++){
          depth = 0.4 + Math.random()/6
          lat = i/6 - 0.8
          if(Math.random() > 0.5){
            // ensure that its loaded, then make it
            this.createPlant(this.models['/models/pottedplant.glb'].clone(), new THREE.Vector3(lat,1,depth), 0.06 )
          } else {
            this.createPlant(this.models['/models/plant2.glb'].clone(), new THREE.Vector3(lat,1.04,depth), 0.005 )  
          }
        }

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

    plant.rotx = plant.mesh.rotation.x
    plant.roty = plant.mesh.rotation.y
    plant.rotz = plant.mesh.rotation.z

    plant.pushable = false
    plant.grabbable = false
    plant.clickable = false
    plant.droppable = false

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

    if(this.stars){
      // slowly rotate the star field, just like mom used to make!
      this.stars.rotation.x += 0.00001
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