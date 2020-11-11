import * as THREE from "./three.module.js"
import { Character } from "./Character.js"
import { Sound } from "./Sound.js"
import { util, textureLoader, scene } from "./main.js"

class MusicPlayer extends Character {
  constructor(urls){

    let geo, bbox, mat
    geo = new THREE.BoxGeometry( 0.2, 0.6, 0.2 )
    bbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    mat = new THREE.MeshPhysicalMaterial( { color: "#FFFFFF" })
    super(geo, bbox, [255,255,255], mat)

    this.currentTrack = 0
    this.urls = urls
    this.tracks = []

    let url
    for(var i=0; i<urls.length; i++){
      url = urls[i]

      // wait to actually load cause its too much up front
      this.tracks.push( new Sound("track"+i, urls[i], 0.5, false, false, false) )
    }

    // juz do
    console.log( 'play once' )
    let playgeo = new THREE.BoxGeometry( 0.2, 0.6, 0.2 )
    let playbbox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    let playmat = new THREE.MeshPhysicalMaterial( { color: "#FFFFFF" })
    this.playButton = new THREE.Mesh(playgeo, playmat)
    this.mesh.position.set(-0.4,1.5,-0.7499999999999999)
    scene.add(this.playButton)
  }

  playSong(songIndex){
    if( this.tracks[this.currentTrack].playing() && this.currentTrack != songIndex && this.tracks[songIndex] ){
      this.tracks[this.currentTrack].stop()
    }

    this.currentTrack = songIndex
    if( this.tracks[this.currentTrack].loaded ){
  
      this.tracks[this.currentTrack].play()
    } else {
      this.tracks[this.currentTrack].autoPlay = true
      this.tracks[this.currentTrack].load()
    }

    // now load the next one 
    let nextTrack = this.currentTrack+1
    if(this.tracks[nextTrack] && !this.tracks[nextTrack].loaded){
      this.tracks[nextTrack].load()
    }
  }

  nextTrack(){
    this.incTrack(1)
  }
  
  prevTrack(){
    this.incTrack(-1)
  }

  incTrack(inc){
    // inc looping around
    this.currentTrack = util.incInRange(this.currentTrack, inc, 0, this.tracks.length-1)
    this.playSong(this.currentTrack)
  }
}

export { MusicPlayer }