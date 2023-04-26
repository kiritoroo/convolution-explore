import React, { useEffect } from 'react'
import { isLoadingState } from '@store/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { kernelCategoryDataState } from '@store/atoms'
import { Loading } from '@comp2d/Loading'
import { Layout } from '@comp2d/Layout'

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState)

  useEffect(() => {
    console.log('App re:render')
    setKernelCategoryData(data)
  }, [])

  return (
    <React.Fragment>
      { isLoading && <Loading/> }
      <Layout/>
    </React.Fragment>
  )
}
