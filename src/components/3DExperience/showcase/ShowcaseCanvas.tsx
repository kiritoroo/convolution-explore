import { Canvas } from "@react-three/fiber"
import * as S from '@style/3DExperience/ShowcaseCanvas.styled'
import { OrbitControls } from "@react-three/drei"
import { Background } from "../core/Background"
import { Env } from "../core/Env"
import { isLoadingState, isRenderSceneState, resourcesState, selectedImageInfoState, selectedImageTextureState, selectedKernelState, selectedSizeState } from "@store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useCallback, useEffect, useLayoutEffect, useTransition } from "react"
import { Ground } from "./Ground"
import { KernelMatrix } from "./KernelMatrix"
import { kernelCategoryDataSelector } from "@store/selectors"
import { camPosInDefault } from "./CameraControls"
import { Selector } from "./Selector"
import { assets } from "@asset/index"

interface Props {}

export const ShowcaseCanvas = ( props: Props) => {
  const setIsLoading = useSetRecoilState(isLoadingState)

  const { dataListByCategory } = useRecoilValue(kernelCategoryDataSelector);
  const setSelectedKernel = useSetRecoilState(selectedKernelState);
  const setSelectedSize = useSetRecoilState(selectedSizeState);
  const isRenderScene = useRecoilValue(isRenderSceneState);
  const assetsResouces = useRecoilValue(resourcesState);
  const setSelectedImageTexture = useSetRecoilState(selectedImageTextureState);
  const setSelectedImageInfo = useSetRecoilState(selectedImageInfoState);
  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    if (dataListByCategory["filtering"]) {
      startTransition(() => {
        setSelectedKernel({
          info: dataListByCategory["filtering"][0].info,
          data: dataListByCategory["filtering"][0].data
        })
        setSelectedSize(dataListByCategory["filtering"][0].data.size)
      })
    }
  }, [dataListByCategory])

  useLayoutEffect(() => {
    if (Object.keys(assetsResouces).length > 0) {
      startTransition(() => {
        setSelectedImageTexture(assetsResouces["art-48pixel-1"]);
        setSelectedImageInfo({by: assets[0].by, name: "art-48pixel-1"});
      })
    }
  }, [assetsResouces])

  const handleLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <S.StyledContainer>
      <Canvas legacy={true} frameloop={ isRenderScene ? "always" : "never" } dpr={[1, 2]} camera={{ position: camPosInDefault, fov: 22 }}>
      <group onUpdate={ handleLoaded }>

        <color attach="background" args={['#f0f0f0']} />
        <hemisphereLight intensity={0.2} groundColor="#D0C0F7" />
        <spotLight position={[0, 20, 0]} angle={0.1} penumbra={1} intensity={0.5} castShadow shadow-mapSize={1024} />
        
        <Selector>
          <KernelMatrix/>
        </Selector>

        <Ground/>
        <Env/>
        
        <OrbitControls enableDamping={true}/>
      </group>
      </Canvas>
    </S.StyledContainer>
  )
}