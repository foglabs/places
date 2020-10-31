import * as THREE from "./three.module.js"
import { Character } from "./Character.js"

class JunkPiece extends Character {
  constructor(geo, bbox, baseColor, mat=false){
    super(geo, bbox, baseColor, mat)
    this.follower = true
    this.held = false

    
  }

  setPosition(x,y,z){
    this.mesh.position.set(x,y,z)
    this.homePosition = [this.mesh.position.x,this.mesh.position.y,this.mesh.position.z]
  }
   
  customAnimation(){
    // this.mesh.rotation.x += 0.002
    // this.mesh.rotation.y += 0.003
  }

  customMovement(){
    // if( !this.arrivedAtHome() ){
    //   this.moveTowardsPoint(this.homePosition[0], this.homePosition[1], this.homePosition[2], 0.8)
    // }
  }

  arrivedAtHome(){
    return isWithin(this.mesh.position.x, this.homePosition[0], 0.001) && isWithin(this.mesh.position.y, this.homePosition[1], 0.001) && isWithin(this.mesh.position.z, this.homePosition[2], 0.001)
  }
}

export { JunkPiece }