import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './context/Contextapi.jsx'
import Authcontext from './context/Authcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authcontext>



        <Contextapi>
          <App />
        </Contextapi>
      </Authcontext>

    </BrowserRouter>
  </React.StrictMode>,
)
