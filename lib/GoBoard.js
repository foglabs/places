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
    this.currentStoneColor = BLACK
    this.deadStoneTimer = new Timer()
    this.deadStoneTimer.start()

    this.currentGroup = []
  }

  isInBoard(row,column){
    return row >= 0 && row < this.boardLength && column >= 0 && column < this.boardLength
  }

  checkStone(row, column, searchColor){
    if(this.isInBoard(row,column)){
      // its legit

      if( this.stones[row][column] ){

        if(!this.stones[row][column].checked){
          
          // theres a stone there, we have to check it

          // only check this stone once
          this.stones[row][column].checked = true

          if(this.stones[row][column].goStoneColor == searchColor ){
            // and its *our* stone

            let foundInCurrentGroup = this.currentGroup.some( (stone) => {stone[0] == row && stone[1] == column} )

            if( !foundInCurrentGroup ){
              // havent grouped this stone before

              // so add it to the gorup now
              this.currentGroup.push([row, column])
        
              // these will recursively collect all the other ones v

              // need to pull this out so we DO check all 4 dirs
              let result = false

              // check
              // left
              if( this.checkStone(row, column-1, searchColor) ){
                result = true
              }

              // up
              if( this.checkStone(row+1, column, searchColor) ){
                result = true
              }

              // right
              if( this.checkStone(row, column+1, searchColor) ){
                result = true
              }

              // down
              if( this.checkStone(row-1, column, searchColor) ){
                result = true
              }

              // dont that feel nice
              return result

            }
          } else {
            // its a enemyu stone
            // return false
          }

        }
        
      } else {
        // theres no stone, a-thatsa liberty, baby!
        return true
      }
      
    }
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
    let stone = new GoStone(color, row, column)
    scene.add(stone.mesh)
    place.characters[stone.mesh.id] = stone

    // put at grid spot
    let sp = this.stonePosition(row, column)
    stone.mesh.position.set( sp.x,sp.y,sp.z )
    this.stones[row][column] = stone
    // console.log( 'play rnadom', row, column, color )
  }

  getStoneKey(row, column){

  }

  getStoneCoor(key){
    return []
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

  uncheckAll(){
    for(var i=0; i<this.boardLength; i++){
      for(var x=0; x<this.boardLength; x++){
        if(this.stones[i][x]){
          this.stones[i][x].checked = false
        }
      }
    }
  }

  computeBoard(colorToRemove){
    this.uncheckAll()

    let stonesToRemove = []
    for(var i=0; i<this.boardLength; i++){
      for(var x=0; x<this.boardLength; x++){
        // thers a stone there, its the color were looking for and 

        // skip it if it got marked checked by another stone
        if(this.stones[i][x] && this.stones[i][x].goStoneColor == colorToRemove && !this.stones[i][x].checked ){

          if( !stonesToRemove.some( (stone) => {stone[0] == i && stone[1] == x }) ){
            // we didnt already mark this stone outta here
            
            // resset
            this.currentGroup = []
            let foundLiberty = false
            // if truthy, we navigated to some free stone and reported back
            foundLiberty = this.checkStone(i, x, colorToRemove)

            if(!foundLiberty){
              
              if(this.currentGroup.length > 0){
                // found stones in da gruop
                // stonesToRemove = util.unique( stonesToRemove.concat(this.currentGroup) )
                stonesToRemove = [...new Set( stonesToRemove.concat(this.currentGroup) )]
              } else {
                // remove the og stone, didnt find a group
                stonesToRemove.push([i,x])
              }
            }  
            
          }


        }

        
      }
    }


    console.log( 'it is time to remove ', stonesToRemove.length, ' stones' )
    for(var i=0; i<stonesToRemove.length; i++){
      this.removeStone(stonesToRemove[i][0],stonesToRemove[i][1])
    }
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

    if(this.addGoStoneTimer.time() > 3000){
      this.addGoStoneTimer.reset()
      
      this.playRandom(this.currentStoneColor)
      // BLACK just played, so remove WHITE
      this.computeBoard(!this.currentStoneColor)
      
      this.currentStoneColor = !this.currentStoneColor
    }

    if(this.deadStoneTimer.time() > 3000){
      this.deadStoneTimer.reset()
      this.cullDeadStones()
    }
  }
}

export { GoBoard }