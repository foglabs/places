import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
// import { Timer } from "./Timer.js"
import { listener, loader, scene } from "./main.js"

class Sound extends Character {
  constructor(soundFilePath, volume=3.0, omni=null){
    let sphere = new THREE.SphereBufferGeometry( 1, 32, 16 )
    let material = new THREE.MeshPhongMaterial( { color: 0xff2200 } )
    super(sphere, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,0,255], material)

    this.soundFilePath = soundFilePath
    if(omni){

      this.soundFile = new THREE.Audio(listener)
    } else {

      this.soundFile = new THREE.PositionalAudio(listener)
      this.mesh.add( this.soundFile )
    }

    scene.add( this.mesh )

    this.volume = volume
    this.loaded = false

    this.loadSound(this.soundFile, this.volume, () => {
      this.loaded = true
      console.log( 'oh boy im done' )
    })
  }

  loadSound(soundFile, volume, imDone){
    let loaded = false
    loader.load(this.soundFilePath, function(buff) {
      soundFile.setBuffer( buff )
      soundFile.setVolume( volume )

      imDone()
    })
  }

  setVolume(vol){
    this.volume = vol
    this.soundFile.setVolume( vol )
  }

  playing(){
    return this.soundFile.isPlaying
  }

  play(interupt=true){
    if(interupt){
      if(this.soundFile.isPlaying){
        this.soundFile.stop()
      }

      this.soundFile.play()
    }
  }

  stop(){
    this.soundFile.stop()
  }
}

export { Sound }

