import React, { useEffect, Suspense, useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { isLoadingState, kernelCategoryDataState } from '@store/atoms'
import { Loading } from '@comp2d/Loading'
import { Layout } from '@comp2d/Layout'
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

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)

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

  return (
    <React.Fragment>
      {/* <IntroCanvas/> */}
      {/* <Layout/> */}
      {/* <Loading/> */}
      
      <AnimatePresence>
        { isLoading && <LoadingBox/> }
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
