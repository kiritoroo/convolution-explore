import * as THREE from 'three'
import gsap from 'gsap'

export const camPosInDefault = new THREE.Vector3(26, 25, 30)
export const camPosDefault = new THREE.Vector3(10, 10, 10)
let timeline: any = null

export const camAnimIntro = (camera: THREE.Camera, onComplete: () => void) => {
  const DURATION = 1.5
  const EASE = "ease"

  timeline ? (timeline as gsap.core.Timeline).clear() : null
  timeline ? (timeline as gsap.core.Timeline).kill() : null
  
  timeline = gsap.timeline()

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

export const camAnimSelectKernel = (camera: THREE.Camera, kernelSize: number, onComplete: () => void) => {
  const initPos = new THREE.Vector3(25, 55, 22)
  const desPos =new THREE.Vector3(5+kernelSize, 12+kernelSize, 6+kernelSize)
  const desPos2 =new THREE.Vector3(15+kernelSize, 15+kernelSize, 15+kernelSize)

  const DURATION = 1.5
  const EASE = "power4"

  timeline ? (timeline as gsap.core.Timeline).clear() : null
  timeline ? (timeline as gsap.core.Timeline).kill() : null

  timeline = gsap.timeline()
  timeline.fromTo(
    camera.position, { 
      x: initPos.x, y: initPos.y, z: initPos.z
    }, {
      duration: DURATION,
      ease: EASE,
      x: desPos.x, y: desPos.y, z: desPos.z
    }
  ).to(
    camera.position, {
      duration: 2.5,
      ease: EASE,
      x: desPos2.x, y: desPos2.y, z: desPos2.z
    }, 1.5
  )

  timeline.play()
    .then(() => onComplete())
}

export const camAnimFocusKernelIn =  (camera: THREE.Camera, kernelSize: number, onComplete: () => void) => {
  const desPos = new THREE.Vector3(kernelSize*2, kernelSize*2, kernelSize*2)

  const DURATION = 1
  const EASE = "power4"

  timeline ? (timeline as gsap.core.Timeline).clear() : null
  timeline ? (timeline as gsap.core.Timeline).kill() : null

  timeline = gsap.timeline()
  timeline.to(camera.position, {
    duration: DURATION,
    ease: EASE,
    x: desPos.x,
    y: desPos.y,
    z: desPos.z,
  })

  timeline.play()
    .then(() => onComplete())
}

export const camAnimFocusKernelOut = (camera: THREE.Camera, kernelSize: number, onComplete: () => void) => {
  const desPos =new THREE.Vector3(15+kernelSize, 15+kernelSize, 15+kernelSize)

  const DURATION = 1.5  
  const EASE = "power4"

  timeline ? (timeline as gsap.core.Timeline).clear() : null
  timeline ? (timeline as gsap.core.Timeline).kill() : null

  timeline = gsap.timeline()
  timeline.to(camera.position, {
    duration: DURATION,
    ease: EASE,
    x: desPos.x,
    y: desPos.y,
    z: desPos.z,
  })

  timeline.play()
    .then(() => onComplete())
}