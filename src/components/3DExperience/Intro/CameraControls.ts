import * as THREE from 'three'
import gsap from 'gsap'

export const camPosInDefault = new THREE.Vector3(0, 0, 15)
export const camPosDefault = new THREE.Vector3(0, 0, 10)

export const camAnimIntro = (camera: THREE.Camera, onComplete: () => void) => {
  const DURATION = 2
  const EASE = "easeInOut"
  const timeline = gsap.timeline()

  timeline.fromTo(
    camera.position, { 
      x: camPosInDefault.x, y: camPosInDefault.y, z: camPosInDefault.z
    }, {
      duration: DURATION,
      ease: EASE,
      x: camPosDefault.x,
      y: camPosDefault.y,
      z: camPosDefault.z,
    }
  )

  timeline.play()
    .then(() => onComplete())
}