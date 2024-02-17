import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import BreakNews from './components/BreakNews/BreakNews'
import './App.css'


function App() {
  
  return (
    <Routes>
      <Route 
        path="/"
        element={ 
          <>
            <Header /> 
            <BreakNews />
          </>
        } />
    </Routes>
  )
}

export default App
