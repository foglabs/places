import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { JunkPiece } from "./JunkPiece.js"
import { Sound } from "./Sound.js"
import { textureLoader, scene } from "./main.js"

class Demo extends Place {
  constructor(){
    var backgroundHex = "#330044"

    let light = new THREE.PointLight( 0xffffdd, 0.014, 100 )
    light.position.set( 3, 3, 3 )
    let lightgeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 )
    let lightMarker = new JunkPiece(lightgeometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,255], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
    lightMarker.setPosition(light.position.x,light.position.y,light.position.z)
    scene.add( lightMarker.mesh )
    scene.add( light )


    // // const textureLoader = new THREE.TextureLoader()
    // let textyMap = textureLoader.load('/textures/floor-text.jpg') 
    // textyMap.wrapS = THREE.RepeatWrapping
    // textyMap.wrapT = THREE.RepeatWrapping

    let characters = {}

    let wall = new JunkPiece(new THREE.BoxGeometry(2, 2, 0.1), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [120,120,120])
    wall.setPosition(0,0.8,2.5)
    wall.pushable = false
    scene.add(wall.mesh)
    characters[wall.mesh.id] = wall

    let wall2 = new JunkPiece(new THREE.BoxGeometry(1, 1, 0.1), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [120,120,120])
    wall2.setPosition(0,0.8,-2.5)
    wall.pushable = false
    scene.add(wall2.mesh)
    characters[wall2.mesh.id] = wall2

    var char23491miehjf = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), k [76,234,141], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    char23491miehjf.mesh.position.set(0.2,1,-0.5)
    char23491miehjf.mesh.rotation.set(0,0,0)
    scene.add( char23491miehjf.mesh )
    characters[char23491miehjf.mesh.id] = char23491miehjf

    var char6dlf0kvj5bk = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [21,116,100], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    char6dlf0kvj5bk.mesh.position.set(0.11999999999999998,1,-0.5)
    char6dlf0kvj5bk.mesh.rotation.set(0,0,0)
    scene.add( char6dlf0kvj5bk.mesh )
    characters[char6dlf0kvj5bk.mesh.id] = char6dlf0kvj5bk

    var charemk64ptg2g6 = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [208,51,118], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    charemk64ptg2g6.mesh.position.set(-0.04000000000000005,1,-0.5)
    charemk64ptg2g6.mesh.rotation.set(0,0,0)
    scene.add( charemk64ptg2g6.mesh )
    characters[charemk64ptg2g6.mesh.id] = charemk64ptg2g6

    var charhqrbj6qyll = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [61,243,107], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    charhqrbj6qyll.mesh.position.set(-0.16000000000000015,1,-0.5)
    charhqrbj6qyll.mesh.rotation.set(0,0,0)
    scene.add( charhqrbj6qyll.mesh )
    characters[charhqrbj6qyll.mesh.id] = charhqrbj6qyll

    var charspsd61t1nrf = new Character( new THREE.BoxGeometry( 0.08000000000000002,0.5499999999999997,0.08000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [55,170,168], new THREE.MeshStandardMaterial( { color: '#37aaa8', transparent: true }) )
    charspsd61t1nrf.mesh.position.set(-0.27000000000000025,1,-0.5)
    charspsd61t1nrf.mesh.rotation.set(0,0,0)
    scene.add( charspsd61t1nrf.mesh )
    characters[charspsd61t1nrf.mesh.id] = charspsd61t1nrf

    var char6d65qt1pvt9 = new Character( new THREE.SphereGeometry( 0.1, 32, 32 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,255], new THREE.MeshStandardMaterial( { color: '#3cbc2e', transparent: true }) )
    char6d65qt1pvt9.mesh.position.set(-0.00000000000000004,1,-0.5)
    char6d65qt1pvt9.mesh.rotation.set(0,0,0)
    scene.add( char6d65qt1pvt9.mesh )
    characters[char6d65qt1pvt9.mesh.id] = char6d65qt1pvt9

    var charsbpl14mlaw = new Character( new THREE.BoxGeometry( 0.5399999999999998,1.9100000000000006,0.5199999999999999 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [64,50,170], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.9, reflectivity: 0.5, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.4 }) )
    charsbpl14mlaw.mesh.position.set(0,1.4,-2)
    charsbpl14mlaw.mesh.rotation.set(0,0.2,0)
    scene.add( charsbpl14mlaw.mesh )
    characters[charsbpl14mlaw.mesh.id] = charsbpl14mlaw

    var charps8qiin114 = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [128,104,57], new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.9, reflectivity: 0.5, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.4 }) )
    charps8qiin114.mesh.position.set(0,0,0)
    charps8qiin114.mesh.rotation.set(0,0.5,0)
    scene.add( charps8qiin114.mesh )
    characters[charps8qiin114.mesh.id] = charps8qiin114

    var charpz9evj23her = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,99,26], new THREE.MeshStandardMaterial( { color: '#00631a', transparent: true }) )
    charpz9evj23her.mesh.position.set(0.36000000000000015,1.2,-0.03)
    charpz9evj23her.mesh.rotation.set(0,-0.7,0)
    scene.add( charpz9evj23her.mesh )
    characters[charpz9evj23her.mesh.id] = charpz9evj23her

    var charivk9xnmlmh = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [115,25,18], new THREE.MeshStandardMaterial( { color: '#731912', transparent: true }) )
    charivk9xnmlmh.mesh.position.set(0.36000000000000015,1.2,-0.5200000000000002)
    charivk9xnmlmh.mesh.rotation.set(0,0.6,0)
    scene.add( charivk9xnmlmh.mesh )
    characters[charivk9xnmlmh.mesh.id] = charivk9xnmlmh

    var charyqwybqd5wm = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [190,38,142], new THREE.MeshStandardMaterial( { color: '#be268e', transparent: true }) )
    charyqwybqd5wm.mesh.position.set(0.8100000000000005,1.2,-0.26)
    charyqwybqd5wm.mesh.rotation.set(0,1.2,0)
    scene.add( charyqwybqd5wm.mesh )
    characters[charyqwybqd5wm.mesh.id] = charyqwybqd5wm

    var char8nlhojct64c = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [152,75,139], new THREE.MeshStandardMaterial( { color: '#984b8b', transparent: true }) )
    char8nlhojct64c.mesh.position.set(0.05999999999999992,1.2,-0.29000000000000004)
    char8nlhojct64c.mesh.rotation.set(0,0.4,0)
    scene.add( char8nlhojct64c.mesh )
    characters[char8nlhojct64c.mesh.id] = char8nlhojct64c

    var charq9c90nqtfbc = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [115,230,151], new THREE.MeshStandardMaterial( { color: '#73e697', transparent: true }) )
    charq9c90nqtfbc.mesh.position.set(0.7000000000000004,1.2,-0.44000000000000017)
    charq9c90nqtfbc.mesh.rotation.set(0.1,0.19999999999999998,0)
    scene.add( charq9c90nqtfbc.mesh )
    characters[charq9c90nqtfbc.mesh.id] = charq9c90nqtfbc

    var charpfmmm449km9 = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [102,165,128], new THREE.MeshStandardMaterial( { color: '#66a580', transparent: true }) )
    charpfmmm449km9.mesh.position.set(0.5300000000000002,1.2,-0.6000000000000003)
    charpfmmm449km9.mesh.rotation.set(0.1,0.4,0)
    scene.add( charpfmmm449km9.mesh )
    characters[charpfmmm449km9.mesh.id] = charpfmmm449km9

    var charxw9srji3yj = new Character( new THREE.BoxGeometry( 0.1,1.5099999999999965,0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [131,58,150], new THREE.MeshStandardMaterial( { color: '#833a96', transparent: true }) )
    charxw9srji3yj.mesh.position.set(0.6300000000000003,1.2,-0.16999999999999993)
    charxw9srji3yj.mesh.rotation.set(0,0.6,0)
    scene.add( charxw9srji3yj.mesh )
    characters[charxw9srji3yj.mesh.id] = charxw9srji3yj

    // add a fuckin cube
    let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    var cube = new JunkPiece(geometry, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,255,0], new THREE.MeshStandardMaterial( {color: "#ffffff" } ) )
    // cube.setPosition(0,1,-1)
    cube.setPosition(0,1,-0.5)
    cube.mesh.rotation.y = 0.8
    scene.add( cube.mesh )
    cube.routePoints = [[-0.2,1.1,-0.5],[-0.2,1.1,-0.3],[0.1,1.1,-0.3],[0.1,1.1,-0.5]]
    // cube.routePoints = [[-0.2,1.2,-1],[-0.4,1.2,-1]]
    characters[cube.mesh.id] = cube

    // da floor
    let textyMap = textureLoader.load('/textures/floor-text.jpg') 
    textyMap.wrapS = THREE.RepeatWrapping
    textyMap.wrapT = THREE.RepeatWrapping

    var floor = new JunkPiece(new THREE.BoxGeometry(5, 0.1, 5), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,120,250], new THREE.MeshPhysicalMaterial( { map: textyMap, transparent: true, transmission: 0, reflectivity: 1, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.1 }) )
    floor.setPosition(0,FLOOR,0)
    floor.pushable = false
    scene.add(floor.mesh)
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

    super(backgroundHex, characters, floor, sounds)
  }

  customHandle(){

    this.sounds["thunder1"].play()
  }

}

export { Demo }