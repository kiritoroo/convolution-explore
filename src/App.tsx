import React, { useEffect } from 'react'
import { Loading } from '@comp2d/Loading'
import { isLoadingState } from '@store/atoms'
import { useRecoilValue } from 'recoil'

export const App = () => {
  const isLoading = useRecoilValue(isLoadingState)

  useEffect(() => {
    console.log('App re:render')
  }, [])

  return (
    <React.Fragment>
      { isLoading && <Loading/> }
    </React.Fragment>
  )
}
