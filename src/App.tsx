import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { kernelCategoryDataState } from '@store/atoms'
import { Loading } from '@comp2d/Loading'
import { Layout } from '@comp2d/Layout'

export const App = () => {
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState)

  useEffect(() => {
    console.log('App re:render')
    setKernelCategoryData(data)
  }, [])

  return (
    <React.Fragment>
      <Layout/>
      <Loading/>
    </React.Fragment>
  )
}
