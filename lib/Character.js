import * as THREE from "./three.module.js"
import { Timer } from "./Timer.js"
import { util, scene, place } from "./main.js"

// refactor so 'mesh' is 'model', and can take either group, or geo/mat like it is currently

class Character {
  constructor(geo, bbox, base_color, mat=null, clickAction=null, dropAction=null){
    this.accx = 0
    this.accy = 0
    this.accz = 0

    this.rotx = 0
    this.roty = 0
    this.rotz = 0

    // what to rotate towards after hitting the ground, for certified flatness
    this.hitFloor = false
    this.flatRotx = 0
    this.flatRoty = 0
    this.flatRotz = 0

    let multi = false

    let basestr = util.rgbToHex(base_color[0], base_color[1], base_color[2])
    if(!mat){
      mat = new THREE.MeshStandardMaterial( { color: basestr, transparent: true })
    } else if( Array.isArray(mat) ){
      for(var i=0; i<mat.length; i++){
        geo.faces[i].materialIndex = i
      }
      console.log( 'multi mat', geo.faces )

      multi = true
    } else {
      mat.color.setRGB(base_color[0], base_color[1], base_color[2])
    }

    this.mesh = new THREE.Mesh(geo, mat)

    this.bbox = bbox

    // this.colorfadetime = 10
    this.u = 0.0
    this.baseColor = base_color
    this.hitColor = this.hitColor || [255,0,255]
    this.color = base_color
    this.scaleFactor = 1.0

    this.dna = Math.random()

    // so far just for enemy
    this.isHit = false
    this.lastIsHit = false

    this.fading = false
    this.colorTimer = new Timer()
    this.healthTimer = new Timer()
    this.healthTimer.start()

    this.damageSounds = null
    this.damageSoundTimer = new Timer()
    // get this running because ima about to do some dmg
    this.damageSoundTimer.start()

    this.lifecycle = ALIVE

    this.spriteOpacity = 1
    this.opacityTimer = new Timer()

    this.duster = null
    this.dusterTimer = new Timer()

    this.bloodDuster = null
    this.bloodDusterTimer = new Timer()

    this.damagedBy = null

    this.dragCoefficient = 0.02

    // usually lives in Game - maybe pass in instead?
    this.maxX = 4
    this.maxY = 4
    this.maxZ = 4
    this.lightness = 0.03

    this.raycaster = new THREE.Raycaster()

    this.pushable = true
    this.grabbable = true
    this.clickable = false
    this.droppable = false
    
    this.hitTimer = new Timer()
    this.hitTimer.start()
    this.raycasterTimer = new Timer()
    this.raycasterTimer.start()

    this.currentRouteIndex = 0
    this.routePoints = []
    this.waitTimer = new Timer()
    this.waitTimer.start()
    this.action = MOVE

    if(clickAction){
      // 'this' is the scope where clickAction was created (ie MusicPlayer for playButton)
      this.clickAction = clickAction
    } else {
      this.clickAction = () => {}
    }

    if(dropAction){
      // 'this' is the scope where dropAction was created (ie MusicPlayer for playButton)
      this.droppable = true
      this.dropAction = dropAction
    } else {
      this.dropAction = () => {}
    }

    // ignored if none 
    this.components = []

    this.rotationLocked = false

    if(multi){
      console.log( 'mutlic hck', this.mesh.material )

    }
  }

  move(x, y, z){
    this.mesh.position.set( x,y,z )

    // if theres components, move em too (what the heck!)
    if(this.components.length > 0){
      this.components.forEach( (comp) => comp.move( x+comp.offset.x, y+comp.offset.y, z+comp.offset.z) )
    }
  }


  addPoint(x,y,z){
    // can use this to snap coordinates to game area edges
    // console.log( 'input ', x,y )
    x = incInRange(x, 0, game.maxX*-1, game.maxX)
    y = incInRange(y, 0, game.maxY*-1, game.maxY)
    z = incInRange(z, 0, game.maxZ*-1, game.maxZ)
    // console.log( 'output ', x,y )

    // add this pair to end of coordinate queue
    this.routePoints.push([x,y,z])
  }

  arrivedAtPoint(){
    // console.log( 'arrved?', util.isWithin(this.mesh.position.x, this.routePoints[this.currentRouteIndex][0], 0.1) && util.isWithin(this.mesh.position.y, this.routePoints[this.currentRouteIndex][1], 0.1) && util.isWithin(this.mesh.position.z, this.routePoints[this.currentRouteIndex][2], 0.1) )
    return util.isWithin(this.mesh.position.x, this.routePoints[this.currentRouteIndex][0], 0.1) && util.isWithin(this.mesh.position.y, this.routePoints[this.currentRouteIndex][1], 0.1) && util.isWithin(this.mesh.position.z, this.routePoints[this.currentRouteIndex][2], 0.1)
  }

  handleRoutePoints(){

    if(this.action == MOVE){
      // console.log( 'moving' )
      this.moveTowardsPoint( this.routePoints[this.currentRouteIndex][0], this.routePoints[this.currentRouteIndex][1], this.routePoints[this.currentRouteIndex][2], 1 )

      let arr = this.arrivedAtPoint()
      if( arr ){
        // this.routePoints.shift()

        this.action = WAIT
        // console.log( 'arrived' )
        this.waitTimer.reset()

        // if we finished the route, we finished a lap


        // if(this.laps > 3){
        //   // if we finished our laps, empty out, we get new route below on next loop
        //   this.routePoints = []
        // }
      }

    } else {
        
      if(this.waitTimer.time() > 1000){
        this.waitTimer.reset()

        this.action = MOVE
        this.currentRouteIndex += 1
        if(this.currentRouteIndex == this.routePoints.length){
          this.laps += 1
          this.currentRouteIndex = 0
        }
        
        // console.log( 'next!', this.routePoints[this.currentRouteIndex] )

      }
    }
  }

  hitChar(char){
    // console.log( 'I hit ya up', char.mesh.id )
    // how much energy should we reduce from collsion
    let frictionFactor = 0.36

    // need to grab this before we modify it
    let initCharx,initChary,initCharz
    initCharx = char.accx
    initChary = char.accy
    initCharz = char.accz

    // add adjusted accs to hit object's acc
    if(char.pushable){
      char.accx += this.accx * frictionFactor
      char.accy += this.accy * frictionFactor
      char.accz += this.accz * frictionFactor
  
      // add hit object's acc to this char
      this.accx += initCharx * frictionFactor
      this.accy += initChary * frictionFactor
      this.accz += initCharz * frictionFactor

      // knock em over
      char.addRandomRotation()

      // something happened to us, assume were not jus t sitting there
      this.hitFloor = false

    } else {
      // if we hit sometthing non pushable (floor), just stop y movement
      this.accy = 0

    }
    
    // for each object, snap resulting accs to zero if theyre all within threshhold (to prevent back-hits)
    if( util.isWithin(this.accx, 0, 0.01) && util.isWithin(this.accy, 0, 0.01) && util.isWithin(this.accz, 0, 0.01) ){
      this.accx = 0
      this.accy = 0
      this.accz = 0
    }

    if( util.isWithin(char.accx, 0, 0.01) && util.isWithin(char.accy, 0, 0.01) && util.isWithin(char.accz, 0, 0.01) ){
      char.accx = 0
      char.accy = 0
      char.accz = 0
    }
  }

  moveTowardsPoint(destx, desty, destz, speedFactor=1){
    let startx = this.mesh.position.x
    let starty = this.mesh.position.y
    let startz = this.mesh.position.z

    let xdiff = Math.abs(startx - destx)
    let ydiff = Math.abs(starty - desty)
    let zdiff = Math.abs(startz - destz)
    // shoutout to pythagoras
    // let dist = Math.sqrt(ydiff * ydiff + xdiff * xdiff)

    let speed
    // if(xdiff < 0.05 && ydiff < 0.05 && zdiff < 0.05){
    //   // 2x speed once were close.. somehow helps us get there
    //   speed = 0.06 * speedFactor
    // } else {
    //   speed = 0.04 * speedFactor

    // }
    speed = 0.04 * speedFactor

    if(startx < destx){
      this.accx += speed
    } else {
      this.accx -= speed
    }

    if(starty < desty){
      this.accy += speed
    } else {
      this.accy -= speed
    }

    if(startz < destz){
      this.accz += speed
    } else {
      this.accz -= speed
    }

    // close enough!
    let snapx,snapy,snapz
    if(util.isWithin(startx, destx, 0.01)){
      this.accx = 0
      snapx = destx
    }

    if(util.isWithin(starty, desty, 0.01)){
      this.accy = 0
      snapy = desty
    }

    if(util.isWithin(startz, destz, 0.01)){
      this.accz = 0
      snapz = destz
    }

    if(snapx || snapy || snapz){
      // fill in the ones that didnt snap
      snapx ||= this.mesh.position.x
      snapy ||= this.mesh.position.y
      snapz ||= this.mesh.position.z
      this.mesh.position.set(snapx,snapy,snapz)
    }
  }
  
  chooseDirection(){
    
    let width = window.innerWidth
    let height = window.innerHeight

    // if we're in teh final 20% closest to edge
    let x = this.mesh.position.x
    let y = this.mesh.position.y
    let z = this.mesh.position.z

    let edge = 0.6
    let awidth = Math.abs(width)
    let aheight = Math.abs(height)

    let locked

    // do a coin flip to decide which direction to check
    // if( Math.random() > 0.5 ){
    //   if( Math.abs(x) > awidth*edge ){
        
    //     // if we're within 20% of edge, just start going the other way
    //     this.direction = Math.sign(x) == 1 ? LEFT : RIGHT
    //     locked = true
    //   }
    // } else {
    //   if( Math.abs(y) > aheight*edge ){
    //     // yes, lock in direction
    //     this.direction = Math.sign(x) == 1 ? DOWN : UP
    //     locked = true
    //   }
    // }

    if(!locked){
      // if not altered above, just prandom
      this.direction = Math.round(Math.random() * 4)  
    }
  }

  remove(){
    // add sprite, then start fading it out - has to come before removing mesh to get position!
    // if(this.lifecycle == DYING){

      // if(this.corrupted){
      //   // corrupted kill
      //   this.addSprite(corruptorMaterial.clone(), 0.688)
      // } else {
      //   this.addSprite(bloodspriteMaterial.clone(), 0.388)
      // }
    // }

    // clean up on aisle akuma
    // if(this.banners){
    //   this.banners.remove()
    // }
 
    // // clean up on aisle godkiller
    // if(this.godBanners){
    //   this.godBanners.remove()
    // }

    // // clean that blood up
    // if(this.bloodDuster){
    //   this.bloodDuster.remove()
    // }

    // // if we're doing some extra-casino kiling
    // if(game.casino && game.casino.highlights[this.id]){
    //   game.casino.removeHighlight(this.id)
    // }

    this.mesh.geometry.dispose()
    this.removeMaterial()
    scene.remove(this.mesh)
  }

  removeMaterial(){
    if( Array.isArray( this.mesh.material ) ){
      this.mesh.material.forEach( (mat) => { mat.dispose() } )
    } else {
      this.mesh.material.dispose()
    }
  }

  removeNow(){
    this.remove()
    this.removeSprite()
  }

  addSprite(mat, scale, moves=false, opacity=false){
    this.deadSprite = new THREE.Sprite( mat )

    // center rotation anchor
    this.deadSprite.center.set( 0.5, 0.5 )
    this.deadSprite.scale.set( scale, scale, scale )
    // random radian baby
    this.deadSprite.material.rotation = Math.random() * 2 * Math.PI
    this.deadSprite.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)

    if(moves){
      // udpate in animation
      this.deadSpriteMoves = true
    }

    if(opacity){
      this.deadSprite.material.opacity = opacity
    }

    scene.add(this.deadSprite)
  }

  removeSprite(){
    if(this.deadSprite){
      this.deadSprite.material.dispose()
      scene.remove(this.deadSprite)
    }
  }

  red(){
    this.color[0]
  }
  
  green(){
    this.color[1]
  }

  blue(){
    this.color[2]
  }
  
  setColor(r,g,b){
    // this.mesh.material.color.setRGB(r,g,b)
    let hex = util.rgbToHex(r,g,b)
    if( Array.isArray( this.mesh.material ) ){
      this.mesh.material.color.forEach( (mat) => { mat.set( hex ) } )
    } else {
      this.mesh.material.color.set( hex )
    }
  }

  calcMovement(lightness, acc) {
    // higher means faster
    return lightness * acc;
  }

  // use this instead of inc in range, because we dont actually want to constrain between range of values, we jus twant to move towards 0
  slowDown(acc){
    if(acc > 0){
      // whichever way we're currently moving, accelerate towards the opposite direction
      acc -= this.dragCoefficient
      if(acc < 0) {acc = 0}
    } else if(acc < 0){
      acc += this.dragCoefficient
      if(acc > 0) {acc = 0}
    }

    return acc
  }

  handleBombs(){
    let damageVal = 20

    if(this.isPlayer){
      // less damage for player
      damageVal = 5
    }

    let bomb
    for(var i=0; i<game.bombs.length; i++){
      bomb = game.bombs[i]

      // handle round-end player bomb situation
      if( bomb && bomb.exploded && this.healthTimer.time() > 100 && this.handleHit(bomb) && (!this.isPlayer || bomb.hurtsPlayer) ){
        this.healthTimer.reset()
        this.takeDamage( damageVal, BOMB )
      }
    }
  }


  // this gets redefined in subclasses to contain other every-loop movement logic specific to the class
  customMovement(){}
  customAnimation(){}

  handleClick(arg){
    this.clicked = true
    let result = this.clickAction(arg)
    // byu default, no result
    return result
  }

  handleDrop(droppedChar){
    let result = this.dropAction(droppedChar)
    this.dropped = true
    return result
  }

  arrivedAtRotation(){
    return this.mesh.rotation.x == this.rotx && this.mesh.rotation.y == this.roty && this.mesh.rotation.z == this.rotz
  }

  addRandomRotation(){
    if( Math.abs(this.accx) > 0 ){
      this.rotx = Math.random() * util.radian( 30 ) - util.radian( 15 )
    }
    if( Math.abs(this.accy) > 0 ){
      this.roty = Math.random() * util.radian( 30 ) - util.radian( 15 )
    }
    if( Math.abs(this.accz) > 0 ){
      this.rotz = Math.random() * util.radian( 30 ) - util.radian( 15 )
    }        
  }

  handleRotation(){

    // close enough!
    let setx,sety,setz
    // let rad360 = 6.28319
    // let reducex = this.mesh.rotation.x % rad360
    // let reducey = this.mesh.rotation.y % rad360
    // let reducez = this.mesh.rotation.z % rad360


    let x,y,z
    x = this.mesh.rotation.x
    y = this.mesh.rotation.y
    z = this.mesh.rotation.z

    // rotate smoothly towards some rotation we've hcosen elsewhere
    if(!setx){

      let amtx = Math.random() * 0.08
      setx = util.rotateToward(x, this.rotx, amtx)
    }    
    if(!sety){

      let amty = Math.random() * 0.08
      sety = util.rotateToward(y, this.roty, amty)
    }
    if(!setz){

      let amtz = Math.random() * 0.08
      setz = util.rotateToward(z, this.rotz, amtz)
    }

    // tfw fuck
    if(util.isWithin(x, this.rotx, 0.06)){
      setx = this.rotx
    }
    if(util.isWithin(y, this.roty, 0.06)){
      sety = this.roty
    }
    if(util.isWithin(z, this.rotz, 0.06)){
      setz = this.rotz
    }
    this.mesh.rotation.x = setx
    this.mesh.rotation.y = sety
    this.mesh.rotation.z = setz
  }


  // this is momentum for anything that moves
  handleMovement(){
    // decide accelaration
    this.customMovement()

    if(this.routePoints.length > 0){
      this.handleRoutePoints()
    }

    let posx = this.mesh.position.x + this.calcMovement(this.lightness, this.accx)
    let posy = this.mesh.position.y + this.calcMovement(this.lightness, this.accy)
    let posz = this.mesh.position.z + this.calcMovement(this.lightness, this.accz)

    if(Math.abs(posx) >= this.maxX){
      // stop it if it hits the edge
      this.accx = 0
      posx = Math.sign(posx) * this.maxX
    }

    if(Math.abs(posy) >= this.maxY){
      // stop it if it hits the edge
      this.accy = 0
      posy = Math.sign(posy) * this.maxY
    }

    if(Math.abs(posz) >= this.maxZ){
      // stop it if it hits the edge
      this.accz = 0
      posy = Math.sign(posy) * this.maxZ
    }

    this.mesh.position.x = posx
    this.mesh.position.y = posy
    this.mesh.position.z = posz

    // this will be for sprites attached to living moving things
    // this.sprite.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)

    // whoa there
    this.accx = this.slowDown(this.accx)
    this.accy = this.slowDown(this.accy)
    this.accz = this.slowDown(this.accz)

    if(this.pushable){
      this.gravity()
    }

    if(!this.rotationLocked && !this.arrivedAtRotation()){
      // rotate towards rotx rot y
      this.handleRotation()
    }

  }

  gravity(){
    // if(this.mesh.position.y > FLOOR){
    // if(!this.bbox.intersectsBox( place.floor.bbox )){
    let gravAcc = 0.05

    if(!place.isTouchingFloor(this)){
      // pull down if were not touching a floor object yet
      this.accy = this.accy - gravAcc
    } else {

      if(!this.hitFloor){
        // reset rotation so we get flat on ground
        this.flatten() 
      }

      // stop falling
      this.hitFloor = true
      this.accy = 0

    }
    
  }

  flatten(){
    // handleRotation will subseq rotate us back to flat
    this.rotx = this.flatRotx
    this.roty = this.flatRoty
    this.rotz = this.flatRotz
  }

  // flatNow(){
  //   // snap to flat right goddamn now fuckface
  //   this.flatten()
  //   this.mesh.rotation.x = this.flatRotx
  //   this.mesh.rotation.y = this.flatRoty
  //   this.mesh.rotation.z = this.flatRotz
  //   this.flatTimer.stop()
  // }

  handleCollision(){
    // if timer is ready and char is moving, check for collisions with other chars
    if( this.accx != 0 || this.accy != 0 || this.accz != 0){
      this.hitTimer.reset()

        // point raycaster in direction were moving (acc vector)
      let dir = new THREE.Vector3( this.accx, this.accy, this.accz ).normalize()

      if(this.raycasterTimer.time() > 160){
        this.raycasterTimer.reset()
        this.raycaster.set(this.mesh.position, dir)

        // get all objects pointing ray intersects with
        let intersects = this.raycaster.intersectObjects( scene.children )
        let otherChar

        for(var i=0; i<intersects.length; i++){

          // look for a char from the intsersect
          otherChar = place.characters[ intersects[i].object.id ]
          if(otherChar){

            // are we actually touching boxes wittem
            if(this.handleHit(otherChar)){
              console.log( 'I slapped that shape..', this.mesh.id, otherChar.mesh.id )
              if(otherChar.pushable){
                // slap em if ya hit em
                this.hitChar(otherChar)
              }
              
            }
            
          }
        }
      }
    }
  }

  // right now this only happens to enemies
  handleHit(other_char){
    // record last hitstate
    this.lastIsHit = this.isHit

    // make sure there is something to intersect right now
    if(other_char.bbox && this.bbox.intersectsBox(other_char.bbox)){

      // hittin it
      this.isHit = true

      // if(!this.corrupted){
      //   this.health -= 1
      // }

    } else {

      this.isHit = false
    }

    return this.isHit
  }

  dmgSpriteMap(){
    return this.isPlayer ? pbloodspriteMap : bloodspriteMap
  }

  addParticles(map, blood=false){
    // little blod splats
    if(blood){
      this.bloodDuster = new Duster(map, 0.0422, 28, 0.32, this.mesh.position, 1)
    } else {
      this.duster = new Duster(map, 0.0422, 28, 0.32, this.mesh.position, 1)
    }
  }

  addBanners(map, size, num, dist, badge=false, opacity=1){
    // ignores distance and num if badge == true
    this.banners = new Duster(map, size, num, dist, this.mesh.position, opacity, badge)
  }

  addGodBanners(map, size, dist, opacity=1){
    // ignores distance and num if badge == true
    this.godBanners = new Duster(map, size, 1, dist, this.mesh.position, opacity, true)
  }

  changeHealth(healthChange){
    // this is for healing, dont want to use v similar takeDamage because it makes sounds
    this.health = incInRange( this.health, healthChange, 0, 100 )
  }

  killSound(){}

  // you already know
  takeDamageSound(){}

  takeDamage(dmg, damageSource){
    this.takeDamageSound()

    // record the last thing we were damaged byd
    this.damagedBy = damageSource

    // this.health -= dmg
    this.health = incInRange( this.health, -1*dmg, 0, 1000 ) 

    if(!this.bloodDuster){
      this.addParticles( this.dmgSpriteMap(), true )
      this.bloodDusterTimer.start()
    }
  }

  // lineToTarget(target){
  //   var targetPosition = new THREE.Vector3(x,y,z);
  //   var objectToMove;
  //   var group = new THREE.Group();
  //   group.add(objectToMove);
  //   var targetNormalizedVector = new THREE.Vector3(0,0,0);
  //   targetNormalizedVector.x = targetPosition.x - group.position.x;
  //   targetNormalizedVector.y = targetPosition.y - group.position.y;
  //   targetNormalizedVector.z = targetPosition.z - group.position.z;
  //   targetNormalizedVector.normalize()
  // }

  colorCycle(){

    if(this.isHit){
      this.fading = true
    }

    if(this.fading){

      if(!this.colorTimer.running){
        this.colorTimer.start()
      }

      let tocolor
      let fromcolor
      if(this.isHit){
        tocolor = this.hitColor
        fromcolor = this.baseColor
      } else {
        tocolor = this.baseColor
        fromcolor = this.hitColor
      }

      if(this.colorTimer.time() > 2){
        this.colorTimer.reset()

        var steps = 50
        var step_u = 1.0 / steps

        let to_r = tocolor[0]
        let to_g = tocolor[1]
        let to_b = tocolor[2]

        let from_r = fromcolor[0]
        let from_g = fromcolor[1]
        let from_b = fromcolor[2]

        let r = Math.round(lerp(from_r, to_r, this.u))
        let g = Math.round(lerp(from_g, to_g, this.u))
        let b = Math.round(lerp(from_b, to_b, this.u))

        this.u += step_u
        if(this.u >= 1.0){
          // done with this fade
          this.u = 0.0
          this.fading = false
        }

        // record this so we can compare above
        this.color = [r,g,b]
        // this.mesh.material.color.setRGB(r,g,b)
        this.setColor(r,g,b)
      }
    }

    if(this.color == this.baseColor || this.color == this.hitColor){
      this.fading = false
    }

  }

  animation(){
      // override dis in your subclass to do extra stuff in addition to the reggies here
    this.customAnimation()

    // set bounding box from mesh baby
    this.bbox.setFromObject(this.mesh)

    // this.colorCycle()

    // if(this.deadSprite && this.deadSpriteMoves){
    //   this.deadSprite.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
    // }

    // if(this.banners){
    //   this.banners.animation()
    // }

    // if(this.godBanners){
    //   this.godBanners.animation()
    // }

    // if(this.duster){
    //   // run dis
    //   this.duster.animation()
    //   if(this.dusterTimer.time() > 20){
    //     this.dusterTimer.reset()

    //      this.duster.particleSystem.material.opacity -= 0.1
    //     if(this.duster.particleSystem.material.opacity <= 0){

    //       this.duster.remove()
    //       this.duster = null
    //     }
    //   }
    // }

    // if(this.bloodDuster){
    //   // run dis
    //   this.bloodDuster.animation()
    //   if(this.bloodDusterTimer.time() > 20){
    //     this.bloodDusterTimer.reset()

    //      this.bloodDuster.particleSystem.material.opacity -= 0.1
    //     if(this.bloodDuster.particleSystem.material.opacity <= 0){

    //       this.bloodDuster.remove()
    //       this.bloodDuster = null
    //     }
    //   }
    // }
    
  }
}

export { Character }
