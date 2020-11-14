import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { Sound } from "./Sound.js"
import { util, textureLoader, scene, place } from "./main.js"

class MusicPlayer extends Character {
  constructor(urls){

    let geo, bbox, mat
    geo = new THREE.BoxGeometry( 0.2, 0.3, 0.2 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    mat = new THREE.MeshPhysicalMaterial( { color: "#FFFFFF" })
    super(geo, bbox, [255,255,255], mat)

    // isplaying 
    this.playing = false
    this.currentTrack = 0
    this.urls = urls
    this.tracks = []


    this.loadAlbum(this.urls)

    // juz do
    let playgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
    let playmat = new THREE.MeshStandardMaterial( { color: "#00ff00" })
    let offset = new THREE.Vector3(-0.05,0.01,0.1)
    this.playButton = new Component( this, offset, playgeo, [0,255,0], playmat, () => { this.playSong(this.currentTrack) } )
    this.playButton.clickable = true
    scene.add(this.playButton.mesh)
    this.components.push( this.playButton )

    let stopgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
    let stopmat = new THREE.MeshStandardMaterial( { color: "#ff0000" })
    let stopoffset = new THREE.Vector3(0.02,0.01,0.1)
    this.stopButton = new Component( this, stopoffset, stopgeo, [0,255,0], stopmat, () => { this.stopSong(this.currentTrack) } )
    this.stopButton.clickable = true
    scene.add(this.stopButton.mesh)
    this.components.push( this.stopButton )


    let nextgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
    let nextmat = new THREE.MeshStandardMaterial( { color: "#00ffff" })
    let nextoffset = new THREE.Vector3(0.02,0.08,0.1)
    this.nextButton = new Component( this, nextoffset, nextgeo, [0,255,0], nextmat, () => { this.nextTrack() } )
    this.nextButton.clickable = true
    scene.add(this.nextButton.mesh)
    this.components.push( this.nextButton )

    let prevgeo = new THREE.BoxGeometry( 0.02, 0.02, 0.02 )
    let prevmat = new THREE.MeshStandardMaterial( { color: "#ffff00" })
    let prevoffset = new THREE.Vector3(-0.05,0.08,0.1)
    this.prevButton = new Component( this, prevoffset, prevgeo, [0,255,0], prevmat, () => { this.prevTrack() } )
    this.prevButton.clickable = true
    scene.add(this.prevButton.mesh)
    this.components.push( this.prevButton )

    // display
    this.createDisplay()
  }

  createDisplay(){
    // create a canvas element
    let mat = this.createDisplayMat("FOG STEREO")
    let dispOffset = new THREE.Vector3(0,0.25,0)
    this.display = new Component(this, dispOffset, new THREE.PlaneGeometry(0.36, 0.06), [0,120,200], mat)
    scene.add( this.display.mesh )

    // place.characters[this.display.mesh.id] = this.display
    this.components.push( this.display )    
  }

  setDisplay(text){
    let newMat = this.createDisplayMat(text)
    this.display.mesh.material = newMat
  }

  createDisplayMat(text){
    let canvas1 = document.createElement('canvas')
    canvas1.width = 360
    canvas1.height = 60
    let context1 = canvas1.getContext('2d')
    context1.font = "Bold 50px Arial"
    context1.fillStyle = "rgba(255,255,255,0.95)"
    context1.textBaseLine = "middle"
    console.log( 'text', text )
    context1.fillText( text, 0, 50)

    // canvas contents will be used for a texture
    let texture1 = new THREE.CanvasTexture(canvas1) 
    texture1.needsUpdate = true
    // texture1.wrapS = THREE.RepeatWrapping
    // texture1.wrapT = THREE.RepeatWrapping
    // texture1.repeat.set(2,2)

    let material1 = new THREE.MeshBasicMaterial( { map: texture1, side: THREE.DoubleSide } )
    material1.transparent = true

    
    
    return material1
  }

  loadAlbum(urls){
    let url
    for(var i=0; i<urls.length; i++){
      url = urls[i]

      // wait to actually load cause its too much up front
      this.tracks.push( new Sound("track"+i, urls[i], 0.5, false, false, false) )
    }
  }

  playSong(songIndex){
    if( this.playing && this.currentTrack != songIndex ){
      console.log( 'stopping ', this.currentTrack )
      this.tracks.forEach( (t) => { t.stop() } )
    }

    this.currentTrack = songIndex
    console.log( 'playing ', this.currentTrack )
    if( this.tracks[this.currentTrack].loaded ){
  
      this.tracks[this.currentTrack].play()
    } else {
      this.tracks[this.currentTrack].autoPlay = true
      this.tracks[this.currentTrack].load()
    }

    // flag this now, but might have to load first
    this.playing = true     

    // now load the next one 
    let nextTrack = this.currentTrack+1
    if(this.tracks[nextTrack] && !this.tracks[nextTrack].loaded){
      this.tracks[nextTrack].load()
    }
  }

  stopSong(){
    console.log( 'stop song', this.currentTrack )
    // if(this.playing){
    //   this.tracks[this.currentTrack].stop()
    //   this.playing = false
    // }
    this.tracks.forEach( (t) => { t.stop() } )
    this.playing = false
  }

  nextTrack(){
    console.log( 'next track', this.currentTrack )
    this.incTrack(1)
  }
  
  prevTrack(){
    console.log( 'prev track', this.currentTrack )
    this.incTrack(-1)
  }

  incTrack(inc){
    // inc looping around
    this.currentTrack = util.incInRange(this.currentTrack, inc, 0, this.tracks.length-1)
    console.log( 'current track now inc to ', this.currentTrack )
    this.playSong(this.currentTrack)
  }
}

export { MusicPlayer }