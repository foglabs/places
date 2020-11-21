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
    let albumBump = textureLoader.load('/textures/albumB.png') 
    albumBump.wrapS = THREE.RepeatWrapping
    albumBump.wrapT = THREE.RepeatWrapping
    albumBump.repeat.set(1,1)

    mat = new THREE.MeshPhysicalMaterial( { reflectivity: 1.0, color: "#FFFFFF", map: albumMap, bumpMap: albumBump, bumpScale: 0.02 })

    // well hi
    super(geo, bbox, [255,255,255], mat)

    this.title = title
    this.trackUrls = trackUrls

    this.itemType = ALBUM

    // only need to change this one I guess
    this.flatRotx = util.radian(90)
  }
}

export { Album }