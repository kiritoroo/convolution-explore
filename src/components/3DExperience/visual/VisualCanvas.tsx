import { Canvas } from "@react-three/fiber"
import * as S from '@style/3DExperience/VisualCanvas.styled'
import { OrbitControls } from "@react-three/drei"
import { Background } from "../core/Background"
import { Env } from "../core/Env"
import { isLoadingState } from "@store/atoms"
import { useSetRecoilState } from "recoil"
import { useCallback } from "react"

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
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
        <group onUpdate={handleLoaded}>
          <color attach="background" args={['#f0f0f0']} />
          <hemisphereLight intensity={0.5} groundColor="black" />

          <Env/>
          <Background/>
          
          <OrbitControls enableDamping={true}/>
        </group>
      </Canvas>
    </S.StyledContainer>
  )
}