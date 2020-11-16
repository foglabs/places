import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { Sound } from "./Sound.js"
import { Timer } from "./Timer.js"
import { util, textureLoader, scene, place } from "./main.js"

class MusicPlayer extends Character {
  constructor(album=null){

    let geo, bbox, mat, mat2
    geo = new THREE.BoxGeometry( 0.2, 0.1, 0.1 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    let stereoMap = textureLoader.load('/textures/stereo.png') 
    stereoMap.wrapS = THREE.RepeatWrapping
    stereoMap.wrapT = THREE.RepeatWrapping
    stereoMap.repeat.set(1,0.5)
    let stereoAlpha = textureLoader.load('/textures/stereoA.png') 
    stereoAlpha.wrapS = THREE.RepeatWrapping
    stereoAlpha.wrapT = THREE.RepeatWrapping
    stereoAlpha.repeat.set(1,0.5)
    let stereoBump = textureLoader.load('/textures/stereoB.png') 
    stereoBump.wrapS = THREE.RepeatWrapping
    stereoBump.wrapT = THREE.RepeatWrapping
    stereoBump.repeat.set(1,0.5)

    let stereoFrontMap = textureLoader.load('/textures/stereo-front.png') 
    stereoFrontMap.wrapS = THREE.RepeatWrapping
    stereoFrontMap.wrapT = THREE.RepeatWrapping
    stereoFrontMap.repeat.set(1,0.5)
    let stereoFrontAlpha = textureLoader.load('/textures/stereo-frontA.png')
    stereoFrontAlpha.wrapS = THREE.RepeatWrapping
    stereoFrontAlpha.wrapT = THREE.RepeatWrapping
    stereoFrontAlpha.repeat.set(1,0.5)
    let stereoFrontBump = textureLoader.load('/textures/stereo-frontB.png') 
    stereoFrontBump.wrapS = THREE.RepeatWrapping
    stereoFrontBump.wrapT = THREE.RepeatWrapping
    stereoFrontBump.repeat.set(1,0.5)

    // mat = new THREE.MeshPhysicalMaterial( { map: stereoMap, bumpMap: stereoBump, alphaMap: stereoAlpha, bumpScale: 0.8 })
    mat2 = new THREE.MeshPhysicalMaterial( { map: stereoFrontMap, bumpMap: stereoFrontBump, alphaMap: stereoFrontAlpha, bumpScale: 0.8 })

    // var mater = new THREE.MeshBasicMaterial([mat, mat2])
    super(geo, bbox, [255,255,255], mat2 )

    // isplaying 
    this.playing = false
    this.currentTrack = 0

    this.album = album

    this.tracks = []

    if(this.album && this.album.trackUrls){
      this.loadAlbum(this.album.trackUrls)
    }

    // juz do

    let stopgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let stopmat = new THREE.MeshStandardMaterial( { bumpMap: stereoBump, color: "#ff0000" })
    let stopoffset = new THREE.Vector3(-0.02,-0.02,0.05)

    let stopClick = () => {
      if(this.album){
        this.stopSong(this.currentTrack)
        this.setDisplayText("STOP PLAYBACK ")
      }
    }

    this.stopButton = new Component( this, stopoffset, stopgeo, [255,0,0], stopmat, stopClick )
    this.stopButton.clickable = true
    scene.add(this.stopButton.mesh)
    this.components.push( this.stopButton )

    let playgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let playmat = new THREE.MeshStandardMaterial( { bumpMap: stereoBump, color: "#00ff00" })
    let offset = new THREE.Vector3(0.02,-0.02,0.05)

    let pbClick = () => {
      if(this.album){ 
        this.playSong(this.currentTrack)
        this.setDisplayText("PLAYING TRACK " + (this.songIndex + 1))
      }
    }
    this.playButton = new Component( this, offset, playgeo, [255,255,0], playmat, pbClick )
    this.playButton.clickable = true
    scene.add(this.playButton.mesh)
    this.components.push( this.playButton )


    let nextgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let nextmat = new THREE.MeshStandardMaterial( { bumpMap: stereoFrontBump, color: "#ff00ff" })
    let nextoffset = new THREE.Vector3(0.06,-0.02,0.05)

    let nextClick = () => {
      if(this.album){
        this.nextTrack()
      }
    }

    this.nextButton = new Component( this, nextoffset, nextgeo, [255,0,255], nextmat, nextClick )
    this.nextButton.clickable = true
    scene.add(this.nextButton.mesh)
    this.components.push( this.nextButton )


    let prevgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let prevmat = new THREE.MeshStandardMaterial( { bumpMap: stereoFrontBump, color: "#ffff00" })
    let prevoffset = new THREE.Vector3(-0.06,-0.02,0.05)
    this.prevButton = new Component( this, prevoffset, prevgeo, [255,0,255], prevmat, () => { if(this.album){ this.prevTrack() } } )
    this.prevButton.clickable = true
    scene.add(this.prevButton.mesh)
    this.components.push( this.prevButton )

    
    let otherBoxgeo = new THREE.BoxGeometry( 0.2, 0.1, 0.1 )
    let otherBoxmat = new THREE.MeshStandardMaterial( { map: stereoFrontMap, bumpMap: stereoFrontBump, alphaMap: stereoFrontAlpha, color: "#ffff00" })
    let otherBoxoffset = new THREE.Vector3(0,0.1,0)
    this.otherBox = new Component( this, otherBoxoffset, otherBoxgeo, [255,0,255], otherBoxmat )
    scene.add(this.otherBox.mesh)
    this.components.push( this.otherBox )

    let traygeo = new THREE.BoxGeometry( 0.18, 0.01, 0.06 )
    let traymat = new THREE.MeshBasicMaterial( { color: "#00ffff" })
    let trayoffset = new THREE.Vector3(0,0.12,0.05)

    let trayAction = (droppedChar) => {
      if(this.state == OPEN && droppedChar.itemType == ALBUM){
        // insert that damn album to MusicPlayer


        // put it in the try
        droppedChar.mesh.position.set( this.tray.mesh.position )
        droppedChar.mesh.rotation.x = util.radian(120)

        // just set dropped as musicplayer's album, hit eject to insert
        this.album = droppedChar
      }
    }
    this.tray = new Component( this, trayoffset, traygeo, [0,255,255], traymat, null, trayAction )
    scene.add(this.tray.mesh)

    this.state = CLOSED
    // tray will have a drop action...
    this.tray.droppable = true
    this.components.push( this.tray )

    let ejectgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let ejectmat = new THREE.MeshStandardMaterial( { bumpMap: stereoFrontBump, color: "#ffff00" })
    let ejectoffset = new THREE.Vector3(-0.06,0.08,0.05)

    let ejClick = () => {

      console.log( 'hey dickface' )
      if(this.state == OPEN){
        console.log( 'open' )

        let album
        if(this.album){
          // if album is staged on tray, INSERT
          album = this.album
        }

        this.insert()
        this.setDisplayText("CLOSING ")
      } else if(this.state == CLOSED) {
        console.log( 'closed' )
        // no alubm just opens tray
        this.eject()
        this.setDisplayText("OPENING ")
      }
    }

    this.ejectButton = new Component( this, ejectoffset, ejectgeo, [255,255,0], ejectmat, ejClick )
    this.ejectButton.clickable = true
    scene.add(this.ejectButton.mesh)
    this.components.push( this.ejectButton )
    
    // display
    this.createDisplay()
    this.displayTextIndex = 0
    this.displayTextTimer = new Timer()
    this.displayTextTimer.start()
    this.setDisplayText("WELCOME TO FOG STEREO HI-FI 音楽が来ましょう")
  }

  eject(){
    // open the tray!sz
    if(this.album){
      this.stopSong()
      this.tracks = []
    }

    this.state = OPENING
  }

  insert(){
    // close th tray

    this.state = CLOSING

    if(this.album){
      console.log( 'I inserted album! ', this.album )
      this.album.grabbable = false

      this.setDisplayText("NOW LOADING " + this.album.title + " ")
    }
  }

  // triggered by sttate
  openAnimation(){
    console.log( 'opening' )
    if( this.tray.mesh.rotation.x < util.radian(120) && (!this.album || this.album.mesh.rotation.x < util.radian(120)) ){
      this.tray.mesh.rotation.x += 0.02

      if(this.album){
        this.album.mesh.rotation.x == 0.02
      }
    } else {
      this.state = OPEN

      if(this.album){
        // done ejecting, spit the album out and kick it away, were done with it
        // this.album.accy += 0.01

        this.album.mesh.position.set( this.mesh.position.x,this.mesh.position.y+0.1,this.mesh.position.z )
        console.log( 'this happend!', this.album )
        // make it grabbo once again
        // this.album.grabbable = true
        this.album = null

      }

      this.setDisplayText("OPENING OK! ")
    }
  }

  closeAnimation(){
    console.log( 'closing' )
    if(this.tray.mesh.rotation.x >= util.radian(0) && (!this.album || this.album.mesh.rotation.x >= util.radian(0))  ){
      this.tray.mesh.rotation.x -= 0.02

      if(this.album){
        this.album.mesh.rotation.x -= 0.02
      }
    } else {
      this.state = CLOSED

      this.setDisplayText("LOADING OK! ")
      if(this.album){
        this.loadAlbum( this.album.trackUrls )
      }
    }
  }

  createDisplay(){
    let wallAlpha = textureLoader.load('/textures/rain-wall-textA.png') 
    wallAlpha.wrapS = THREE.RepeatWrapping
    wallAlpha.wrapT = THREE.RepeatWrapping
    wallAlpha.repeat.set(2,15)
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let dispBackOffset = new THREE.Vector3(0,0.02,0.06)
    this.displayBack = new Component(this, dispBackOffset, new THREE.PlaneGeometry(0.18,0.04), [10,10,255], new THREE.MeshPhysicalMaterial({transparent: false, clearcoat: 0.8, transmission: 0, bumpMap: wallBump, bumpScale: 0.09, alphaMap: wallAlpha}))
    scene.add( this.displayBack.mesh )
    this.components.push( this.displayBack )

    // create a canvas element
    this.displayText = ""
    let mat = this.createDisplayMat(this.displayText)
    let dispOffset = new THREE.Vector3(0,0.0175,0.065)
    this.display = new Component(this, dispOffset, new THREE.PlaneGeometry(0.18,0.04), [71,225,250], mat)
    scene.add( this.display.mesh )

    // place.characters[this.display.mesh.id] = this.display
    this.components.push( this.display )
  }

  setDisplayText(text){
    this.displayText = text
    this.displayTextIndex = 0
  }

  displayAnimation(){
    if(this.displayTextTimer.time() > 1200){
      this.displayTextTimer.reset()
      this.displayTextIndex += 1
      if(this.displayTextIndex == this.displayText.length){
        this.displayTextIndex = 0
      }

      this.setDisplay()
    }
  }

  setDisplay(){
    // set in anim lloop
    let subtext = this.displayText.substring(this.displayTextIndex, this.displayTextIndex + 10)

    if(subtext.length < 10){
      let numNeeded = 10 - subtext.length
      subtext += this.displayText.substring(0, numNeeded - 1)
    }

    let newMat = this.createDisplayMat(subtext)
    this.display.mesh.material = newMat
  }

  createDisplayMat(text){
    let canvas1 = document.createElement('canvas')
    canvas1.width = 300
    canvas1.height = 60
    let context1 = canvas1.getContext('2d')
    context1.font = "Bold 60px Xanh Mono"
    context1.fillStyle = "rgba(0,255,255,0.45)"
    context1.textBaseLine = "middle"
    context1.fillText( text, 0, 50)

    // canvas contents will be used for a texture
    let texture1 = new THREE.CanvasTexture(canvas1) 
    texture1.needsUpdate = true

    let material1 = new THREE.MeshBasicMaterial( { opacity: 0.6, map: texture1, side: THREE.DoubleSide } )
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

    this.setDisplayText(this.album.title + " - TRACK " + (this.currentTrack+1) + " ")

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
    this.setDisplayText("STOP PLAYBACK ")
  }

  nextTrack(){
    console.log( 'next track', this.currentTrack )
    this.incTrack(1)
    this.setDisplayText(" >> TR " + (this.currentTrack+1))
  }
  
  prevTrack(){
    console.log( 'prev track', this.currentTrack )
    this.incTrack(-1)
    this.setDisplayText(" << TR " + (this.currentTrack+1))
  }

  incTrack(inc){
    // inc looping around
    this.currentTrack = util.incInRange(this.currentTrack, inc, 0, this.tracks.length-1)
    console.log( 'current track now inc to ', this.currentTrack )

    if(this.playing){
      // if already playing, stop current song and  play new now
      this.stopSong()
      this.playSong(this.currentTrack)
    }
  }


  customAnimation(){

    this.displayAnimation()

    if(this.state == OPENING){
      this.openAnimation()
    } else if(this.state == CLOSING) {
      this.closeAnimation()
    }
  }
}

export { MusicPlayer }