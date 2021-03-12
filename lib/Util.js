class Util {

  unique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
  }

  radian(deg){
    return Math.PI/180*deg
  }

  // DEG1 = this
  // DEG45 = this
  // DEG90 = this
  // DEG135 = this
  // DEG180 = this
  // DEG225 = this
  // DEG270 = this
  // DEG315 = 5.49779
  // DEG360 = 6.28319

  randomSign(){
    return Math.random() > 0.5 ? 1 : -1
  }

  randomInRange(min,max){
    return Math.random() * (max-min) + min
  }

  randomPointAway(amt, away){
    let x,y,z

    // at least away away, random within amt range
    x = this.randomInRange(-1*amt, amt) + this.awayFromOrigin(x,away)
    y = this.randomInRange(-1*amt, amt) + this.awayFromOrigin(y,away)
    z = this.randomInRange(-1*amt, amt) + this.awayFromOrigin(z,away)
    return [x,y,z]
  }

  awayFromOrigin(pt,dist){
    return Math.sign(pt) == 1 ? dist : -dist
  }

  randomRGB(max){
    return [Math.floor(Math.random()*max), Math.floor(Math.random()*max), Math.floor(Math.random()*max)]
  }

  randomHex(max){
    let rgb = this.randomRGB(max)
    return this.rgbToHex(rgb[0],rgb[1],rgb[2])
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

  incTowards(val, dest, inc){
    // inc must be positive
    if(val < dest){
      // inc is already pos
      // going up, dest is max
      return this.incInRange(val, inc, val, dest)
    } else if(val > dest) {
      // going down, dest is minimum
      return this.incInRange(val, -1*inc, dest, val)
    }
  }

  rotateInc(inc, currentRotation){
    // use radians because js stands for jradianscript
    let result = currentRotation + inc
    if(result >= DEG360){
      result = result - DEG360
    } else if(result < 0.0){
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

  nearestMultiple(val, multiple){
    // if remainder is more than half multi, need to round up
    if(val % multiple > (multiple/2)){
      console.log( 'round up', Math.floor(val/multiple) + 1 )
      return multiple * ( Math.floor(val/multiple) + 1 )
    } else {
      console.log( 'round down', Math.floor(val/multiple) )
      return multiple * Math.floor(val/multiple)
    }
  }

  isWithin(val, test, precision){
    // I dont give two fucks!
    precision = Math.abs(precision)
    return val < test+precision && val > test-precision
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