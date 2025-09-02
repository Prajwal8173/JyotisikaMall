//import{usestate} from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Home from './components/Home.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import ShopSection from './components/ShopSection.jsx'
function App() {
  return (
    <>
      
          <Home/>
          <HeroBanner/>
          <ShopSection/>

    </>
  )
}

export default App
