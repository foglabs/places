import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { scene, place, util } from "./main.js"

class Remote extends Character {
  constructor(position){

    let geo = new THREE.BoxGeometry(0.1,0.014,0.06)
    // let geo = new THREE.BoxGeometry(3,3,3)
    let bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    let mat = new THREE.MeshBasicMaterial( { color: "#0000ff" })
    super(geo, bbox, [0,0,255], mat)


    let upgeo = new THREE.BoxGeometry( 0.02,0.02,0.02 )
    let upmat = new THREE.MeshBasicMaterial( { color: "#00ff00" })
    let upoffset = new THREE.Vector3(-0.02,0,0)
    let upClick = () => {
      place.spotlight.intensity = util.incInRange(place.spotlight.intensity, 0.01, 0, 0.048)
    }    

    this.upButton = new Component( this, upoffset, upgeo, [0,255,0], upmat, upClick )

    this.upButton.pushable = true
    this.upButton.clickable = true
    scene.add(this.upButton.mesh)
    this.components.push( this.upButton )

    let downgeo = new THREE.BoxGeometry( 0.02,0.02,0.02 )
    let downmat = new THREE.MeshBasicMaterial( { color: "#ff0000" })
    let downoffset = new THREE.Vector3(0.02,0,0)
    let downClick = () => {
      place.spotlight.intensity = util.incInRange(place.spotlight.intensity, -0.01, 0, 0.048)
    }

    this.downButton = new Component( this, downoffset, downgeo, [255,0,0], downmat, downClick )

    this.downButton.pushable = true
    this.downButton.clickable = true
    scene.add(this.downButton.mesh)
    this.components.push( this.downButton )

    this.move(position.x,position.y,position.z)

    // dont rotate and flatten, makes this veeeery difficult
    this.flattenable = false
  }
}

 export { Remote }