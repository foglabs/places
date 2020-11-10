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

    // too much overhead to load all up front
    let url
    for(var i=0; i<urls.length; i++){
      url = urls[i]
      this.tracks.push( new Sound("track"+i, urls[i], 1, false, false, false) )
    }

    // juz do
    console.log( 'play once' )
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
}

export { MusicPlayer }