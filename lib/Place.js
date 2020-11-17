import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { util, scene } from "./main.js"

class Place {
  // encapsulates background color/image control, scenery objects, and floor object
  constructor(backgroundHex, characters, floorObjects, sounds={}){
    this.backgroundHex = backgroundHex
    this.characters = characters
    this.junk = []

    let floorObjectsByHeight = floorObjects.sort( (a,b) =>  {
      // shoujld end up in descending order by y pos
      return b.mesh.position.y - a.mesh.position.y 
      // if(a.mesh.position.y > b.mesh.position.y){
      //   // if a is higher in scene than b, it goes first in the array
      //   return -1
      // } else {
      //   // otherwise, second
      //   return 1
      // }
    })


    this.floorObjects = floorObjectsByHeight

    this.cullTimer = new Timer()
    this.cullTimer.start()

    this.destination = [0,1.5,-2]
    this.destinationTimer = new Timer()
    this.destinationTimer.start()

    this.sounds = sounds
  }

  handleSounds(){
    let sound, soundKeys = util.k(this.sounds)
    for(var i=0; i<soundKeys.length; i++){
      sound = this.sounds[ soundKeys[i] ]

      if(sound){
        sound.handle()
      }
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

  handleFloor(){
    if(this.floorChanged){
      // every time we flag this, we'll regen floorobject bboxes once

      this.floorObjects.forEach((floorOb) => {
        // then we'll use this to determin floor hit
        floorOb.bbox.setFromObject( floorOb.mesh )
      })
    }
  }

  isTouchingFloor(char){
    let touching
    // gotta let it touch
    touching = this.floorObjects.some((floorOb) => {
      return floorOb.bbox.intersectsBox( char.bbox )
    })

    return touching
  }

  customHandle(){}
  handle(){
    // redefined in subclass
    this.customHandle()

    this.handleFloor()
    this.handleJunk()
    this.handleCharacters()
    this.handleSounds()
  }
}

export { Place }