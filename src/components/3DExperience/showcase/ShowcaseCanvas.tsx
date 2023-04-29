import { Canvas } from "@react-three/fiber"
import * as S from '@style/3DExperience/ShowcaseCanvas.styled'
import { OrbitControls } from "@react-three/drei"
import { Background } from "../core/Background"
import { Env } from "../core/Env"
import { isLoadingState, isRenderSceneState, selectedKernelState, selectedSizeState } from "@store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useCallback, useLayoutEffect } from "react"
import { Ground } from "./Ground"
import { KernelMatrix } from "./KernelMatrix"
import { kernelCategoryDataSelector } from "@store/selectors"
import { camPosInDefault } from "./CameraControls"
import { Selector } from "./Selector"

interface Props {}

export const ShowcaseCanvas = ( props: Props) => {
  const setIsLoading = useSetRecoilState(isLoadingState)

  const { dataListByCategory } = useRecoilValue(kernelCategoryDataSelector);
  const setSelectedKernel = useSetRecoilState(selectedKernelState);
  const setSelectedSize = useSetRecoilState(selectedSizeState);
  const isRenderScene = useRecoilValue(isRenderSceneState);

  useLayoutEffect(() => {
    if (dataListByCategory["filtering"]) {
      setSelectedKernel((prevItem) => prevItem ? prevItem : {
        info: dataListByCategory["filtering"][0].info,
        data: dataListByCategory["filtering"][0].data
      })
      setSelectedSize(dataListByCategory["filtering"][0].data.size)
    }
  }, [dataListByCategory])

  const handleLoaded = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <S.StyledContainer>
      <Canvas frameloop={ isRenderScene ? "always" : "never" } dpr={[1, 2]} camera={{ position: camPosInDefault, fov: 22 }}>
      <group onUpdate={ handleLoaded }>

        <color attach="background" args={['#f0f0f0']} />
        <hemisphereLight intensity={0.15} groundColor="black" />
        <spotLight position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
        <pointLight distance={5} intensity={1} position={[-0.15, 0.7, 0]} color="#C5ABFB" />
        
        <Selector>
          <KernelMatrix/>
        </Selector>

        <Ground/>
        <Env/>
        {/* <Background/> */}
        
        <OrbitControls enableDamping={true}/>
      </group>
      </Canvas>
    </S.StyledContainer>
  )
}