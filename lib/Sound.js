import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Timer } from "./Timer.js"
import { listener, audioLoader, scene } from "./main.js"

class Sound extends Character {
  constructor(name, soundFilePath, volume=3.0, loop=true, autoPlay=false, loadNow=true, playLength=null, omni=null, playFinishAction=null){
    let sphere = new THREE.SphereBufferGeometry( 0.05, 32, 16 )
    let material = new THREE.MeshPhongMaterial( { color: 0xff2200 } )
    super(sphere, new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [0,0,255], material)

    this.soundFilePath = soundFilePath

    // for sound, name is used as key instead of mesh.id
    this.name = name
    this.volume = volume
    this.loop = loop
    this.omni = omni
    this.autoPlay = autoPlay

    this.playLength = playLength
    this.playTimer = new Timer()
    this.playTimer.start()

    this.loadNow = loadNow
    this.loaded = false

    this.grabbable = false
    this.pushable = false

    if(this.omni){

      this.soundFile = new THREE.Audio(listener)
    } else {

      this.soundFile = new THREE.PositionalAudio(listener)
      this.mesh.add( this.soundFile )
    }

    scene.add( this.mesh )

    // dont be showin me that shit
    this.mesh.visible = false

    this.playFinishAction = playFinishAction

    if(this.loadNow){
      this.load()
    }
  }

  load(){

    // callback needs to be passed in here so that it can be defined in the load's cb
    this.loadSound(this.soundFile, this.volume, this.loop, () => {
      this.loaded = true

      if(this.autoPlay){
        // play as soon as its loaded
        this.play()
      }

      // console.log( 'oh boy im audio done', this.playing() )
      if(this.playFinishAction){
        this.soundFile.onEnded = this.playFinishAction
      }

    } )
  }

  loadSound(soundFile, volume, loop, imDone){
    let loaded = false
    audioLoader.load(this.soundFilePath, function(buff) {

      // need to pass in above to get this crap (args) in scope
      soundFile.setBuffer( buff )
      soundFile.setVolume( volume )
      soundFile.setLoop( loop )

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
      this.playTimer.reset()
    }
  }

  stop(){
    // dont stop nothin
    if(this.loaded && this.playing()){
      console.log( 'I am stoppin ', this )
      this.soundFile.stop()
    }
  }

  handle(){
    // lets change all this crap over bby!
    if(this.playLength && this.playTimer.time() > this.playLength){
      // iiim done
      this.stop()
    }

    this.animation()
    this.handleMovement()
    this.handleCollision()
  }
}

export { Sound }

