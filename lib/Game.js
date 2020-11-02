import * as THREE from "./three.module.js"
import { JunkPiece } from '/lib/JunkPiece.js'
import { Timer } from '/lib/Timer.js'
import { util, scene, place } from "./main.js"

class Game {
  constructor(){
    // none

    this.cubeTimer = new Timer()
    this.cubeTimer.start()
  }

  addRandomCube(){
    let mat, newcube
    if(Math.random() > 0.5){
      mat = new THREE.MeshPhysicalMaterial( { color: '#ffffff', transparent: true, transmission: 0.5, reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1 })
      newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,255,120], mat )
    } else {
      mat = new THREE.MeshStandardMaterial( { color: '#ffffff', metalness: 1, roughness: 0.1, transparent: true })
      newcube = new JunkPiece(new THREE.BoxGeometry( 0.1, 0.1, 0.1 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [255,253,180], mat )
    }

    newcube.setPosition(util.randomSign() * Math.random()*2, util.randomSign() * Math.random()*2, util.randomSign() * Math.random()*2)
    place.junk.push(newcube)
    scene.add( newcube.mesh )
  }

  handle(){

  }

}

export { Game }