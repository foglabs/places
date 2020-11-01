import { Timer } from '/lib/Timer.js'

class Game {
  constructor(){
    // none

    this.cubeTimer = new Timer()
    this.cubeTimer.start()

    this.destination = [0, 1.8, -1]
  }

}

export { Game }