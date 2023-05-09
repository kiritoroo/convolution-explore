import React, { useRef, useCallback, useEffect, useTransition, useState, useMemo } from 'react';
import * as THREE from 'three';
import { VisualInput } from "./VisualInput"
import { VisualKernel } from "./VisualKernel"
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedImageInputSelector, selectedImageOutputSelector, selectedKernelSelector } from '@store/selectors';
import { colorModeState, interactiveModeState, isPaddingModeState, isPlayAnimConvolutionState, isResetAnimConvolutionState, isSnapKernelState, selectedAnimSpeedState } from '@store/atoms';
import { TColor } from '@type/index';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { camPosDefault } from './CameraControls';
import { VisualOutput } from './VisualOutput';

interface Props {

}

interface VisualKernelRefs {
  group: React.RefObject<THREE.Group>
}

interface  VisualOutputRefs {
  instancesMesh: React.RefObject<THREE.InstancedMesh>
  clearColor: () => void
}

export const VisualControls = (props: Props) => {
  const kernel = useRecoilValue(selectedKernelSelector);  
  const imageIn = useRecoilValue(selectedImageInputSelector);
  const imageOut = useRecoilValue(selectedImageOutputSelector);
  const colorMode = useRecoilValue(colorModeState);
  const isPadding = useRecoilValue(isPaddingModeState);
  const interactiveMode = useRecoilValue(interactiveModeState);
  const [isPending, startTransition] = useTransition();
  const [isSnap, setIsSnap] = useRecoilState(isSnapKernelState)
  const [isPlayAnimConvoluton, setIsPlayAnimConvolution] = useRecoilState(isPlayAnimConvolutionState);
  const [isResetAnimConvoluton, setIsResetAnimConvolution] = useRecoilState(isResetAnimConvolutionState);
  const selectedAnimSpeed = useRecoilValue(selectedAnimSpeedState);

  const timeoutIds = useRef<any[]>([]);
  const animSpeed = useMemo<number>(() => (
    selectedAnimSpeed?.speed ?? 20
  ), [selectedAnimSpeed]);

  const visualKernelRef = useRef<VisualKernelRefs>(null);
  const visualOutputRef = useRef<VisualOutputRefs>(null);

  const windowSliceInRect = useRef<SVGRectElement[]>([]);
  const windowSliceOutRect = useRef<SVGRectElement>();
  const windowSliceInColorRed = useRef<number[]>([]);
  const windowSliceInColorGreen = useRef<number[]>([]);
  const windowSliceInColorBlue = useRef<number[]>([]);
  const windowSliceInRGB = useRef<TColor[]>([]);
  const windowSliceInGray = useRef<number[]>([]);
  const windowSliceOutColorRed = useRef<number>();
  const windowSliceOutColorGreen = useRef<number>();
  const windowSliceOutColorBlue = useRef<number>();
  const windowSliceOutRGB = useRef<TColor>();
  const windowSliceOutGray = useRef<number>();

  const clearAnimConvolution = useCallback(() => {
    timeoutIds.current.forEach((id) => clearTimeout(id))
  }, [timeoutIds.current])

  const handleRefresh = useCallback(() => {
    if (visualOutputRef.current && kernel.data && imageIn.data) {  
      visualOutputRef.current?.clearColor();
      (visualOutputRef.current?.instancesMesh.current?.material as THREE.MeshBasicMaterial).opacity = 0.05;
      setIsPlayAnimConvolution(false)
      clearAnimConvolution()
      startTransition(() => {
        setWindowInSlice(0, 0);
        setWindowOutSlice(0, 0);
        setProcess();
      })

      gsap.to(visualKernelRef.current!.group.current!.position, {
        duration: 0.2,
        x: 0,
        y: 0,
        z: visualKernelRef.current!.group.current!.position.z,
        ease: 'power'
      })
    }
  }, [visualKernelRef.current, kernel.data, imageIn.data])

  const { camera } = useThree();

  const setWindowInSlice = useCallback((x: number, y: number) => {
    windowSliceInRect.current = [];
    windowSliceInColorRed.current = [];
    windowSliceInColorGreen.current = [];
    windowSliceInColorBlue.current = [];
    windowSliceInRGB.current = [];
    windowSliceInGray.current = [];

    for (let ky=0; ky < kernel.data!.size; ky++) {
      for (let kx=0; kx < kernel.data!.size; kx++) {
        const indexIn1d = ((y+ky) * imageIn.w + (x+kx));
        windowSliceInColorRed.current.push(imageIn.cRed1d[indexIn1d]);
        windowSliceInColorGreen.current.push(imageIn.cGreen1d[indexIn1d]);
        windowSliceInColorBlue.current.push(imageIn.cBlue1d[indexIn1d]);
        windowSliceInRGB.current.push(imageIn.rgb1d[indexIn1d]);
        windowSliceInGray.current.push(imageIn.gray1d[indexIn1d]);
      }
    }

  }, [kernel.data, imageIn])

  const setWindowOutSlice = useCallback((x: number, y: number) => {
    windowSliceOutRect.current = undefined;
    windowSliceOutColorRed.current = undefined;
    windowSliceOutColorGreen.current = undefined;
    windowSliceOutColorBlue.current = undefined;
    windowSliceOutRGB.current = undefined;
    windowSliceOutGray.current = undefined;

    let indexOut2D
    if (isPadding) {
      indexOut2D = { x: x, y: y }
    } else {
      indexOut2D = { x: x + Math.floor(kernel.data!.size/2), y: y + Math.floor(kernel.data!.size/2) }
    }

    const indexOut1d = indexOut2D.y * imageOut.w + indexOut2D.x

    windowSliceOutColorRed.current = imageOut.rgb1dOut[indexOut1d].r;
    windowSliceOutColorGreen.current = imageOut.rgb1dOut[indexOut1d].g;
    windowSliceOutColorBlue.current = imageOut.rgb1dOut[indexOut1d].b;
    windowSliceOutRGB.current = imageOut.rgb1dOut[indexOut1d];
    windowSliceOutGray.current = imageOut.gray1dOut[indexOut1d];

    const color = new THREE.Color();
    colorMode === 'rgb'
      ? color.setRGB(
          windowSliceOutRGB.current.r/255,
          windowSliceOutRGB.current.g/255,
          windowSliceOutRGB.current.b/255)
      : color.setRGB(
        windowSliceOutGray.current/255,
        windowSliceOutGray.current/255,
        windowSliceOutGray.current/255);

    (visualOutputRef.current?.instancesMesh.current as THREE.InstancedMesh).setColorAt(indexOut1d, color);
    (visualOutputRef.current?.instancesMesh.current as THREE.InstancedMesh).instanceColor!.needsUpdate = true
  }, [kernel.data, imageOut, isPadding, colorMode])

  const setProcess = useCallback(() => {

  }, [colorMode])

  const handleRaycaster = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (interactiveMode != 'freedom' || isSnap) return

    event.stopPropagation();
    const index1d = event.instanceId;
    let indexX = index1d! % imageIn.w
    let indexY = Math.floor(index1d! / imageIn.w)

    if (indexX < imageIn.w-kernel.data!.size+1 && indexY < imageIn.h-kernel.data!.size+1) {
      indexX = index1d! % imageIn.w
      indexY = indexY = Math.floor(index1d! / imageIn.w)
    } else {
      if (indexX >= imageIn.w-kernel.data!.size+1) {
        indexX = imageIn.w-kernel.data!.size
      }
      if (indexY >= imageIn.h-kernel.data!.size+1) {
        indexY = imageIn.h-kernel.data!.size
      }
    }

    startTransition(() => {
      setWindowInSlice(Math.round(indexX), Math.round(indexY));
      setWindowOutSlice(Math.round(indexX), Math.round(indexY));
      setProcess();
    })

    gsap.to(visualKernelRef.current!.group.current!.position, {
      duration: 0.2,
      x: +indexX,
      y: -indexY,
      z: visualKernelRef.current!.group.current!.position.z,
      ease: 'power'
    })
  }, [imageIn, imageOut, kernel.data, colorMode, visualKernelRef.current, interactiveMode, isSnap])

  const handleAnimConvolution = useCallback(() => {
    if (visualOutputRef.current) {
      (visualOutputRef.current?.instancesMesh.current?.material as THREE.MeshBasicMaterial).opacity = 1;
      for (let y = 0; y < imageIn.h - (kernel.data!.size - 1); y++) {
        for (let x = 0; x < imageIn.w - (kernel.data!.size - 1); x++) {
          timeoutIds.current.push(setTimeout(() => {
            startTransition(() => {
              setWindowInSlice(x, y);
              setWindowOutSlice(x, y);
              setProcess();
            })
            
            gsap.to(visualKernelRef.current!.group.current!.position, {
              duration: 0.2,
              x: x,
              y: -y,
              z: visualKernelRef.current!.group.current!.position.z,
              ease: 'power'
            })
          }, (x + y * imageIn.w) * animSpeed));
    
          if (x === imageIn.w - kernel.data!.size && y !== imageIn.h -  kernel.data!.size) {
            timeoutIds.current.push(setTimeout(() => {}, (x + y * imageIn.w +  kernel.data!.size) * animSpeed));
          }
        }
      }
    }
  }, [kernel.data, visualOutputRef.current, colorMode, animSpeed, timeoutIds.current, imageOut, imageIn])

  useEffect(() => {
    if (isPlayAnimConvoluton) {
      handleAnimConvolution()
    }
  }, [isPlayAnimConvoluton])

  useEffect(() => {
    if (isResetAnimConvoluton) {
      handleRefresh()
      clearAnimConvolution()
    }
  }, [isResetAnimConvoluton])

  useEffect(() => {
    handleRefresh()
    clearAnimConvolution()
  }, [imageIn, colorMode, animSpeed])

  useEffect(() => {
    setIsPlayAnimConvolution(false);

    return (() => {
      clearAnimConvolution()
      setIsPlayAnimConvolution(false);
    })
  }, [])

  useEffect(() => {
    if (kernel.data && imageIn.data) {
      startTransition(() => {
        setWindowInSlice(0, 0);
        setWindowOutSlice(0, 0);
        setProcess();
      }) 
    }

    return (() => {
    })
  }, [kernel, imageIn, imageOut, colorMode])


  useEffect(() => {
    setIsSnap(false)
    if (interactiveMode == 'freedom') {
      if (visualOutputRef.current) {
        (visualOutputRef.current?.instancesMesh.current?.material as THREE.MeshBasicMaterial).visible = false;
      }
      gsap.to(visualKernelRef.current!.group.current!.position, {
        duration: 0.5,
        x: 0, y: 0, z: 2,
        ease: 'ease'
      })
    } else {
      if (visualOutputRef.current) {
        (visualOutputRef.current?.instancesMesh.current?.material as THREE.MeshBasicMaterial).visible = true;
      }
      gsap.to(visualKernelRef.current!.group.current!.position, {
        duration: 0.5,
        x: 0, y: 0, z: 0,
        ease: 'ease'
      })
    }
  }, [interactiveMode])

  const handleSnap = useCallback((event: KeyboardEvent) => {
    if (interactiveMode == 'freedom' && event.code === 'Space') {
      if (isSnap) {
        setIsSnap(false);
        gsap.to(camera.position, {
          duration: 0.3,
          x: camera.position.x,
          y: camera.position.y, 
          z: camera.position.z+20,
          ease: 'power4'
        })

        gsap.to(visualKernelRef.current!.group.current!.position, {
          duration: 0.3,
          x: visualKernelRef.current!.group.current!.position.x,
          y: visualKernelRef.current!.group.current!.position.y, 
          z: 2,
          ease: 'power4'
        })
      } else {
        setIsSnap(true);
        gsap.to(camera.position, {
          duration: 0.5,
          x: camera.position.x,
          y: camera.position.y, 
          z: camera.position.z-20,
          ease: 'power4'
        })

        gsap.to(visualKernelRef.current!.group.current!.position, {
          duration: 0.5,
          x: visualKernelRef.current!.group.current!.position.x,
          y: visualKernelRef.current!.group.current!.position.y, 
          z: 0,
          ease: 'power4'
        })
      }
    }
  }, [visualKernelRef.current, isSnap, interactiveMode])

  useEffect(() => {
    window.addEventListener('keydown', handleSnap)

    return (() => {
      window.removeEventListener('keydown', handleSnap)
    })
  }, [isSnap, interactiveMode])

  return (
    <group position={[-imageIn.w/2, imageIn.h/2, 0]}>
      <VisualInput onPointerMove={handleRaycaster}/>
      <VisualKernel
        ref={ visualKernelRef } 
        snapInRGb={ windowSliceInRGB.current }
        snapInGray={ windowSliceInGray.current }/>
      <VisualOutput ref={ visualOutputRef }/>
    </group>
  )
}