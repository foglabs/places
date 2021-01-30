import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { Sound } from "./Sound.js"
import { Timer } from "./Timer.js"
import { Button } from "./Button.js"
import { util, textureLoader, scene, place } from "./main.js"

class MusicPlayer extends Character {
  constructor(album=null){

    let geo, bbox, mat, mat2
    geo = new THREE.BoxGeometry( 0.2, 0.1, 0.1 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

    // let stereoMap = textureLoader.load('/textures/stereo.png') 
    // stereoMap.wrapS = THREE.RepeatWrapping
    // stereoMap.wrapT = THREE.RepeatWrapping
    // stereoMap.repeat.set(1,0.5)
    // let stereoBump = textureLoader.load('/textures/stereoB.png') 
    // stereoBump.wrapS = THREE.RepeatWrapping
    // stereoBump.wrapT = THREE.RepeatWrapping
    // stereoBump.repeat.set(1,0.5)

    // let stereoFrontMap = textureLoader.load('/textures/stereo-front.png') 
    // stereoFrontMap.wrapS = THREE.RepeatWrapping
    // stereoFrontMap.wrapT = THREE.RepeatWrapping
    // stereoFrontMap.repeat.set(1,0.5)
    // let stereoFrontBump = textureLoader.load('/textures/stereo-frontB.png') 
    // stereoFrontBump.wrapS = THREE.RepeatWrapping
    // stereoFrontBump.wrapT = THREE.RepeatWrapping
    // stereoFrontBump.repeat.set(1,0.5)

    let buttonMap = textureLoader.load('/textures/button.png') 
    buttonMap.wrapS = THREE.RepeatWrapping
    buttonMap.wrapT = THREE.RepeatWrapping
    buttonMap.repeat.set(1,1)

    let playButtonBump = textureLoader.load('/textures/playButtonBumpB.png') 
    playButtonBump.wrapS = THREE.RepeatWrapping
    playButtonBump.wrapT = THREE.RepeatWrapping
    playButtonBump.repeat.set(1,1)

    let stopButtonBump = textureLoader.load('/textures/stopButtonBumpB.png') 
    stopButtonBump.wrapS = THREE.RepeatWrapping
    stopButtonBump.wrapT = THREE.RepeatWrapping
    stopButtonBump.repeat.set(1,1)

    let nextButtonBump = textureLoader.load('/textures/nextButtonBumpB.png') 
    nextButtonBump.wrapS = THREE.RepeatWrapping
    nextButtonBump.wrapT = THREE.RepeatWrapping
    nextButtonBump.repeat.set(1,1)

    let prevButtonBump = textureLoader.load('/textures/nextButtonBumpB.png') 
    prevButtonBump.repeat.set(1,1)
    prevButtonBump.wrapS = THREE.RepeatWrapping
    prevButtonBump.wrapT = THREE.RepeatWrapping

    let ejectButtonBump = textureLoader.load('/textures/ejectButtonBumpB.png') 
    ejectButtonBump.repeat.set(1,1)
    ejectButtonBump.wrapS = THREE.RepeatWrapping
    ejectButtonBump.wrapT = THREE.RepeatWrapping


    let trayMap = textureLoader.load('/textures/stereo-tray.png') 
    trayMap.wrapS = THREE.RepeatWrapping
    trayMap.wrapT = THREE.RepeatWrapping
    trayMap.repeat.set(1,1)
    let trayBump = textureLoader.load('/textures/stereo-trayB.png') 
    trayBump.wrapS = THREE.RepeatWrapping
    trayBump.wrapT = THREE.RepeatWrapping
    trayBump.repeat.set(1,1)

    // mat = new THREE.MeshPhysicalMaterial( { map: stereoMap, bumpMap: stereoBump, bumpScale: 0.8 })
    // mat2 = new THREE.MeshPhysicalMaterial( { map: stereoFrontMap, bumpMap: stereoFrontBump, bumpScale: 0.8 })

    // var mater = new THREE.MeshBasicMaterial([mat, mat2])
    
    // old
    // super(geo, bbox, [255,255,255], mat2 )
    super(null, bbox, [255,255,255], null, null, null, place.models["/models/stereo.glb"] )

    this.mesh.scale.set(0.035,0.035,0.035)
    this.mesh.rotation.y = util.radian(180)
    this.roty = util.radian(180)

    this.pushable = false
    this.grabbable = false

    // isplaying 
    this.playing = false
    this.currentTrack = 0

    this.album = album

    this.tracks = []

    if(this.album && this.album.trackUrls){
      this.loadAlbum(this.album.trackUrls)
    }

    // let faciageo = new THREE.BoxGeometry( 0.16, 0.03, 0.04 )
    // let faciamat = new THREE.MeshStandardMaterial( { map: stereoMap, bumpMap: stereoBump, color: "#ffffff", bumpScale: 0.008 })
    // let faciaoffset = new THREE.Vector3(0,-0.015,0.045)

    // this.buttonFacia = new Component( this, faciaoffset, faciageo, [255,255,255], faciamat )
    // this.buttonFacia.pushable = false
    // scene.add(this.buttonFacia.mesh)
    // this.components.push( this.buttonFacia )

    // let ejectfaciageo = new THREE.BoxGeometry( 0.16, 0.03, 0.04 )
    // let ejectfaciamat = new THREE.MeshStandardMaterial( { map: stereoMap, bumpMap: stereoBump, color: "#ffffff", bumpScale: 0.008 })
    // let ejectfaciaoffset = new THREE.Vector3(0,0.07,0.045)

    // this.buttonejectFacia = new Component( this, ejectfaciaoffset, ejectfaciageo, [255,255,255], ejectfaciamat )
    // this.buttonejectFacia.pushable = false
    // scene.add(this.buttonejectFacia.mesh)
    // this.components.push( this.buttonejectFacia )

    // juz do buttons
    let stopgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let stopmat = new THREE.MeshStandardMaterial( { map: buttonMap, bumpMap: stopButtonBump, color: "#ff0000", bumpScale: 0.008 })
    let stopoffset = new THREE.Vector3(0.045,-0.015,0.1)

    let stopClick = () => {
      if(this.state == CLOSED){
        if(this.album){ 
          this.stopSong(this.currentTrack)
          this.setDisplayText("STOP PLAYBACK       ")
        }

      } else {
        this.setDisplayText("TRAY OPEN!       ")
      }
      
    }

    this.stopButton = new Component( this, stopoffset, stopgeo, [255,0,0], stopmat, stopClick )
    this.stopButton.clickable = true
    scene.add(this.stopButton.mesh)
    this.components.push( this.stopButton )

    let playgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let playmat = new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00", bumpMap: playButtonBump, bumpScale: 0.008 })

    // let playmats = [
    //   playmat,
    //   new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00" }),
    //   new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00" }),
    //   new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00" }),
    //   new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00" }),
    //   new THREE.MeshStandardMaterial( { map: buttonMap, color: "#00ff00" })
    // ]

    let playOffset = new THREE.Vector3(0.085,-0.015,0.1)

    let pbClick = (id) => {
      if(this.album && this.state == CLOSED){ 
        this.playSong(this.currentTrack)

        let title = ""
        if(this.tracks[this.currentTrack].title){
          title = this.tracks[this.currentTrack].title + " "
        }
        this.setDisplayText("PLAYING TRACK " + (this.currentTrack + 1 + " " + title))
      }

      console.log( 'hey dummy clickin pb', place.characters[id] )
      // this.playButton.push()
    }
    this.playButton = new Button( this, playOffset, playgeo, [255,255,0], playmat, pbClick )
    this.playButton.clickable = true
    scene.add(this.playButton.mesh)
    this.components.push( this.playButton )

    let nextgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let nextmat = new THREE.MeshStandardMaterial( { map: buttonMap, bumpMap: nextButtonBump, color: "#ff00ff", bumpScale: 0.008 })
    let nextoffset = new THREE.Vector3(0.125,-0.015,0.1)

    let nextClick = () => {
      if(this.state == CLOSED){
        if( this.album ){
          this.nextTrack()
        }  
      } else {
        this.setDisplayText("TRAY OPEN!       ")
      }
      
    }

    this.nextButton = new Component( this, nextoffset, nextgeo, [255,0,255], nextmat, nextClick )
    this.nextButton.clickable = true
    scene.add(this.nextButton.mesh)
    this.components.push( this.nextButton )

    let prevgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let prevmat = new THREE.MeshStandardMaterial( { map: buttonMap, color: "#ffff00", bumpMap: prevButtonBump, bumpScale: 0.008 })
    let prevoffset = new THREE.Vector3(0.005,-0.015,0.1)
    let prevClick = () => {
      if(this.state == CLOSED){
        if(this.album){
          this.prevTrack()
        }  
      } else {
        this.setDisplayText("TRAY OPEN!       ")
      }
      
    }
    this.prevButton = new Component( this, prevoffset, prevgeo, [255,0,255], prevmat, prevClick )
    this.prevButton.clickable = true
    // this.prevButton.roty = util.radian(90)
    // this.prevButton.mesh.rotation.y = this.prevButton.roty 
    scene.add(this.prevButton.mesh)
    this.components.push( this.prevButton )

    let ejectgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let ejectmat = new THREE.MeshStandardMaterial( { map: buttonMap, bumpMap: ejectButtonBump, bumpScale: 0.008, color: "#ffff00" })
    let ejectoffset = new THREE.Vector3(0.005,0.07,0.1)

    let ejClick = () => {

      console.log( 'hey fuckface' )
      if(this.state == OPEN){
        console.log( 'open' )
        this.insert()
        this.setDisplayText("CLOSING       ")
      } else if(this.state == CLOSED) {
        console.log( 'closed' )
        // no alubm just opens tray

        this.eject()
        this.setDisplayText("OPENING       ")
      }

      // having issues with this being deflagged, uh probably
      // so kill it explicitly
      this.ejectButton.clicked = false
    }

    this.ejectButton = new Component( this, ejectoffset, ejectgeo, [255,255,0], ejectmat, ejClick )
    this.ejectButton.clickable = true
    scene.add(this.ejectButton.mesh)
    this.components.push( this.ejectButton )

    // top box
    // let otherBoxgeo = new THREE.BoxGeometry( 0.2, 0.1, 0.1 )
    // let otherBoxmat = new THREE.MeshStandardMaterial( { map: stereoFrontMap, bumpMap: stereoFrontBump, color: "#ffff00" })
    // let otherBoxoffset = new THREE.Vector3(0,0.1,0)
    // this.otherBox = new Component( this, otherBoxoffset, otherBoxgeo, [255,0,255], otherBoxmat )
    // scene.add(this.otherBox.mesh)
    // this.components.push( this.otherBox )

    let traygeo = new THREE.BoxGeometry( 0.165, 0.016, 0.16 )
    let traymat = new THREE.MeshPhysicalMaterial( { map: trayMap, bumpScale: 0.04, bumpMap: trayBump, color: "#ffffff" })
    let trayoffset = new THREE.Vector3(0.092,0.018,0.1)

    let trayAction = (droppedChar) => {
      if(this.state == OPEN && droppedChar.itemType == ALBUM){
        // insert that damn album to MusicPlayer

        // put it in the try
        // put in position to rotate with tray
        droppedChar.pushable = false

        droppedChar.mesh.position.set( -0.4,1.57,-0.89999 )

        droppedChar.mesh.rotation.x = util.radian(120)
        droppedChar.mesh.rotation.y = 0
        droppedChar.mesh.rotation.z = 0
        // for animatnion
        droppedChar.rotationLocked = true

        // just set dropped as musicplayer's album, hit eject to insert
        this.album = droppedChar
      }
    }
    this.tray = new Component( this, trayoffset, traygeo, [150,0,150], traymat, null, trayAction )
    scene.add(this.tray.mesh)

    this.idle = true
    this.state = CLOSED
    // tray will have a drop action...
    this.tray.droppable = true
    this.components.push( this.tray )

    // display
    this.createDisplay()
    this.displayTextIndex = 0
    this.displayTextTimer = new Timer()
    this.displayTextTimer.start()
    this.displayIdleTimer = new Timer()
    this.displayIdleTimer.start()

    this.setDisplayText("FOG STEREO QX5 - - - + WELCOME TO Sound SYSTEM - - - + ")

  }

  eject(){
    // open the tray!sz
    console.log( 'ej time' )
    if(this.album){
      this.stopSong()
      this.currentTrack = 0
      this.tracks = []
      console.log( 'hoe I did it' )
    }

    // triggers openAnimation, does work after animatno
    this.state = OPENING
  }

  insert(){
    // close th tray

    this.state = CLOSING

    if(this.album){
      console.log( 'I inserted album! ', this.album )
      this.album.grabbable = false
      this.setDisplayText("NOW LOADING " + this.album.title + "       ")
    }
  }

  // triggered by sttate
  openAnimation(){
    console.log( 'opening' )
    if( !util.isWithin(this.tray.mesh.position.z, -0.74, 0.02)  && (!this.album || !util.isWithin(this.album.mesh.position.z, -0.74, 0.02) ) ){
      this.tray.mesh.position.z += 0.02

      if(this.album){
        this.album.mesh.position.set(this.album.mesh.position.x,this.album.mesh.position.y,this.album.mesh.position.z += 0.02)
      }

    } else {
      this.state = OPEN

      if(this.album){
        // pop it up in the air
        this.album.mesh.position.set( this.mesh.position.x,this.mesh.position.y+0.12,this.mesh.position.z )

        this.album.accz =  0.5     

        // make it grabbo once again
        this.album.grabbable = true
        console.log( 'right now I became grabbo', this.album )
        this.album.pushable = true
        // back to normal rot
        this.album.rotationLocked = false

        this.album = null

      }

      this.setDisplayText("OPENING OK!       ")
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

      if(this.album){
        this.setDisplayText("LOADING OK!       ")
        this.loadAlbum( this.album.trackUrls )
      }
    }
  }

  createDisplay(){
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let dispBackOffset = new THREE.Vector3(0.065,0.09,0.122)
    this.displayBack = new Component(this, dispBackOffset, new THREE.PlaneGeometry(0.18,0.025), [221,10,255], new THREE.MeshPhysicalMaterial({transparent: false, clearcoat: 0.8, transmission: 0, bumpMap: wallBump, bumpScale: 0.09}))
    scene.add( this.displayBack.mesh )
    this.components.push( this.displayBack )

    // create a canvas element
    this.displayText = ""
    let mat = this.createDisplayMat(this.displayText)
    // 05201
    let dispOffset = new THREE.Vector3(0.065,0.096,0.12201)
    this.display = new Component(this, dispOffset, new THREE.PlaneGeometry(0.18,0.04), [255,255,255], mat)
    scene.add( this.display.mesh )

    // place.characters[this.display.mesh.id] = this.display
    this.components.push( this.display )

    let lcdLight = new THREE.PointLight("#dd00ff", 0.006, 5)
    lcdLight.position.set( this.display.mesh.position.x,this.display.mesh.position.y,this.display.mesh.position.z )
    scene.add( lcdLight )
    // AGH - refactor char.mesh.whatever to char.object.whatever
    // this.display = new Component(this, dispOffset, new THREE.PlaneGeometry(0.18,0.04), [71,225,250], mat)

  }

  setDisplayText(text){
    this.displayIdleTimer.reset()
    this.displayText = text
    this.displayTextIndex = 0
  }

  displayAnimation(){
    if(this.displayTextTimer.time() > 1200){
      this.displayTextTimer.reset()
      this.displayTextIndex += 1

      this.setDisplay()

      if(this.displayTextIndex > this.displayText.length){
        this.displayTextIndex = 0
      }

    }

    if(!this.idle && this.displayIdleTimer.time() > 4000){
      this.idle = true
      this.displayIdleTimer.reset()
      this.setDisplayText("~~~-. FOG STEREO QX5 .-~~~ WELCOME TO Sound SYSTEM ")
    }
  }

  setDisplay(){
    // set in anim lloop
    let subtext = this.displayText.substring(this.displayTextIndex, this.displayTextIndex + 18)

    if(subtext.length < 18){
      let numNeeded = 18 - subtext.length
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
    context1.font = "Bold 32px Xanh Mono"
    context1.fillStyle = "rgba(255,255,255,0.45)"
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
    let url, sound
    for(var i=0; i<urls.length; i++){
      url = urls[i]

      // wait to actually load cause its too much up front
      sound = new Sound("track"+i, urls[i], 0.5, false, false, false)
      sound.mesh.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z)
      this.tracks.push( sound )
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

    this.setDisplayText(this.album.title + " - TRACK " + (this.currentTrack+1) + "       ")

    // now load the next one 
    let nextTrack = this.currentTrack+1
    if(this.tracks[nextTrack] && !this.tracks[nextTrack].loaded){
      this.tracks[nextTrack].load()
    }
  }

  stopSong(){
    console.log( 'stop song', this.currentTrack )
    this.tracks.forEach( (t) => { t.stop() } )
    this.playing = false
    this.setDisplayText("STOP PLAYBACK       ")
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