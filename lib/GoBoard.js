import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
// import { Sound } from "./Sound.js"
import { Timer } from "./Timer.js"
import { GoStone } from "./GoStone.js"
import { util, textureLoader, scene, place } from "./main.js"

class GoBoard extends Character {
  constructor(map, bump){
    super(new THREE.BoxGeometry( 0.2700000000000002,0.008,0.3000000000000002 ), new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()), [50,50,50], new THREE.MeshPhysicalMaterial( { map: map, bumpMap: bump, bumpScale: 0.002, transparent: true }))

    this.boardLength = 9
    
    this.stones = this.initStones()

    this.deadStones = {}

    this.testRow = 0
    this.testColumn = 0
    
    this.addGoStoneTimer = new Timer()
    this.addGoStoneTimer.start()
    this.currentStoneColor = BLACK
    this.deadStoneTimer = new Timer()
    this.deadStoneTimer.start()

    this.currentGroup = {}
  }

  isInBoard(row,column){
    return row >= 0 && row < this.boardLength && column >= 0 && column < this.boardLength
  }

  checkStone(stoneKey, searchColor){
    let coor = this.makeStoneCoor(stoneKey)
    let row = coor[0]
    let column = coor[1]

    if( this.isInBoard(row,column) ){
      // its legit location

      if( this.stones[stoneKey] ){
        // theres a stone there

        if(!this.stones[stoneKey].checked){
          
          // its unchecked, we have to check it

          // only check this stone once
          this.stones[stoneKey].checked = true

          if(this.stones[stoneKey].goStoneColor == searchColor ){
            // and its *our* stone

            // wow so nice
            let foundInCurrentGroup = this.currentGroup[ stoneKey ]

            if( !foundInCurrentGroup ){
              // havent grouped this stone before

              // so add it to the gorup now
              this.currentGroup[stoneKey] = true
        
              // these will recursively collect all the other ones v

              // need to pull this out so we DO check all 4 dirs
              let result = false

              // check
              // left
              if( this.checkStone( this.makeStoneKey(row, column-1) , searchColor) ){
                result = true
              }

              // up
              if( this.checkStone( this.makeStoneKey(row+1, column), searchColor) ){
                result = true
              }

              // right
              if( this.checkStone( this.makeStoneKey(row, column+1) , searchColor) ){
                result = true
              }

              // down
              if( this.checkStone( this.makeStoneKey(row-1, column) , searchColor) ){
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
    let stones = {}
    for(var i=0; i<this.boardLength; i++){
      for(var x=0; x<this.boardLength; x++){
        stones[ this.makeStoneKey(i,x) ] = false
      }
    }
    return stones
  }

  availableSpots(){
    let sK = util.k(this.stones)
    let thisStoneKey
    let spots = {}
    for(var i=0; i<sK.length; i++){
      thisStoneKey = sK[i]
      if( !this.stones[ thisStoneKey ] ){
        spots[ thisStoneKey ] = true
      }
    }

    return spots
  }

  playStone(stoneKey, color){
    let coor = this.makeStoneCoor(stoneKey)

    let stone = new GoStone(color)
    scene.add(stone.mesh)
    place.characters[stone.mesh.id] = stone

    // put at grid spot using row and column
    let sp = this.stonePosition(coor[0], coor[1])
    stone.mesh.position.set( sp.x,sp.y,sp.z )
    this.stones[stoneKey] = stone
    // console.log( 'play rnadom', row, column, color )
  }

  makeStoneKey(row, column){
    return row + "," + column
  }

  makeStoneCoor(key){
    let piece = key.split(",")
    return [parseInt(piece[0]), parseInt(piece[1])]
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
    let spot = util.shuffle( util.k( this.availableSpots() ) )[0]
    if(spot){
      this.playStone(spot, color)
    }

  }

  uncheckAll(){
    let sK = util.k(this.stones)
    for(var i=0; i<sK.length; i++){
      if(this.stones[ sK[i] ]){
        this.stones[ sK[i] ].checked = false
      }
    }

  }

  computeBoard(colorToRemove){
    this.uncheckAll()

    let stonesToRemove = {}

    let sK = util.k(this.stones)
    for(var i=0; i<sK.length; i++){
      let thisStoneKey = sK[i]
      
      if(this.stones[thisStoneKey] && this.stones[thisStoneKey].goStoneColor == colorToRemove && !this.stones[thisStoneKey].checked ){

        // stone to remove is now hash of stoneKeys
        if( !stonesToRemove[thisStoneKey] ){
          
          // resset
          this.currentGroup = {}
          let foundLiberty = false
          // if truthy, we navigated to some free stone and reported back
          foundLiberty = this.checkStone(thisStoneKey, colorToRemove)

          if(!foundLiberty){
            
            if(util.k(this.currentGroup).length > 0){
              // found stones in da gruop
              stonesToRemove = {...stonesToRemove, ...this.currentGroup}
              // console.log( 'multi option', stonesToRemove )

            } else {
              // remove the og stone, didnt find a group
              // console.log( 'single option' )
              stonesToRemove[ thisStoneKey ] = true
            }
          }  
        }
      }
    }


    let stoneKey
    let srK = util.k(stonesToRemove)
    // console.log( 'it is time to remove ', srK.length, ' stones' )
    for(var i=0; i<srK.length; i++){
      stoneKey = srK[i]
      this.removeStone(stoneKey)
    }
  }

  removeStone(stoneKey){
    let stone = this.stones[stoneKey]
    this.deadStones[stone.mesh.id] = stone
    this.stones[stoneKey] = null
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