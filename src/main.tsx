import React from 'react'
import ReactDOM from 'react-dom/client'
import { App }    from './App'
import { RecoilRoot } from 'recoil'
import '@util/Math'
import '@style/main.scss'
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
