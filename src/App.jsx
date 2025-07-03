import { Route, Routes } from "react-router-dom"
import Footer from "./COMPONENTS/Footer"
import Header from "./COMPONENTS/Header"
import Home from "./PAGES/Home"
import LandingPage from "./PAGES/LandingPage"
import WatchingHistory from "./PAGES/WatchingHistory"


function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path= '/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/watch' element={<WatchingHistory /> }/>
      </Routes>

      <Footer />
    </>
  )
}

export default App
