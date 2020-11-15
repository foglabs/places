import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { JunkPiece } from "./JunkPiece.js"
import { Sound } from "./Sound.js"
import { MusicPlayer } from "./MusicPlayer.js"
import { Album } from "./Album.js"
import { util, textureLoader, scene } from "./main.js"

class RelaxingRain extends Place {
  constructor(){
    var backgroundHex = "#030312"
    // var backgroundHex = "#FFFFFF"
    // var backgroundHex = "#000000"

    // I need a light
    let light = new THREE.SpotLight( 0xffffdd, 0.007, 100 )
    light.position.set( 1, 2, -2 )
    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
    let lightMarker = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,255], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
    lightMarker.setPosition(light.position.x,light.position.y,light.position.z)
    light.castShadow = true
    light.lookAt(0,1.0,1)
    light.shadow.mapSize.width = 1024*4
    scene.add( lightMarker.mesh )
    scene.add( light )

    var spotlight = new THREE.SpotLight("#0000bb", 0.018)
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024*4
    spotlight.shadow.mapSize.height = 1024*4
    spotlight.position.set(-2,2,-1)
    spotlight.lookAt(1.2,-0.3499999999999999)

    // light.shadow.mapSize.width = 512; // default
    // light.shadow.mapSize.height = 512; // default
    spotlight.shadow.camera.near = 0.5; // default
    spotlight.shadow.camera.far = 500; // default
    spotlight.shadow.focus = 1; // default

    scene.add(spotlight)


    // var spotlight2 = new THREE.SpotLight("#dddddd", 0.03)
    // spotlight2.castShadow = true
    // spotlight2.shadow.mapSize.width = 1024*4
    // spotlight2.shadow.mapSize.height = 1024*4
    // spotlight2.position.set(-1,1.8,0)
    // spotlight2.lookAt(1,-1,-2)

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


    // var mountainLight = new THREE.SpotLight("#bbbb00", 0.004)
    // mountainLight.castShadow = true
    // mountainLight.shadow.mapSize.width = 1024*4
    // mountainLight.shadow.mapSize.height = 1024*4
    // mountainLight.position.set(-5,4,-4)
    // mountainLight.lookAt(0,0,0)

    // // light.shadow.mapSize.width = 512; // default
    // // light.shadow.mapSize.height = 512; // default
    // mountainLight.shadow.camera.near = 0.5; // default
    // mountainLight.shadow.camera.far = 500; // default
    // mountainLight.shadow.focus = 1; // default
    // scene.add(mountainLight)

    // all my charllies
    let roofMap = textureLoader.load('/textures/rain-wall-text.png') 
    roofMap.wrapS = THREE.RepeatWrapping
    roofMap.wrapT = THREE.RepeatWrapping
    roofMap.repeat.set(2,2)
    let roofAlpha = textureLoader.load('/textures/rain-wall-textA.png') 
    roofAlpha.wrapS = THREE.RepeatWrapping
    roofAlpha.wrapT = THREE.RepeatWrapping
    roofAlpha.repeat.set(2,2)
    let roofBump = textureLoader.load('/textures/rain-wall-textB.png') 
    roofBump.wrapS = THREE.RepeatWrapping
    roofBump.wrapT = THREE.RepeatWrapping
    roofBump.repeat.set(2,2)

    let wallMap = textureLoader.load('/textures/rain-wall-text.png') 
    wallMap.wrapS = THREE.RepeatWrapping
    wallMap.wrapT = THREE.RepeatWrapping
    wallMap.repeat.set(2,15)
    let wallAlpha = textureLoader.load('/textures/rain-wall-textA.png') 
    wallAlpha.wrapS = THREE.RepeatWrapping
    wallAlpha.wrapT = THREE.RepeatWrapping
    wallAlpha.repeat.set(2,15)
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let characters = {}

    // roof
    // { map: wallMap, transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 })
    // var char4wd7el71edr = new Character( new THREE.BoxGeometry( 1.369999999999997,0.030000000000000016,1.389999999999997 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: roofMap, bumpMap: roofBump, bumpScale: 0.0009, alphaMap: roofAlpha }) )
    // char4wd7el71edr.move(0,2.5,-0.3499999999999999)
    // char4wd7el71edr.mesh.rotation.set(0,0,0)
    // scene.add( char4wd7el71edr.mesh )
    // char4wd7el71edr.pushable = false
    // char4wd7el71edr.grabbable = false
    // char4wd7el71edr.mesh.receiveShadow = true
    // characters[char4wd7el71edr.mesh.id] = char4wd7el71edr

    // columns
    var charm6awq5verz = new Character( new THREE.BoxGeometry( 0.07,1.6399999999999989,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009, alphaMap: wallAlpha}) )

    charm6awq5verz.move(0.6500000000000004,1.7,0.3200000000000006)
    charm6awq5verz.mesh.rotation.set(0,0,0)
    scene.add( charm6awq5verz.mesh )
    charm6awq5verz.pushable = false
    charm6awq5verz.grabbable = false
    charm6awq5verz.mesh.receiveShadow = true
    characters[charm6awq5verz.mesh.id] = charm6awq5verz

    var charrjbg8ps445p = new Character( new THREE.BoxGeometry( 0.07,1.6499999999999988,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009, alphaMap: wallAlpha}) )
    charrjbg8ps445p.move(-0.6700000000000004,1.7,0.3200000000000006)
    charrjbg8ps445p.mesh.rotation.set(0,0,0)
    scene.add( charrjbg8ps445p.mesh )
    charrjbg8ps445p.pushable = false
    charrjbg8ps445p.grabbable = false
    charrjbg8ps445p.mesh.receiveShadow = true
    characters[charrjbg8ps445p.mesh.id] = charrjbg8ps445p

    var charoxfjg4clrw = new Character( new THREE.BoxGeometry( 0.06000000000000001,1.6399999999999989,0.06000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009, alphaMap: wallAlpha}) )
    charoxfjg4clrw.move(-0.6600000000000004,1.7,-1.0300000000000002)
    charoxfjg4clrw.mesh.rotation.set(0,0,0)
    scene.add( charoxfjg4clrw.mesh )
    charoxfjg4clrw.pushable = false
    charoxfjg4clrw.grabbable = false
    charoxfjg4clrw.mesh.receiveShadow = true
    characters[charoxfjg4clrw.mesh.id] = charoxfjg4clrw

    var char4rsqwejs7bc = new Character( new THREE.BoxGeometry( 0.07,1.6399999999999989,0.05000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { transparent: false, map: wallMap, clearcoat: 0.4, transmission: 0, bumpMap: wallBump, bumpScale: 0.0009, alphaMap: wallAlpha}) )
    char4rsqwejs7bc.move(0.6600000000000004,1.7,-1.0300000000000002)
    char4rsqwejs7bc.mesh.rotation.set(0,0,0)
    scene.add( char4rsqwejs7bc.mesh )
    char4rsqwejs7bc.pushable = false
    char4rsqwejs7bc.grabbable = false
    char4rsqwejs7bc.mesh.receiveShadow = true
    characters[char4rsqwejs7bc.mesh.id] = char4rsqwejs7bc

    // go board
    var char24xq7w9ca9 = new Character( new THREE.BoxGeometry( 0.2700000000000002,0.008,0.3000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [50,50,50], new THREE.MeshPhysicalMaterial( { map: wallMap, bumpMap: wallBump, bumpScale: 0.002, alphaMap: wallAlpha, transparent: true }) )
    char24xq7w9ca9.move(-0.4,1.19,-0.9499999999999999)
    char24xq7w9ca9.mesh.rotation.set(0,0,0)
    scene.add( char24xq7w9ca9.mesh )
    char24xq7w9ca9.pushable = false
    char24xq7w9ca9.grabbable = false
    characters[char24xq7w9ca9.mesh.id] = char24xq7w9ca9
   
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
    var charqfgf20fm3nd = new Character( new THREE.BoxGeometry( 0.2100000000000001,0.2200000000000001,0.2000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: tableMap, alphaMap: tableMapA, bumpScale: 0.8, bumpMap: tableMapB }) )
    charqfgf20fm3nd.move(0.0900000000000003,1.2,-0.66)
    charqfgf20fm3nd.mesh.rotation.set(0,0,0)
    scene.add( charqfgf20fm3nd.mesh )
    characters[charqfgf20fm3nd.mesh.id] = charqfgf20fm3nd
 
     // crate2
    var charqfgf20fm3nd2 = new Character( new THREE.BoxGeometry( 0.2100000000000001,0.2200000000000001,0.2000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [150,150,150], new THREE.MeshPhysicalMaterial( { map: tableMap, alphaMap: tableMapA, bumpScale: 0.8, bumpMap: tableMapB }) )
    charqfgf20fm3nd2.move(-0.18,1.2,-0.66)
    charqfgf20fm3nd2.mesh.rotation.set(0,0,0)
    scene.add( charqfgf20fm3nd2.mesh )
    characters[charqfgf20fm3nd2.mesh.id] = charqfgf20fm3nd2
 
    // table
    var charctw2g1t5rg5 = new Character( new THREE.BoxGeometry( 0.3100000000000002,0.36000000000000026,0.34000000000000025 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [110,110,110], new THREE.MeshStandardMaterial( { map: tableMap, alphaMap: tableMapA, bumpScale: 0.8, bumpMap: tableMapB}) )
    charctw2g1t5rg5.move(-0.4,1.008,-0.9399999999999999)
    charctw2g1t5rg5.mesh.rotation.set(0,0,0)
    charctw2g1t5rg5.pushable = false
    charctw2g1t5rg5.grabbable = false
    scene.add( charctw2g1t5rg5.mesh )
    characters[charctw2g1t5rg5.mesh.id] = charctw2g1t5rg5

    // floor
    let textyMap = textureLoader.load('/textures/rain-wood-floor.png') 
    textyMap.wrapS = THREE.RepeatWrapping
    textyMap.wrapT = THREE.RepeatWrapping
    textyMap.repeat.set(30,4)
    let textyAlpha = textureLoader.load('/textures/rain-wood-floorA.png') 
    textyAlpha.wrapS = THREE.RepeatWrapping
    textyAlpha.wrapT = THREE.RepeatWrapping
    textyAlpha.repeat.set(30,4)
    let textyBump = textureLoader.load('/textures/rain-wood-floorB.png') 
    textyBump.wrapS = THREE.RepeatWrapping
    textyBump.wrapT = THREE.RepeatWrapping
    textyBump.repeat.set(30,4)

    var floor = new JunkPiece(new THREE.BoxGeometry(2.2, 0.1, 2.2), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshPhysicalMaterial( { map: textyMap, alphaMap: textyAlpha, bumpMap: textyBump, bumpScale: 0.0015 }) )
    floor.setPosition(0,FLOOR,0)
    floor.pushable = false
    floor.grabbable = false

    // :D
    floor.mesh.receiveShadow = true
    
    // add floor to track
    characters[floor.mesh.id] = floor
    scene.add(floor.mesh)

    // sounds
    var sounds = {}
    // rain in the sky
    let sound = new Sound("rain1", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound.move(0, 1.2,-0.7)
    sound.routePoints = [ [0.4, 3.2,-0.7], [-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7] ]
    sounds[sound.name] = sound

    // wider route
    let sound1 = new Sound("rain2", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound1.move(0, 1.2,-0.7)
    sound1.routePoints = [ [2.6, 3.2,-2.9], [-2.6, 3.2,2.9], [2.6, 3.2,2.9], [2.6, 3.2,-2.9] ]
    sounds[sound1.name] = sound1

    // same route as first one
    let sound2 = new Sound("rain3", "/sounds/rain-Rclip.mp3", Math.max(0.4, Math.random() * 0.89 ) , true, true)
    sound2.move(0, 1.2,-0.7)
    sound2.routePoints = [[-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7], [0.4, 3.2,-0.7] ]
    sounds[sound2.name] = sound2

    // wioder
    let sound3 = new Sound("rain4", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound3.move(0, 1.2,-0.7)
    sound3.routePoints = [[-1.6, 3.2,0.9], [1.6, 3.2,0.9], [1.6, 3.2,-0.9], [1.6, 3.2,-0.9]]
    sounds[sound3.name] = sound3

    let sound7 = new Sound("relaxrain", "/sounds/freerelax-rain-clipped.mp3", 2, true, true)
    sound7.move(0,1.8,0)
    // sound7.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound7.name] = sound7

    // thunders
    let sound4 = new Sound("thunder1", "/sounds/freerelax-thunder4.mp3", 1, false, false)
    sound4.move(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound4.name] = sound4
    
    let sound5 = new Sound("thunder2", "/sounds/freerelax-thunder6.mp3", 1, false, false)
    sound5.move(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound5.name] = sound5
    
    // let sound6 = new Sound("", "/sounds/freerelax-thunder6.mp3", 1, false, false)
    // sound6.grabbable = false
    // sound6.pushable = false
    // sound6.move(Math.random()*3, 3.4, Math.random()*3)
    // sounds[sound6.name] = sound6

    super(backgroundHex, characters, floor, sounds)
    
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
    for(let i=0;i<640;i++) {
      x = Math.random() * 40 - 20
      y = Math.random() * 200 - 100
      z = Math.random() * 40 - 20

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
      color: "#9999bb",
      size: 0.0005,
    })
    this.rain = new THREE.Points(rainGeo,rainMaterial)
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
      opacity: 0.03,
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
      x = Math.random() * 200 - 100
      y = 100
      z = Math.random() * 200 - 100

      cloud.position.set(
        x,y,z
      )

      cloud.rotation.x = util.radian(90)
      // cloud.rotation.y = -0.12
      cloud.rotation.z = Math.random()*360
      // cloud.material.opacity = 0.1

      cloud.rotationSpeed = 0.0005 * Math.random() - 0.00025

      this.clouds.push(cloud)
      scene.add(cloud)
    }

    // mountain plane
    let mountainGeo, mountainMat, selectedMap, mountainMap, mountainMap2, mountainMap3

    mountainMap = textureLoader.load("/textures/mountainD.png")
    mountainMap2 = textureLoader.load("/textures/mountain2D.png")
    mountainMap3 = textureLoader.load("/textures/mountain3D.png")
    cloudTexture3.wrapS = THREE.RepeatWrapping
    cloudTexture3.wrapT = THREE.RepeatWrapping
    
    mountainGeo = new THREE.PlaneGeometry( 32, 32, 32 )

    // xyz
    this.mountains = []
    for(var i=0; i<0; i++){
      rando = Math.random()
      if(rando<0.33){
        selectedMap = mountainMap
      }else if(Math.random()<0.66){
        selectedMap = mountainMap2
      } else {
        selectedMap = mountainMap3
      }

      mountainMat = new THREE.MeshPhysicalMaterial( {transparent: false, color: "#FFFFFF", side: THREE.DoubleSide, displacementMap: selectedMap, displacementScale: 8.2 } )

      this.mountains[i] = new THREE.Mesh( mountainGeo, mountainMat )
      // at least 4 away, random within 0-5, pos or neg
      x = util.randomSign() * (Math.random() * 5 + 12)
      y = 7
      z = util.randomSign() * (Math.random() * 5 + 12)

      this.mountains[i].position.set(x, y ,z)
      this.mountains[i].rotation.x = util.radian(90)
      this.mountains[i].rotation.z = util.radian(180)      
      scene.add(this.mountains[i])
    }

    // osunds
    let urls = [
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

    this.musicPlayer = new MusicPlayer()
    this.musicPlayer.pushable = false
    this.musicPlayer.grabbable = false
    this.musicPlayer.move(-0.4,1.25,-0.9499999999999999)
    this.characters[this.musicPlayer.mesh.id] = this.musicPlayer
    this.characters[this.musicPlayer.playButton.mesh.id] = this.musicPlayer.playButton
    this.characters[this.musicPlayer.stopButton.mesh.id] = this.musicPlayer.stopButton
    this.characters[this.musicPlayer.nextButton.mesh.id] = this.musicPlayer.nextButton
    this.characters[this.musicPlayer.prevButton.mesh.id] = this.musicPlayer.prevButton

    scene.add( this.musicPlayer.mesh )

    this.albums = {}

    let blueLight = new Album("Blue Light", "https://fog-places.s3.amazonaws.com/BlueLight/BlueLightCover.png", urls)
    this.albums["Blue Light"] = blueLight

    blueLight.mesh.position.set( -0.4, 1.4, -0.8 )
    scene.add(blueLight.mesh)

    this.characters[blueLight.mesh.id] = blueLight
  }

  randomThunderName(){
    let names = ["thunder1","thunder2"]
    return names[Math.floor(Math.random() * names.length)];
  }

  handleRain(){
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
    this.rain.rotation.y +=0.002
  }

  customHandle(){
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
        this.sounds[randomThunderName].play()
      }
    }
  }

}

export { RelaxingRain }