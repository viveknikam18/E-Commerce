
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MainStore from './reducswork/MainStore.js'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={MainStore}>
    
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
    </Provider> 
  </StrictMode>,
)

