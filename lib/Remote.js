import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { scene, place, util, textureLoader } from "./main.js"

class Remote extends Character {
  constructor(position){

    let stereoMap = textureLoader.load('/textures/stereo.png') 
    stereoMap.wrapS = THREE.RepeatWrapping
    stereoMap.wrapT = THREE.RepeatWrapping
    stereoMap.repeat.set(1,1)
    let stereoBump = textureLoader.load('/textures/stereoB.png') 
    stereoBump.wrapS = THREE.RepeatWrapping
    stereoBump.wrapT = THREE.RepeatWrapping
    stereoBump.repeat.set(1,1)

    let geo = new THREE.BoxGeometry(0.06,0.014,0.1)
    // let geo = new THREE.BoxGeometry(3,3,3)
    let bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    // let mat = new THREE.MeshBasicMaterial( { color: "#0000ff" })
    let mat = new THREE.MeshPhysicalMaterial( { color: "#000000", reflectivity: 1, roughness: 0, clearcoat: 1.0, clearcoatRoughness: 0.1, map: stereoMap, bumpMap: stereoBump, bumpScale: 1 })

    // scale back the bbox on z dimension
    let bboxScale = new THREE.Vector3(1.0,1.0,0.40)
    console.log( 'hi scale', bboxScale )
    super(geo, bbox, [0,0,255], mat, null, null, null, bboxScale)

    textureLoader.load('/textures/buttonGrain.png', (tex) => {

      textureLoader.load('/textures/buttonGrainB.png', (bump) => {

        let buttonTextureUp,buttonTextureDown,buttonTextureUpB,buttonTextureDownB

        // have to wait for da bloody load
        buttonTextureUp = tex
        buttonTextureUp.wrapS = THREE.RepeatWrapping
        buttonTextureUp.wrapT = THREE.RepeatWrapping
        buttonTextureUp.repeat.set(1,1)

        buttonTextureUpB = tex
        buttonTextureUpB.wrapS = THREE.RepeatWrapping
        buttonTextureUpB.wrapT = THREE.RepeatWrapping
        buttonTextureUpB.repeat.set(1,1)

        // have to flag needsupdate or else never loados in
        buttonTextureDown = buttonTextureUp.clone()
        buttonTextureDown.needsUpdate = true
        buttonTextureDownB = tex.clone()
        buttonTextureDownB.needsUpdate = true
        buttonTextureDown.rotation = Math.PI

        buttonTextureDownB.rotation = Math.PI

        // up button
        let upgeo = new THREE.BoxGeometry( 0.02,0.02,0.02 )
        let upmat = new THREE.MeshStandardMaterial( { bumpMap: buttonTextureUpB, map: buttonTextureUp })
        let upoffset = new THREE.Vector3(0.0125,0.01,-0.03)
        let upClick = () => {
            console.log( 'hey upper' )
          place.spotlight.intensity = util.incInRange(place.spotlight.intensity, 0.001, 0, 0.048)
        }    

        this.upButton = new Component( this, upoffset, upgeo, [255,255,255], upmat, upClick )

        this.upButton.pushable = false
        this.upButton.clickable = true
        scene.add(this.upButton.mesh)
        this.components.push( this.upButton )

        let downgeo = new THREE.BoxGeometry( 0.02,0.02,0.02 )
        let downmat = new THREE.MeshPhysicalMaterial( { bumpMap: buttonTextureDownB, map: buttonTextureDown })
        let downoffset = new THREE.Vector3(-0.0125,0.01,-0.03)
        let downClick = () => {
            console.log( 'hey fucker' )
          place.spotlight.intensity = util.incInRange(place.spotlight.intensity, -0.001, 0, 0.048)
        }

        // down button
        this.downButton = new Component( this, downoffset, downgeo, [255,255,255], downmat, downClick )

        this.downButton.pushable = false
        this.downButton.clickable = true
        scene.add(this.downButton.mesh)
        this.components.push( this.downButton )

        // vol up button
        let upVoloffset = new THREE.Vector3(-0.0125,0.01,0.03)
        let upVolClick = () => {
            console.log( 'upvol fucker' )
          place.musicPlayer.changeVolume(-0.1)
        }

        this.upVolButton = new Component( this, upVoloffset, upgeo.clone(), [0,255,100], upmat.clone(), upVolClick )
        this.upVolButton.pushable = false
        this.upVolButton.clickable = true
        scene.add(this.upVolButton.mesh)
        this.components.push( this.upVolButton )

        // vol down button
        let downVoloffset = new THREE.Vector3(0.0125,0.01,0.03)
        let downVolClick = () => {
            console.log( 'downvol fucker' )
          place.musicPlayer.changeVolume(0.1)
        }

        this.downVolButton = new Component( this, downVoloffset, downgeo.clone(), [0,255,100], downmat.clone(), downVolClick )
        this.downVolButton.pushable = false
        this.downVolButton.clickable = true
        scene.add(this.downVolButton.mesh)
        this.components.push( this.downVolButton )

        this.move(position.x,position.y,position.z)
      })
    })

    // dont rotate and flatten, makes this veeeery difficult
    this.rotatable = false
    this.lightness = 0.003
  }
}

 export { Remote }
 