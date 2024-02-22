import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import BreakNews from './components/BreakNews/BreakNews'
import Release from './components/Note/Release'
import News from './components/News/News'
import Favorite from './components/Favorite/Favorite'
import RecentlyNews from './components/RecentlyNews/RecentlyNews'
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
        path="/mostRecently"
        element={
          <>
            <Header />
            <RecentlyNews />
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
            <Favorite />
          </>
        }
      />
    </Routes>
  )
}

export default App
