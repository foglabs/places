import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { scene } from "./main.js"

class Place {
  // encapsulates background color/image control, scenery objects, and floor object
  constructor(backgroundHex, characters, floor){
    this.backgroundHex = backgroundHex
    this.characters = characters
    this.floor = floor
  }

  handlePlace(){

  }
}

export { Place }