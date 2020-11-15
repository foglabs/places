import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Timer } from "./Timer.js"
import { util, scene, place } from "./main.js"

class Component extends Character {
  constructor(parent, offset, geo, color, mat, clickAction=null, dropAction=null){
    let bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    super(geo, bbox, color, mat, clickAction, dropAction)
    // who knows
    this.parentId = parent.mesh.id

    // lock these because we want to only move with our parent
    this.pushable = false
    this.grabbable = false

    // vector3
    this.offset = offset
  }

  // customAnimation(){
  //   this.mesh.rotation.z += 0.004
  // }
}

export { Component }