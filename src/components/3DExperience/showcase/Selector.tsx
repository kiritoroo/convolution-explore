import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from 'maath'
import { useControls, button } from 'leva'
import { useThree  } from '@react-three/fiber'
import gsap from 'gsap';
import { Suspense, useCallback, useContext, useEffect, useRef, useTransition } from "react"
import * as THREE from 'three'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedKernelSelector } from "@store/selectors";
import { cursorContentState, cursorVariantState, isCollapseVezKernelCategoryState, isFocusKernelInfoState, isRenderSceneState } from "@store/atoms";
import { camAnimFocusKernelIn, camAnimFocusKernelOut } from "./CameraControls";

interface Props {
  children: React.ReactNode;
}

export const Selector = (props: Props) => {
  const ref = useRef<any>()
  const selecterKernel = useRecoilValue(selectedKernelSelector)
  const { camera } = useThree()
  const setIsCollapseVezKernelCategory = useSetRecoilState(isCollapseVezKernelCategoryState)
  const [isFocusKernelInfo, setIsFocusKernelInfo] = useRecoilState(isFocusKernelInfoState)
  const setIsRenderScene = useSetRecoilState(isRenderSceneState);
  const setCursorVariant = useSetRecoilState(cursorVariantState);
  const setCursorContent = useSetRecoilState(cursorContentState);
  const [isPending, startTransition] = useTransition();

  useFrame(({ viewport, camera, pointer }, delta) => {
    const direction = ref.current.position.clone().sub(camera.position).normalize();
    ref.current.lookAt(ref.current.position.clone().sub(direction));
    ref.current.position.set(2+selecterKernel.data!.size/2, 2+selecterKernel.data!.size/2, 2+selecterKernel.data!.size/2)

    easing.damp3(ref.current.scale, isFocusKernelInfo ? 4 : 0, isFocusKernelInfo ? 0.5 : 0.5, 1/delta)
    easing.dampC(ref.current.material.color, isFocusKernelInfo ? '#fcf4ff' : '#ffffff', 0.2, 1/delta)
  })

  useEffect(() => {
    if (isFocusKernelInfo) {
      startTransition(() => {
        camAnimFocusKernelIn(camera, selecterKernel.data!.size, () => { setIsRenderScene(false) })
      })
    } else {
      startTransition(() => {
        camAnimFocusKernelOut(camera, selecterKernel.data!.size, () => {})
      })
    }
  }, [isFocusKernelInfo])

  const handleOnSelect = useCallback(() => {
    if (isFocusKernelInfo) return
    startTransition(() => {
      setIsFocusKernelInfo(true)
      setIsCollapseVezKernelCategory(true)
      setCursorVariant("default")
      setCursorContent("")
    })
  }, [isFocusKernelInfo])

  const handleOnUnSelect = useCallback(() => {
    setIsRenderScene(true)
    startTransition(() => {
      setIsFocusKernelInfo(false)
      setIsCollapseVezKernelCategory(false)
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isFocusKernelInfo) return
    startTransition(() => {
      setCursorVariant("hoverkernel")
      setCursorContent("Info Kernel")
    })
  }, [isFocusKernelInfo])

  const handleMouseLeave = useCallback(() => {
    startTransition(() => {
      setCursorVariant("default")
      setCursorContent("")
    })
  }, [])

  return (
    <group>
      <group
        onPointerEnter={ handleMouseEnter }
        onPointerLeave={ handleMouseLeave }
        onClick={ handleOnSelect }>
        {props.children}
      </group>
      <mesh ref={ref}
        scale={0}
        onClick={ handleOnUnSelect }>
        <circleGeometry args={[5, 32, 32]} />
        <MeshTransmissionMaterial
          samples={15}
          resolution={1024}
          transmission={1}
          thickness={0.1}
          chromaticAberration={5}
          anisotropy={1}
          roughness={0.4}
          distortion={0.25}
          distortionScale={0.25}
          temporalDistortion={0}
          ior={0.83}
          toneMapped={true} />
      </mesh>
    </group>
  )
}