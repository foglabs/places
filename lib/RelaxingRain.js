import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { JunkPiece } from "./JunkPiece.js"
import { Sound } from "./Sound.js"
import { textureLoader, scene } from "./main.js"

class RelaxingRain extends Place {
  constructor(){
    var backgroundHex = "#000000"

    // I need a light
    let light = new THREE.PointLight( 0xffffdd, 0.018, 100 )
    light.position.set( 3, 3, 3 )
    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
    let lightMarker = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,255], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
    lightMarker.setPosition(light.position.x,light.position.y,light.position.z)
    scene.add( lightMarker.mesh )
    scene.add( light )


    // all my charllies
    let wallMap = textureLoader.load('/textures/rain-wall-text.jpg') 
    wallMap.wrapS = THREE.RepeatWrapping
    wallMap.wrapT = THREE.RepeatWrapping

    let characters = {}

    var char4wd7el71edr = new Character( new THREE.BoxGeometry( 0.8499999999999997,0.030000000000000016,0.8699999999999997 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    char4wd7el71edr.mesh.position.set(0,1.8100000000000003,-0.3499999999999999)
    char4wd7el71edr.mesh.rotation.set(0,0,0)
    scene.add( char4wd7el71edr.mesh )
    characters[char4wd7el71edr.mesh.id] = char4wd7el71edr

    var charm6awq5verz = new Character( new THREE.BoxGeometry( 0.07,0.8399999999999989,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    charm6awq5verz.mesh.position.set(0.24000000000000007,1.41,-0.08999999999999975)
    charm6awq5verz.mesh.rotation.set(0,0,0)
    scene.add( charm6awq5verz.mesh )
    characters[charm6awq5verz.mesh.id] = charm6awq5verz

    var charrjbg8ps445p = new Character( new THREE.BoxGeometry( 0.07,0.8499999999999988,0.07 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    charrjbg8ps445p.mesh.position.set(-0.24000000000000007,1.41,-0.09999999999999976)
    charrjbg8ps445p.mesh.rotation.set(0,0,0)
    scene.add( charrjbg8ps445p.mesh )
    characters[charrjbg8ps445p.mesh.id] = charrjbg8ps445p

    var charoxfjg4clrw = new Character( new THREE.BoxGeometry( 0.06000000000000001,0.8399999999999989,0.06000000000000001 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    charoxfjg4clrw.mesh.position.set(-0.25000000000000006,1.41,-0.6399999999999999)
    charoxfjg4clrw.mesh.rotation.set(0,0,0)
    scene.add( charoxfjg4clrw.mesh )
    characters[charoxfjg4clrw.mesh.id] = charoxfjg4clrw

    var char4rsqwejs7bc = new Character( new THREE.BoxGeometry( 0.07,0.8399999999999989,0.05000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    char4rsqwejs7bc.mesh.position.set(0.24000000000000005,1.41,-0.6299999999999999)
    char4rsqwejs7bc.mesh.rotation.set(0,0,0)
    scene.add( char4rsqwejs7bc.mesh )
    characters[char4rsqwejs7bc.mesh.id] = char4rsqwejs7bc

    var char24xq7w9ca9 = new Character( new THREE.BoxGeometry( 0.2700000000000002,0.1,0.3000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [36,36,36], new THREE.MeshStandardMaterial( { map: wallMap, transparent: true }) )
    char24xq7w9ca9.mesh.position.set(0,1.2,-0.3499999999999999)
    char24xq7w9ca9.mesh.rotation.set(0,0,0.2)
    scene.add( char24xq7w9ca9.mesh )
    characters[char24xq7w9ca9.mesh.id] = char24xq7w9ca9


    // floor
    let textyMap = textureLoader.load('/textures/rain-floor-text.jpg') 
    textyMap.wrapS = THREE.RepeatWrapping
    textyMap.wrapT = THREE.RepeatWrapping

    var floor = new JunkPiece(new THREE.BoxGeometry(1.5, 0.1, 1.5), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshPhysicalMaterial( { map: textyMap, transparent: true, transmission: 0, reflectivity: 1, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    floor.setPosition(0,FLOOR,0)
    floor.pushable = false
    floor.grabbable = false
    
    // add floor to track
    characters[floor.mesh.id] = floor
    scene.add(floor.mesh)

    // sounds
    var sounds = {}
    // rain in the sky
    let sound = new Sound("rain1", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound.grabbable = false
    sound.pushable = false
    sound.mesh.position.set(0, 1.2,-0.7)
    sound.routePoints = [ [0.4, 3.2,-0.7], [-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7] ]
    sounds[sound.name] = sound

    // wider route
    let sound1 = new Sound("rain2", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound1.grabbable = false
    sound1.pushable = false
    sound1.mesh.position.set(0, 1.2,-0.7)
    sound1.routePoints = [ [0.6, 3.2,-0.9], [-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9] ]
    sounds[sound1.name] = sound1

    // same route as first one
    let sound2 = new Sound("rain3", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound2.grabbable = false
    sound2.pushable = false
    sound2.mesh.position.set(0, 1.2,-0.7)
    sound2.routePoints = [[-0.4, 3.2,0.7], [0.4, 3.2,0.7], [0.4, 3.2,-0.7], [0.4, 3.2,-0.7] ]
    sounds[sound2.name] = sound2

    // wioder
    let sound3 = new Sound("rain4", "/sounds/rain-Rclip.mp3", Math.max(0.2, Math.random() * 0.89 ) , true, true)
    sound3.grabbable = false
    sound3.pushable = false
    sound3.mesh.position.set(0, 1.2,-0.7)
    sound3.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound3.name] = sound3

    let sound7 = new Sound("relaxrain", "/sounds/freerelax-rain.mp3", 1, true, true)
    sound7.grabbable = false
    sound7.pushable = false
    sound7.mesh.position.set(0,0.2,0)
    // sound7.routePoints = [[-0.6, 3.2,0.9], [0.6, 3.2,0.9], [0.6, 3.2,-0.9], [0.6, 3.2,-0.9]]
    sounds[sound7.name] = sound7


    // thunders
    let sound4 = new Sound("thunder1", "/sounds/freerelax-thunder4.mp3", 1, false, false)
    sound4.grabbable = false
    sound4.pushable = false
    sound4.mesh.position.set(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound4.name] = sound4
    
    let sound5 = new Sound("thunder2", "/sounds/freerelax-thunder6.mp3", 1, false, false)
    sound5.grabbable = false
    sound5.pushable = false
    sound5.mesh.position.set(Math.random()*3, 3.4, Math.random()*3)
    sounds[sound5.name] = sound5
    
    // let sound6 = new Sound("", "/sounds/freerelax-thunder6.mp3", 1, false, false)
    // sound6.grabbable = false
    // sound6.pushable = false
    // sound6.mesh.position.set(Math.random()*3, 3.4, Math.random()*3)
    // sounds[sound6.name] = sound6

    super(backgroundHex, characters, floor, sounds)
  }

  customHandle(){

    this.sounds["thunder1"].play()
  }

}

export { RelaxingRain }