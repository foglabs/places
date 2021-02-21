import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { Character } from "./Character.js"
import { Place } from "./Place.js"
import { Component } from "./Component.js"
import { place, scene } from "./main.js"
class DeskLamp extends Character {
  constructor(){

    let bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    super(null, bbox, [255,255,255], null, null, null, place.models["/models/desklamp.glb"] )

    // the actual light 222200
    this.desklight = new THREE.SpotLight("#555533", 0.0012)
    this.desklight.castShadow = true
    this.desklight.shadow.mapSize.width = 1024*4
    this.desklight.shadow.mapSize.height = 1024*4
    this.desklight.position.set(-0.85,1.262,-0.18)
    // this.desklight.position.set(-0.85,1.262,-0.78)
    this.desklight.lookAt(-1,-5,0)
    this.desklight.shadow.camera.near = 0.5; // default
    this.desklight.shadow.camera.far = 500; // default
    this.desklight.shadow.focus = 1; // default
    scene.add(this.desklight)



    this.pushable = true
    this.grabbable = true
    this.clickable = false

    this.move(this.desklight.position.x,this.desklight.position.y,this.desklight.position.z)

    this.mesh.scale.set(0.1,0.1,0.1)
    this.flatRoty = Math.PI*-1.495 
    this.roty = Math.PI*-1.495 
    this.mesh.rotation.y = this.roty

    place.characters[this.mesh.id] = this

    scene.add( this.mesh )

    // star speed button
    let onOffGeo = new THREE.BoxGeometry(0.018,0.015,0.018)
    let onOffOffset = new THREE.Vector3(0,-0.06,0)
    let onOffMat = new THREE.MeshPhysicalMaterial({reflectivity: 1, clearcoat: 1, clearcoatRoughness: 0, roughness: 0, metalness: 0, color: "#880000"})
    let onOffAction = () => {
      this.desklight.visible = !this.desklight.visible
    }
    let onOff = new Component(this, onOffOffset, onOffGeo, [136,0,0], onOffMat, onOffAction)
    scene.add(onOff.mesh)
    // onOff.mesh.visible = false
    onOff.clickable = true
    this.components.push(onOff)
  }

  customAnimation(){
    this.desklight.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z)
  }
}

export { DeskLamp }