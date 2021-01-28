import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
// import { Sound } from "./Sound.js"
import { Timer } from "./Timer.js"
import { GoStone } from "./GoStone.js"
import { util, textureLoader, scene, place } from "./main.js"

class GoBoard extends Character {
  constructor(map, bump){
    super(new THREE.BoxGeometry( 0.2700000000000002,0.008,0.3000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [50,50,50], new THREE.MeshPhysicalMaterial( { map: map, bumpMap: bump, bumpScale: 0.002, transparent: true }))

    this.boardLength = 19

    this.stones = this.initStones()
    this.deadStones = {}

    this.testRow = 0
    this.testColumn = 0
    
    this.addGoStoneTimer = new Timer()
    this.addGoStoneTimer.start()
    this.goStoneColor = BLACK
    this.deadStoneTimer = new Timer()
    this.deadStoneTimer.start()
  }

  initStones(){
    let stones = []
    for(var i=0; i<this.boardLength; i++){
      stones[i] = new Array(this.boardLength)
    }

    return stones
  }

  availableSpots(){
    let spots = []
    for(var i=0; i<this.stones.length; i++){
      for(var x=0; x<this.stones[i].length; x++){
        if(!this.stones[i][x]){
          spots.push( [ i, x ] )
        }
      }
    }

    return spots
  }

  playStone(row, column, color){
    // row = this.testRow
    // column = this.testColumn
    // if(this.testRow == this.boardLength){
    //   // throw "SHIT!"
    // }

    // this.testColumn = this.testColumn + 1
    // if(this.testColumn == this.boardLength){
      
    //   this.testRow = this.testRow + 1
    //   this.testColumn = 0
    // }

    let stone = new GoStone(color)
    scene.add(stone.mesh)
    place.characters[stone.mesh.id] = stone

    // put at grid spot
    let sp = this.stonePosition(row, column)
    stone.mesh.position.set( sp.x,sp.y,sp.z )
    this.stones[row][column] = stone
    // console.log( 'play rnadom', row, column, color )
  }

  stonePosition(row, column){

    let x,y,z
    // offset from top left
    x = (this.mesh.position.x - 0.13) + row * 0.0138
    y = this.mesh.position.y + 0.008
    z = (this.mesh.position.z - 0.13) + column * 0.0144
    return new THREE.Vector3(x,y,z)
    // return new THREE.Vector3(-0.4,1.25,-0.6499999999999999)
  }

  playRandom(color){
    let spot = util.shuffle( this.availableSpots() )[0]
    if(spot){
      this.playStone(spot[0], spot[1], color)
    }

  }

  computeBoard(colorToRemove){
    let stonesToRemove = []
    for(var i=0; i<this.boardLength; i++){
      for(var x=0; x<this.boardLength; x++){
        // thers a stone there, its the color were looking for and 

        if( this.stones[i][x] && this.stones[i][x].goStoneColor == colorToRemove && !this.checkLife(i,x) ){
          // console.log( 'removing', i,x )
          stonesToRemove.push([i,x])
        }
      }
    }


    console.log( 'it is time to remove ', stonesToRemove.length, ' stones' )
    for(var i=0; i<stonesToRemove.length; i++){
      this.removeStone(stonesToRemove[i][0],stonesToRemove[i][1])
    }
  }

  checkLife(row, column){
    // let thisStoneColor = this.stones[row][column].color
    let liberties = 4

    // above
    if( (row-1 < 0) || (this.stones[row-1][column] && this.stones[row-1][column].color != this.stones[row][column].color) ){
      liberties -= 1
    }

    // right
    if( (column+1 == this.boardLength) || (this.stones[row][column+1] && this.stones[row][column+1].color != this.stones[row][column].color)){
      liberties -= 1
    }

    // below
    if( (row+1 == this.boardLength) || (this.stones[row+1][column] && this.stones[row+1][column].color != this.stones[row][column].color) ){
      liberties -= 1
    }

    // left
    if( (column-1 < 0) || (this.stones[row][column-1] && this.stones[row][column-1].color != this.stones[row][column].color) ){
      liberties -= 1
    }

    return liberties > 0
  }

  removeStone(row,column){
    let stone = this.stones[row][column]
    this.deadStones[stone.mesh.id] = stone
    this.stones[row][column] = null
    // stone.routePoints.push([0.3,1.6,0.3],[-0.3,1.6,0.3],[-0.3,1.6,-0.3],[0.3,1.6,-0.3])
    this.deadStones[stone.mesh.id].routePoints.push([0.03,1.6,0.03],[-0.03,1.6,0.03],[-0.03,1.6,-0.03],[0.03,1.6,-0.03])
  }

  cullDeadStones(){
    let dsKeys = util.k(this.deadStones)
    if(dsKeys.length > 0){

      let numToCull = Math.floor(Math.random() * dsKeys.length)

      for(var i=0; i<numToCull; i++){
        place.characters[ this.deadStones[dsKeys[i]].mesh.id ].remove()
        delete this.deadStones[dsKeys[i]]
      }

    }
  }

  customAnimation(){
    // runs because gobard is a character

    // if(this.addGoStoneTimer.time() > 20000){
    //   this.addGoStoneTimer.reset()
    //   this.goStoneColor = !this.goStoneColor
      
    //   this.playRandom(this.goStoneColor)
    //   // BLACK just played, so remove WHITE
    //   this.computeBoard(!this.goStoneColor)
    // }

    // if(this.deadStoneTimer.time() > 20000){
    //   this.deadStoneTimer.reset()
    //   this.cullDeadStones()
    // }
  }
}

export { GoBoard }