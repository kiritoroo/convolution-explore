import { Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { colorModeState, isSnapKernelState, resourcesState } from '@store/atoms';
import { selectedImageInputSelector, selectedKernelSelector } from '@store/selectors';
import React, { useEffect, useMemo, useRef, useImperativeHandle } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as THREE from 'three';
import { WindowInput } from './VisualContent/WindowInput';
import { SnapInput } from './VisualContent/SnapInput';
import { TColor } from '@type/index';

useLoader.preload(THREE.TextureLoader,"./src/assets/images/tex-border.png");

interface Props {
  snapInRGb: TColor[]
  snapInGray: number[]
}

interface Refs {
  group: React.RefObject<THREE.Group>
}

export const VisualKernel = React.memo(React.forwardRef<Refs, Props>(( props, ref ) => {
  const { snapInRGb, snapInGray } = props;
  const [isSnap, setIsSnap] = useRecoilState(isSnapKernelState);

  const kernel = useRecoilValue(selectedKernelSelector);
  const image = useRecoilValue(selectedImageInputSelector);
  const colorMode = useRecoilValue(colorModeState);
  const assetsResouces = useRecoilValue(resourcesState);
  const clock = new THREE.Clock();

  const kernelGroupRef = useRef<any>();
  const snapInRef = useRef<any>();
  const effectInRef = useRef<any>();
  const windowInRef = useRef<any>();
  const snapOutRef = useRef<any>();
  const effectOutRef = useRef<any>();
  const windowOutRef = useRef<any>();

  useImperativeHandle(ref, () => {
    return {
      group: kernelGroupRef
    }
  }, [kernelGroupRef.current])

  const windowGeometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.99, 0.99, 0.99));
  const windowMaterial = useRef<THREE.MeshStandardMaterial>(new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
    metalness: 0.5,
    roughness: 0.5
  }))

  const snapGeometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.99, 0.99, 1.05));
  const snapTexture = useLoader(THREE.TextureLoader, "./src/assets/images/tex-border.png");
  const snapMaterial = useMemo<THREE.MeshBasicMaterial>(() => (new THREE.MeshBasicMaterial({
    map: snapTexture ?? null,
    color: new THREE.Color(0xffffff),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  })), [snapTexture])

  const effectInGeometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.9, 8.5, 0.9));
  const effectOutGeometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.9, 3.5, 0.9));
  const effectMaterial = useRef<THREE.MeshBasicMaterial>(new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xA882FA),
    side: THREE.DoubleSide,
    transparent: true
  }))
  const effectUniform = useRef({
    time: { value: 0 }
  })
  effectMaterial.current.onBeforeCompile = (shader: any) => {
    shader.uniforms.time = effectUniform.current.time;
    shader.fragmentShader = `
      uniform float time;
      ${shader.fragmentShader}`
    .replace(
      `#include <color_fragment>`,
      `#include <color_fragment>
      float t = time;
      float mainWave = sin((vUv.y - t * 0.2) * 2.5 * PI2) * 0.5 + 0.5;
      mainWave = mainWave * 0.25 + 0.25;
      mainWave *= (sin(t * PI2 * 1.) * 0.5 + 0.5) * 0.25 + 0.75;
      float sideLines = smoothstep(0.45, 0.5, abs(vUv.x - 0.5));
      float fadeOut = pow(vUv.y, 2.7);
      
      float a = 0.;
      a = max(a, mainWave);
      a = max(a, sideLines);
      
      diffuseColor.a = a * fadeOut;`
    );
  }
  effectMaterial.current.defines = {"USE_UV": ""};

  useFrame(() => {
    effectUniform.current.time.value = clock.getElapsedTime();
  })

  useEffect(() => {
    if (kernelGroupRef.current) {
      // kernelGroupRef.current.position.set(-image.w/2, image.h/2, 0)
      kernelGroupRef.current.position.set(0, 0, 0)
    }
  }, [image, kernelGroupRef.current])

  useEffect(() => {
    if (windowInRef.current && effectInRef.current && snapInRef.current) {
      for (let y = 0; y < kernel.data!.size; y++) {
        for (let x = 0; x < kernel.data!.size; x++) {
          const index = (y * kernel.data!.size + x);
          const matrix = new THREE.Matrix4();
          
          matrix.setPosition(x, -y, 0);
          snapInRef.current.setMatrixAt(index, matrix);
          matrix.setPosition(x, -y, 0);
          windowInRef.current.setMatrixAt(index, matrix);
          matrix.setPosition(x, 4.5, -y+(kernel.data!.size-1));
          effectInRef.current.setMatrixAt(index, matrix);
        }
      }
      effectInRef.current.rotation.x = Math.PI / 2
      windowInRef.current.position.set(0, 0, 8);

      snapInRef .current.instanceMatrix.needsUpdate = true
      effectInRef .current.instanceMatrix.needsUpdate = true
      windowInRef.current.instanceMatrix.needsUpdate = true
    }
  }, [kernel, windowInRef.current, effectInRef.current, snapInRef.current])

  useEffect(() => {
    if (windowOutRef.current, effectOutRef.current, snapOutRef.current) {
      const x = Math.floor(kernel.data!.size/2);
      const y = Math.floor(kernel.data!.size/2);

      snapOutRef.current.position.set(x, -y, 15);
      windowOutRef.current.position.set(x, -y, 12);
      effectOutRef.current.position.set(x, -y, 11+2)
      effectOutRef.current.rotation.x = -Math.PI / 2
    }
  }, [kernel, windowOutRef.current, effectOutRef.current, snapOutRef.current])

  return (
    <group ref={ kernelGroupRef }>
      <group key='in-group'>
        <instancedMesh ref={ snapInRef } args={[undefined, undefined, kernel.data!.size*kernel.data!.size]}
          geometry={ snapGeometry.current }
          material={ snapMaterial }>
            <Html distanceFactor={30} position={[kernel.data!.size/2-0.5, -kernel.data!.size/2+0.5, 1]}>
              <SnapInput
                isSnap={ isSnap }
                colorMode={ colorMode }
                kernelData={ kernel.data! }
                snapRGb={ snapInRGb }
                snapGray={ snapInGray }/>
            </Html>
        </instancedMesh>

        <instancedMesh ref={ effectInRef } args={[undefined, undefined, kernel.data!.size*kernel.data!.size]}
          geometry={ effectInGeometry.current }
          material={ effectMaterial.current }>
        </instancedMesh>

        <instancedMesh ref={ windowInRef } args={[undefined, undefined, kernel.data!.size*kernel.data!.size]}
          geometry={ windowGeometry.current }
          material={ windowMaterial.current }>
            <Html distanceFactor={30} position={[kernel.data!.size/2-0.5, -kernel.data!.size/2+0.5, 1]}>
              <WindowInput
                isSnap={ isSnap }
                kernelInfo={ kernel.info! }
                kernelData={ kernel.data! }/>
            </Html>
        </instancedMesh>
      </group>

      <group key='out-group'>
        <mesh ref={ windowOutRef }
          geometry={ windowGeometry.current }
          material={ windowMaterial.current }>
            {/* <Html distanceFactor={10}>
              <div>Window Output</div>
            </Html> */}
        </mesh>

        <mesh ref={ effectOutRef }
          geometry={ effectOutGeometry.current }
          material={ effectMaterial.current }>
        </mesh>

        <mesh ref={ snapOutRef }
          geometry={ snapGeometry.current }
          material={ snapMaterial }>
            {/* <Html distanceFactor={10}>
              <div>Snap Output</div>
            </Html> */}
        </mesh>
      </group>
    </group>
  )
}))
