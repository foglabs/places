class Util {

  randomSign(){
    return Math.random() > 0.5 ? 1 : -1
  }

  //utility functions
  k(obj){
    return Object.keys(obj)
  }

  lerp(a, b, u) {
    // start val, dest val, interval
    return (1 - u) * a + u * b;
  }

  rgbToHex(r,g,b){
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
  }

  componentToHex(c) {
    c = c < 255 ? c : 255 
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }

  incInRange(val, inc, min, max){
    return Math.min( Math.max( val+inc, min ), max )
  }

  rotateInc(inc, currentRotation){
    // use radians because js stands for jradianscript
    let result = currentRotation + inc
    if(result >= DEG360){
      result = result - DEG360
    } else if(result < 0){
      result = result + DEG360
    }

    return result
  }

  rotateToward(current, destination, amount){
    if(current == destination){
      // dont do shit if its already BEEN rotated
      return current
    }

    let sign
    if(current > destination){
      sign = (current - DEG360 - destination) > (current - destination) ? 1 : -1
    } else {
      sign = (destination - current) > (destination - DEG360 - current) ? 1 : -1
    }

    return this.rotateInc(sign*amount, current)
  }

  isWithin(val, test, precision){
    // I dont give two fucks!
    precision = Math.abs(precision)
    return val < test+precision && val > test-precision
  }

  radian(deg){
    return Math.PI/180*deg
  }

  shuffle(arra1) {
    let ctr = arra1.length
    let temp
    let index

      // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr)
      // Decrease ctr by 1
      ctr--
      // And swap the last element with it
      temp = arra1[ctr]
      arra1[ctr] = arra1[index]
      arra1[index] = temp
    }
    return arra1
  }
}
export { Util }