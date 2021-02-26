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
    
    super(null, bbox, [255,255,255], null, null, null, place.models["/models/stereo.glb"] )


    let playButtonBump = textureLoader.load('/textures/playButtonBumpB.png') 
    playButtonBump.wrapS = THREE.RepeatWrapping
    playButtonBump.wrapT = THREE.RepeatWrapping
    playButtonBump.repeat.set(1,1)

    let stopButtonBump = textureLoader.load('/textures/stopButtonBumpB.png') 
    stopButtonBump.wrapS = THREE.RepeatWrapping
    stopButtonBump.wrapT = THREE.RepeatWrapping
    stopButtonBump.repeat.set(1,1)

    let createPrevButton = (nextTex) => {
      // make this as proc so we get the correct 'this'
      // needs to be after load function because we can't clone nexttex until after we got the image
      // prev tex is just a rotation of next

      let prevTex = nextTex.clone()
      prevTex.needsUpdate = true
      prevTex.rotation = Math.PI

      let prevgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
      let prevmat = new THREE.MeshStandardMaterial( {  color: "#ffff00", bumpMap: prevTex, bumpScale: 0.008 })
      let prevoffset = new THREE.Vector3(0.005,-0.015,0.1)
      let prevClick = () => {
        if(this.state == CLOSED){
          if(this.album){
            this.prevTrack()
          }  
        } else {
          this.showText("TRAY OPEN!       ")
        }
      }

      this.prevButton = new Component( this, prevoffset, prevgeo, [100,0,100], prevmat, prevClick )
      this.prevButton.clickable = true
      // this.prevButton.roty = util.radian(90)
      // this.prevButton.mesh.rotation.y = this.prevButton.roty 
      scene.add(this.prevButton.mesh)
      this.components.push( this.prevButton )

      // move to current mesh position so components follow
      this.resetComponents()
      // initialize as closed
      this.insert()
    }
    // bound to be this
    createPrevButton = createPrevButton.bind(this)

    // multiplier for starspeed button
    place.starSpeed = 1

    let nextButtonBump = textureLoader.load('/textures/nextButtonBumpB.png', (nextTex) => {
      createPrevButton(nextTex)
    }) 

    nextButtonBump.wrapS = THREE.RepeatWrapping
    nextButtonBump.wrapT = THREE.RepeatWrapping
    nextButtonBump.repeat.set(1,1)

    let ejectButtonBump = textureLoader.load('/textures/ejectButtonBumpB.png') 
    ejectButtonBump.repeat.set(1,1)
    ejectButtonBump.wrapS = THREE.RepeatWrapping
    ejectButtonBump.wrapT = THREE.RepeatWrapping

    let trayBump = textureLoader.load('/textures/stereo-trayB.png') 
    trayBump.wrapS = THREE.RepeatWrapping
    trayBump.wrapT = THREE.RepeatWrapping
    trayBump.repeat.set(1,1)

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

    this.volume = 0.5
    this.volumeTimer = new Timer()
    this.volumeTimer.start()

    // juz do buttons
    let stopgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let stopmat = new THREE.MeshStandardMaterial( {  bumpMap: stopButtonBump, color: "#ff00ff", bumpScale: 0.008 })
    let stopoffset = new THREE.Vector3(0.045,-0.015,0.1)

    let stopClick = () => {
      if(this.state == CLOSED){
        if(this.album){ 
          this.stopSong(this.currentTrack)
          this.showText("STOP PLAYBACK       ")
        }

      } else {
        this.showText("TRAY OPEN!       ")
      }
      
    }

    this.stopButton = new Component( this, stopoffset, stopgeo, [100,0,100], stopmat, stopClick )
    this.stopButton.clickable = true
    scene.add(this.stopButton.mesh)
    this.components.push( this.stopButton )

    let playgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let playmat = new THREE.MeshStandardMaterial( {  color: "#00ff00", bumpMap: playButtonBump, bumpScale: 0.008 })

    let playOffset = new THREE.Vector3(0.085,-0.015,0.1)

    let pbClick = (id) => {
      if(this.album && this.state == CLOSED){ 
        this.playSong(this.currentTrack)

        let title = ""
        if(this.tracks[this.currentTrack].title){
          title = this.tracks[this.currentTrack].title + " "
        }
        this.showText("PLAYING TRACK " + (this.currentTrack + 1 + " " + title))
      }

      console.log( 'hey dummy clickin pb', place.characters[id] )
      // this.playButton.push()
    }
    this.playButton = new Button( this, playOffset, playgeo, [100,0,100], playmat, pbClick )
    this.playButton.clickable = true
    scene.add(this.playButton.mesh)
    this.components.push( this.playButton )

    let nextgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let nextmat = new THREE.MeshStandardMaterial( {  bumpMap: nextButtonBump, color: "#ff00ff", bumpScale: 0.008 })
    let nextoffset = new THREE.Vector3(0.125,-0.015,0.1)

    let nextClick = () => {
      if(this.state == CLOSED){
        if( this.album ){
          this.nextTrack()
        }  
      } else {
        this.showText("TRAY OPEN!       ")
      }
    }

    this.nextButton = new Component( this, nextoffset, nextgeo, [100,0,100], nextmat, nextClick )
    this.nextButton.clickable = true
    scene.add(this.nextButton.mesh)
    this.components.push( this.nextButton )

    let ejectgeo = new THREE.BoxGeometry( 0.03, 0.02, 0.04 )
    let ejectmat = new THREE.MeshStandardMaterial( {  bumpMap: ejectButtonBump, bumpScale: 0.008, color: "#ffff00" })
    let ejectoffset = new THREE.Vector3(0.005,0.059,0.1)

    let ejClick = () => {

      console.log( 'hey fuckface' )
      if(this.state == OPEN){
        console.log( 'open' )
        this.insert()
        this.showText("CLOSING       ")
      } else if(this.state == CLOSED) {
        console.log( 'closed' )
        // no alubm just opens tray

        this.eject()
        this.showText("OPENING       ")
      }

      // having issues with this being deflagged, uh probably
      // so kill it explicitly
      this.ejectButton.clicked = false
    }

    this.ejectButton = new Component( this, ejectoffset, ejectgeo, [100,0,100], ejectmat, ejClick )
    this.ejectButton.clickable = true
    scene.add(this.ejectButton.mesh)
    this.components.push( this.ejectButton )

    let traygeo = new THREE.BoxGeometry( 0.165, 0.016, 0.16 )
    let traymat = new THREE.MeshPhysicalMaterial( { bumpScale: 0.002, bumpMap: trayBump, color: "#000000" })
    let trayoffset = new THREE.Vector3(0.092,0.018,0.1)

    let trayAction = (droppedChar) => {
      if(this.state == OPEN && droppedChar.itemType == ALBUM){
        // insert that damn album to MusicPlayer

        // put it in the try
        // put in position to rotate with tray
        droppedChar.pushable = false

        // droppedChar.mesh.position.set( -0.4,1.57,-0.89999 )
        // just a little above tray position
        droppedChar.mesh.position.set( this.tray.mesh.position.x,this.tray.mesh.position.y+0.01,this.tray.mesh.position.z )

        droppedChar.mesh.rotation.z = 0
        droppedChar.mesh.rotation.y = 0
        droppedChar.mesh.rotation.x = util.radian(90)
        // for animatnion
        droppedChar.rotatable = false

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

    // LCD brightness up
    let lcdBrightUpGeo = new THREE.BoxGeometry(0.0099,0.0099,0.0099)
    let lcdBrightUpOffset = new THREE.Vector3(0.195,-0.02,0.12)
    let lcdBrightUpMat = new THREE.MeshBasicMaterial({color: "#ff0000"})
    let lcdBrightUpAction = () => {
      console.log( 'i did do up' )
      this.lcdLight.intensity += 0.001
      this.lcdLight.intensity = util.incInRange(this.lcdLight.intensity, 0.001, 0, 0.8)
    }
    let lcdBrightUp = new Component(this, lcdBrightUpOffset, lcdBrightUpGeo, [255,0,0], lcdBrightUpMat, lcdBrightUpAction)
    scene.add(lcdBrightUp.mesh)
    lcdBrightUp.mesh.visible = false
    lcdBrightUp.clickable = true
    this.components.push(lcdBrightUp)

    let lcdBrightDownGeo = new THREE.BoxGeometry(0.0099,0.0099,0.0099)
    let lcdBrightDownOffset = new THREE.Vector3(0.165,-0.02,0.12)
    let lcdBrightDownMat = new THREE.MeshBasicMaterial({color: "#ff0000"})
    let lcdBrightDownAction = () => {
      console.log( 'i did do down' )
      this.lcdLight.intensity = util.incInRange(this.lcdLight.intensity, -0.001, 0, 0.8)
      this.clicked = false
    }
    // LCD brightness down
    let lcdBrightDown = new Component(this, lcdBrightDownOffset, lcdBrightDownGeo, [255,0,0], lcdBrightDownMat, lcdBrightDownAction)
    scene.add(lcdBrightDown.mesh)
    lcdBrightDown.mesh.visible = false
    lcdBrightDown.clickable = true
    this.components.push(lcdBrightDown)


    // star speed button
    let starspeedGeo = new THREE.BoxGeometry(0.03,0.03,0.03)
    let starspeedOffset = new THREE.Vector3(0.193,0.061,0.12)
    let starspeedMat = new THREE.MeshBasicMaterial({color: "#ff0000"})
    let starspeedAction = () => {
      place.starSpeed = place.starSpeed*1.61803398875
      console.log( 'i did do stars', place.starSpeed )
      if(place.starSpeed>=1000){
        place.starSpeed = 1
      }
    }
    let starspeed = new Component(this, starspeedOffset, starspeedGeo, [255,0,0], starspeedMat, starspeedAction)
    scene.add(starspeed.mesh)
    starspeed.mesh.visible = false
    starspeed.clickable = true
    this.components.push(starspeed)

    this.displayDefaultText = "HELLO - WE ARE - SONANT Sound SYSTEM - WELCOME TO Sound SYSTEM BY FOG LABS - FEEL X-Class Dimensional Audio "
    this.setDisplayText(this.displayDefaultText)
  }

  eject(){
    // open the tray!sz
    if(this.album){
      this.stopSong()
      this.currentTrack = 0
      this.tracks = []
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
      this.showText("NOW LOADING " + this.album.title + "       ")
    }
  }

  // triggered by sttate
  openAnimation(){
    // console.log( 'opening' )
    if( !util.isWithin(this.tray.mesh.position.z, -0.74, 0.02)  && (!this.album || !util.isWithin(this.album.mesh.position.z, -0.74, 0.02) ) ){
      this.tray.mesh.position.z += 0.02

      if(this.album){
        this.album.mesh.position.set(this.album.mesh.position.x,this.album.mesh.position.y,this.album.mesh.position.z += 0.02)
      }

    } else {
      this.state = OPEN

      if(this.album){
        // pop it up in the air
        // this.album.mesh.position.set( this.mesh.position.x,this.mesh.position.y+0.12,this.mesh.position.z )

        this.album.accz =  0.5     

        // make it grabbo once again
        this.album.grabbable = true
        console.log( 'right now I became grabbo', this.album )
        this.album.pushable = true
        // back to normal rot
        this.album.rotatable = true

        this.album = null

      }

      this.showText("OPENING OK!       ")
    }
  }

  closeAnimation(){
    // console.log( 'closing' )
    if( !util.isWithin(this.tray.mesh.position.z, -0.9499999999999998, 0.02)  && (!this.album || !util.isWithin(this.album.mesh.position.z, -0.9499999999999998, 0.02) ) ){
      this.tray.mesh.position.z -= 0.02

      if(this.album){
        this.album.mesh.position.set(this.album.mesh.position.x,this.album.mesh.position.y,this.album.mesh.position.z -= 0.02)
      }
    } else {
      this.state = CLOSED

      if(this.album){
        this.showText("LOADING OK!       ")
        this.loadAlbum( this.album.trackUrls )
      }
    }
  }

  createDisplay(){
    let wallBump = textureLoader.load('/textures/rain-wall-textB.png') 
    wallBump.wrapS = THREE.RepeatWrapping
    wallBump.wrapT = THREE.RepeatWrapping
    wallBump.repeat.set(2,15)

    let dispBackOffset = new THREE.Vector3(0.080,0.09,0.122)
    this.displayBack = new Component(this, dispBackOffset, new THREE.PlaneGeometry(0.18,0.025), [221,10,255], new THREE.MeshPhysicalMaterial({transparent: false, clearcoat: 0.8, transmission: 0, bumpMap: wallBump, bumpScale: 0.09}))
    scene.add( this.displayBack.mesh )
    this.components.push( this.displayBack )

    // create a canvas element
    this.displayText = ""
    let mat = this.createDisplayMat(this.displayText)
    // 05201
    let dispOffset = new THREE.Vector3(0.080,0.096,0.12201)
    this.display = new Component(this, dispOffset, new THREE.PlaneGeometry(0.18,0.04), [255,255,255], mat)
    scene.add( this.display.mesh )

    // place.characters[this.display.mesh.id] = this.display
    this.components.push( this.display )

    let lcdLight = new THREE.PointLight("#dd00ff", 0.0036, 5, 2.4  )
    lcdLight.position.set( this.display.mesh.position.x,this.display.mesh.position.y,this.display.mesh.position.z )
    lcdLight.lookAt(new THREE.Vector3(0,0,2))
    this.lcdLight = lcdLight

    scene.add( lcdLight )
  }

  showText(text){
    this.idle = false
    this.displayIdleTimer.reset()
    this.setDisplayText(text)
  }

  setDisplayText(text){
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
      this.showText(this.displayDefaultText)
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
      sound = new Sound("track"+i, urls[i], this.volume, false, false, false)
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

    this.showText(this.album.title + " - TRACK " + (this.currentTrack+1) + "       ")

    // now load the next one 
    let nextTrack = this.currentTrack+1
    if(this.tracks[nextTrack] && !this.tracks[nextTrack].loaded){
      this.tracks[nextTrack].load()
    }
  }

  changeVolume(inc){
    if( this.playing && this.tracks.length>1 && this.tracks[this.currentTrack].loaded ){

      if(this.volumeTimer.time() > 800){
        this.volumeTimer.reset()

        //  inc player volume
        this.volume = util.incInRange(this.volume, inc, 0, 10)
        // set vol for all tracks so it stays consistent after track change
        for(var i=0; i<this.tracks.length; i++){
          if(this.tracks[i].loaded){
            this.tracks[i].setVolume(this.volume)
          }
        }        
      }

    }
  }

  stopSong(){
    console.log( 'stop song', this.currentTrack )
    this.tracks.forEach( (t) => { t.stop() } )
    this.playing = false
    this.showText("STOP PLAYBACK       ")
  }

  nextTrack(){
    console.log( 'next track', this.currentTrack )
    this.incTrack(1)
    this.showText(" >> TR " + (this.currentTrack+1))
  }
  
  prevTrack(){
    console.log( 'prev track', this.currentTrack )
    this.incTrack(-1)
    this.showText(" << TR " + (this.currentTrack+1))
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