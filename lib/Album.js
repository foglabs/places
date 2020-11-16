import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Timer } from "./Timer.js"
import { util, scene, place, textureLoader } from "./main.js"

class Album extends Character {
  constructor(title, coverImgUrl, trackUrls){


    let geo, bbox, mat
    geo = new THREE.BoxGeometry( 0.2, 0.2, 0.01 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    let albumMap = textureLoader.load(coverImgUrl)
    albumMap.wrapS = THREE.RepeatWrapping
    albumMap.wrapT = THREE.RepeatWrapping
    albumMap.repeat.set(1,1)
    let albumAlpha = textureLoader.load('/textures/albumA.png') 
    albumAlpha.wrapS = THREE.RepeatWrapping
    albumAlpha.wrapT = THREE.RepeatWrapping
    albumAlpha.repeat.set(1,1)
    let albumBump = textureLoader.load('/textures/albumB.png') 
    albumBump.wrapS = THREE.RepeatWrapping
    albumBump.wrapT = THREE.RepeatWrapping
    albumBump.repeat.set(1,1)

    // mat = new THREE.MeshPhysicalMaterial( { map: albumMap, bumpMap: albumBump, alphaMap: albumAlpha, bumpScale: 0.8 })
    mat = new THREE.MeshPhysicalMaterial( { reflectivity: 1.4, color: "#FFFFFF", map: albumMap, bumpMap: albumBump, alphaMap: albumAlpha, bumpScale: 0.8 })

    // well hi
    super(geo, bbox, [255,255,255], mat)

    this.title = title
    this.trackUrls = trackUrls

    this.itemType = ALBUM

    // are we actually in the machine
    // might not need
    // this.inserted = false
  }

  // customAnimation(){
  //   this.mesh.rotation.y += 0.004
  // }
}

export { Album }