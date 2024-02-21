import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ProviderFavorite from './components/Context/ProviderFavorite'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <ProviderFavorite>
      <App />
    </ProviderFavorite>
  </BrowserRouter>
)
