import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { util, scene } from "./main.js"

class Place {
  // encapsulates background color/image control, scenery objects, and floor object
  constructor(backgroundHex, characters, floor, sounds={}){
    this.backgroundHex = backgroundHex
    this.characters = characters
    this.junk = []
    this.floor = floor

    this.cullTimer = new Timer()
    this.cullTimer.start()

    this.destination = [0,0,0]
    this.destinationTimer = new Timer()
    this.destinationTimer.start()

    this.sounds = sounds

    // test
    // let sk = util.k(this.sounds)
    // this.sounds[sk[0]].play()
  }

  handleSounds(){
    let sound, soundKeys = util.k(this.sounds)
    for(var i=0; i<soundKeys.length; i++){
      sound = this.sounds[ soundKeys[i] ]

      if(sound){
        sound.handle()
      }
      // if(sound.playing()){
      //   console.log("she playin wittem")
      // } else {
      //   console.log( 'she is not playin wittem' )
      // }
    }
  }

  handleCharacters(){

    let char, charKeys
    charKeys = util.k(this.characters)
    // console.log( 'characterskey', charKeys )
    for(var i=0; i<charKeys.length; i++){
      char = this.characters[charKeys[i]]
      char.animation()
      char.handleMovement()
    }
  }

  handleJunk(){
    if(this.destinationTimer.time() > 4000){
      // wait 8s before changing destination
      this.destinationTimer.reset()

      let x,y,z
      x = util.randomSign() * Math.random() * 2
      y = util.randomSign() * Math.random() * 2
      z = util.randomSign() * Math.random() * 2
      this.destination = [x,y,z]

      // random point for end of pointing stick flavor
      // rx = Math.random() * 2 * util.randomSign()
      // ry = Math.random() * 2 * util.randomSign()
      // rz = Math.random() * 2 * util.randomSign()
    }

    let junkPiece
    for(var i=0; i<this.junk.length; i++){
      junkPiece = this.junk[i]
      if(junkPiece){

        // handle momentum
        junkPiece.handleMovement()

        // if were set to follow cursor
        if(junkPiece.follower){
          // this is green cube point
          // cursor.x, etc..
          junkPiece.moveTowardsPoint(this.destination[0],this.destination[1],this.destination[2], 2)
        }

        // handle rotation
        junkPiece.animation()
        junkPiece.handleMovement()
      }
    }


    if(this.cullTimer.time() > 600){
      this.cullTimer.reset()
      if(this.junk.length > 4){
        let cullNum = Math.ceil( (this.junk.length/10)*Math.random() ) 
        this.cullJunk( cullNum )
      }
    }
  }

  cullJunk(num) {
    let pieceIndex
    let deleteInds = []
    // console.log( 'now cullin', num )

    for(var i=0; i<num; i++){

      pieceIndex = Math.floor(Math.random() * this.junk.length)
      if(this.junk[pieceIndex]){
        // console.log( 'now to cull', pieceIndex )
        this.junk[ pieceIndex ].remove()
        delete this.junk[pieceIndex]
      }
    }

    for(var i=0; i<this.junk.length; i++){
      if(!this.junk[i]){
        this.junk.splice(i,1)  
      }
    }
  }

  handle(){
    this.handleJunk()
    this.handleCharacters()
    this.handleSounds()
  }
}

export { Place }