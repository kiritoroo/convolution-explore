import React from 'react'
import ReactDOM from 'react-dom/client'
import { App }    from './App'
import { RecoilRoot } from 'recoil'
import '@style/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
)
