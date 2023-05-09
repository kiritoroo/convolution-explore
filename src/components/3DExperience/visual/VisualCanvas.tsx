import { Canvas } from "@react-three/fiber"
import * as S from '@style/3DExperience/VisualCanvas.styled'
import { OrbitControls } from "@react-three/drei"
import { Background } from "./Background"
import { Env } from "../core/Env"
import { isLoadingState } from "@store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useCallback, useLayoutEffect, useTransition } from "react"
import { Ground } from "./Ground"
import { VisualControls } from "./VisualControls"

interface Props {}

export const VisualCanvas = ( props: Props) => {
  const setIsLoading = useSetRecoilState(isLoadingState)

  const handleLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <S.StyledContainer>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 22 }}>
        <group onUpdate={handleLoaded}>
          <color attach="background" args={['#f0f0f0']} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[150, 150, 150]} intensity={1} />
          
          <VisualControls/>
          <Env/>
          {/* <Ground/> */}
          <Background/>

          <OrbitControls enableDamping={true}/>
        </group>
      </Canvas>
    </S.StyledContainer>
  )
}