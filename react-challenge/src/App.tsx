import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import BreakNews from './components/BreakNews/BreakNews'
import Release from './components/Release/Release'
import News from './components/News/News'
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
      <Route
        path="/mostRecentely"
        element={
          <>
            <Header />
          </>
        }
      />
      <Route
        path="/release"
        element={
          <>
            <Header />
            <Release />
          </>
        }
      />
      <Route
        path="/news"
        element={
          <>
            <Header />
            <News />
          </>
        }
      />
      <Route
        path="/favorite"
        element={
          <>
            <Header />
          </>
        }
      />
    </Routes>
  )
}

export default App
