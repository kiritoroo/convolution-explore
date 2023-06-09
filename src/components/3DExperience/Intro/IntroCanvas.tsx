import { Canvas } from "@react-three/fiber"
import * as S from '@style/3DExperience/IntroCanvas.styled'
import { AccumulativeShadows, OrbitControls, RandomizedLight } from "@react-three/drei"
import { Background } from "../core/Background"
import { Env } from "../core/Env"
import { Caption } from "./Caption"
import { Rig } from "./Rig"
import { Matrix } from "../../../test/Matrix2"
import { PostProcessing } from "./PostProcessing"
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { Suspense, useCallback } from "react"
import { isLoadingState } from "@store/atoms"
import { useSetRecoilState } from "recoil"
import { useTranslation } from "react-i18next"

interface Props {}

export const IntroCanvas = ( props: Props) => {
  const setIsLoading = useSetRecoilState(isLoadingState)
  const { t } = useTranslation();

  const handleLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <S.StyledContainer>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }} >
        <group onUpdate={handleLoaded}>
        <color attach="background" args={['#f0f0f0']} />
          <hemisphereLight intensity={0.5} groundColor="black" />

          <Caption args={{ position: [0,0,-5], rotation: [0,0,0] }}>{t('intropage.title')}</Caption>

          { Array.from({ length: 10 }, (_, i) => <Matrix key={i} />) }

          <Rig/>
          <Env/>
          <Background/>
          <PostProcessing/>
      
          <OrbitControls enableDamping={true}/>
        </group>
      </Canvas>
    </S.StyledContainer>
  )
}