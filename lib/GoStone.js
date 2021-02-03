import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
// import { Sound } from "./Sound.js"
import { Timer } from "./Timer.js"
import { util, textureLoader, scene, place } from "./main.js"

class GoStone extends Character {
  constructor(color, row, column){
    let rgbColor = color == BLACK ? [0,0,0] : [255,255,255]

    super(new THREE.SphereGeometry( 0.004, 32, 32 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), rgbColor, new THREE.MeshPhysicalMaterial( { color: "#ffffff" }))
    this.mesh.scale.y = 0.3
    this.pushable = false


    this.goStoneColor = color

    // this.row = row
    // this.column = column

    // to stop us from infinite loop during checkstone -reset every round
    this.checked = false
  }
}

export { GoStone }