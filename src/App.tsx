import React, { useEffect, Suspense, useCallback, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { isLoadingResourcesState, isLoadingState, kernelCategoryDataState, resourcesState } from '@store/atoms'
import { Loading } from '@comp2d/Loading'
import { Routes, Route, HashRouter } from "react-router-dom"
import { IntroCanvas } from '@comp3d/Intro/IntroCanvas';
import { Navbar } from '@comp/2DExperience/Navbar';
import IntroPage from './pages/IntroPage';
import ShowcasePage from './pages/ShowcasePage';
import VisualPage from './pages/VisualPage';
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { AnimatePresence } from 'framer-motion';
import { emitEvent } from '@util/Event';
import { Cursor } from '@comp/2DExperience/Cursor';
import { useLayoutEffect } from 'react';
import Resources from '@util/Resources';
import { assets } from './assets';

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)
  const [isLoadingResources, setIsLoadingResources] = useRecoilState(isLoadingResourcesState);
  const setResources = useSetRecoilState(resourcesState);
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState)

  useEffect(() => {
    console.log('App re:render')
    setKernelCategoryData(data)
  }, [])

  const update = useCallback(() => {
    emitEvent('eUpdate')
    requestAnimationFrame(update);
  }, [])

  useEffect(() => {
    update();
  }, [])

  useLayoutEffect(() => {
    const resouces = new Resources(assets);

    document.addEventListener('eResourcesReady', () => {
      setResources(resouces.items)
      setIsLoadingResources(false)
    })
  }, [])

  return (
    <React.Fragment>
      {/* <IntroCanvas/> */}
      {/* <Layout/> */}
      {/* <Loading/> */}
      
      <AnimatePresence>
        { (isLoading || isLoadingResources) && <LoadingBox/> }
      </AnimatePresence>

      <AnimatePresence>
        { !isLoading && <Cursor/> }
      </AnimatePresence>
      

      {/* <Suspense fallback={<LoadingBox/>}> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<IntroPage/>}/>
          <Route path="/showcase" element={<ShowcasePage/>}/>
          <Route path="/visual" element={<VisualPage/>}/>
        </Routes>
      </HashRouter>
      {/* </Suspense> */}
    </React.Fragment>
  )
}
