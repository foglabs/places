import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Component } from "./Component.js"
import { Timer } from "./Timer.js"
import { util, scene, place } from "./main.js"

class Button extends Component {
  constructor(parent, offset, geo, color, mat, clickAction=null, dropAction=null){

    super(parent, offset, geo, color, mat, clickAction, dropAction)

    this.state = UNPUSHED
  }

  customAnimation(){
    if(this.state == PUSHING){
      this.mesh.position.set(this.mesh.position.x,this.mesh.position.y, this.mesh.position.z - 0.0001)
      if(this.mesh.position.z <= -0.9){
        this.state = PUSHED
      }
    } else if(this.state == UNPUSHING){
      this.mesh.position.set(this.mesh.position.x,this.mesh.position.y, this.mesh.position.z + 0.0001)
      if(this.mesh.position.z >= -0.89){
        this.state = UNPUSHED
      }
    }
  }

  push(){
    console.log( 'push' )
    this.state = PUSHING
  }
}

export { Button }