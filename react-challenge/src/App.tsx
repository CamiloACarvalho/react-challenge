import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import FirstNotice from './components/FirstNotice/FirstNotice'
import './App.css'


function App() {
  
  return (
    <Routes>
      <Route 
        path="/"
        element={ 
          <>
            <Header /> 
            <FirstNotice />
          </>
        } />
    </Routes>
  )
}

export default App
