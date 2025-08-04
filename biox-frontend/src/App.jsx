
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router'
import Team from './pages/Team'
import Literature from './pages/literature'
import Resources from './pages/Resources'
import Events from './pages/events'
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path = '/' element = {<Home />}></Route>
          <Route path = '/events' element = {< Events/>}></Route>
          <Route path = '/team' element = {<Team />}></Route>

          <Route path = '/literature' element = {<Literature />}></Route> 
          <Route path = '/resources' element = {<Resources />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
