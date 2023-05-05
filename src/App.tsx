import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { isLoadingResourcesState, isLoadingState, kernelCategoryDataState, resourcesState } from '@store/atoms'
import { Routes, Route, HashRouter } from "react-router-dom"
import IntroPage from './pages/IntroPage';
import ShowcasePage from './pages/ShowcasePage';
import VisualPage from './pages/VisualPage';
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { AnimatePresence } from 'framer-motion';
import { Cursor } from '@comp/2DExperience/Cursor';
import { useLayoutEffect } from 'react';
import Resources from '@util/Resources';
import { assets } from './assets';
import { useTranslation } from 'react-i18next';

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)
  const [isLoadingResources, setIsLoadingResources] = useRecoilState(isLoadingResourcesState);
  const setResources = useSetRecoilState(resourcesState);
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState)
  const { i18n } = useTranslation();

  useEffect(() => {
    setKernelCategoryData(data)
  }, [])

  useLayoutEffect(() => {
    const resouces = new Resources(assets);

    document.addEventListener('eResourcesReady', () => {
      setResources(resouces.items)
      setIsLoadingResources(false)
    })

    const locale = localStorage.getItem("user-locale")
    i18n.changeLanguage(locale ?? 'en')
  }, [])

  return (
    <React.Fragment>
      <AnimatePresence>
        { (isLoading || isLoadingResources) && <LoadingBox/> }
      </AnimatePresence>

      <AnimatePresence>
        { !isLoading && <Cursor/> }
      </AnimatePresence>

      <HashRouter>
        <Routes>
          <Route path="/" element={<IntroPage/>}/>
          <Route path="/showcase" element={<ShowcasePage/>}/>
          <Route path="/visual" element={<VisualPage/>}/>
        </Routes>
      </HashRouter>
    </React.Fragment>
  )
}
