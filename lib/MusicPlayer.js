import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Sound } from "./Sound.js"
import { util, textureLoader, scene } from "./main.js"

class MusicPlayer extends Character {
  constructor(sounds){

    this.currentTrack = 0
    this.tracks = sounds

    let geo, bbox, mat
    geo = new THREE.BoxGeometry( 0.2, 0.6, 0.2 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    mat = new THREE.MeshPhysicalMaterial( { color: "#FFFFFF" })
    super(geo, bbox, [255,255,255], mat)

    this.mesh.position.set(0,1.2,-1)

    // juz do
    this.tracks[0].play()
  }
}

export { MusicPlayer }