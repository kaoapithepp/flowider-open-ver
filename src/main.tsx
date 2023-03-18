import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import App from './App'
import PlaceEntityProvider from './context/PlaceEntityProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaceEntityProvider>
        <App />
      </PlaceEntityProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
