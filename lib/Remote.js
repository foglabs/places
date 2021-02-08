import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { scene, place } from "./main.js"

class Remote extends Character {
  constructor(position){

    let geo = new THREE.BoxGeometry(0.08,0.02,0.12)
    let bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    let mat = new THREE.MeshStandardMaterial( { color: "#000000" })
    super(geo, bbox, [0,0,0], mat)



    let upgeo = new THREE.BoxGeometry( 0.05,0.05,0.05 )
    let upmat = new THREE.MeshStandardMaterial( { color: "#00ff00" })
    let upoffset = new THREE.Vector3(0.045,-0.015,0.1)
    let upClick = () => {
      place.spotlight.intensity = util.incInRange(spotlight.intensity, 0.01, 0, 0.048)
    }    
    this.upButton = new Component( this, upoffset, upgeo, [255,0,0], upmat, upClick )
    this.upButton.clickable = true
    scene.add(this.upButton.mesh)
    this.components.push( this.upButton )
  }
}

 export { Remote }