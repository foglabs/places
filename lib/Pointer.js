import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { controller, scene } from "./main.js"

class Pointer extends Character {
  constructor(){

    var sgeo = new THREE.SphereGeometry( 0.003, 32, 32 );
    // let basestr = rgbToHex([100,50,200])
    super(sgeo, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [100,50,200], new THREE.MeshBasicMaterial( {color: "#ffffff" } ) )
    
    // shoot a pointer from my... pointer
    this.raycaster = new THREE.Raycaster()

    // mesh id aka characters[mesh id]
    this.grabbedId = null

    let geo = new THREE.BoxGeometry( 0.1,0.1,0.1 )
    let mat = new THREE.MeshPhysicalMaterial( { color: '#0000ff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 })
    this.grabBox = new Character(geo, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [23,23,141], mat)
    scene.add(this.grabBox.mesh)

    this.lastPos = new THREE.Vector3(0, 0, 0)
    this.accVector = new THREE.Vector3(0,0,0)
  }

  samplePosition(){
    this.lastPos = new THREE.Vector3(controller.position.x, controller.position.y, controller.position.z)
  }

  calcThrowVector(){
    let xdir,ydir,zdir
    console.log( 'con', controller.position.x )
    console.log( 'lp', this.lastPos )
    xdir = controller.position.x - this.lastPos.x
    ydir = controller.position.y - this.lastPos.y
    zdir = controller.position.z - this.lastPos.z
    console.log( 'tv', xdir, ydir, zdir  )
    return new THREE.Vector3( xdir,ydir,zdir )
  }

  throw(char){
    let tv = this.calcThrowVector()
    console.log( 'throwin', tv.x,tv.y,tv.z )
    char.accx += tv.x * 9
    char.accy += tv.y * 9
    char.accz += tv.z * 9
  }
}

export { Pointer }