import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Team from './pages/Team'
import Literature from './pages/literature'
import Resources from './pages/Resources'
import Events from './pages/events'
import UserDashboard from './components/UserDashboard'
import AdminPanel from './admin-panel/AdminPanel'
import ProtectedRoute from './admin-panel/ProtectedRoutes'
import Login from './admin-panel/Login'
import BSP from './pages/BSP'
import ProjectRegister from './pages/ProjectRegister'
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
          <Route path='/dashboard' element = {<UserDashboard />} />
          <Route path='/login' element={ <Login /> } />
          <Route path='/admin' element = {
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
            } />
          <Route path = '/BSP' element = {<BSP/>}></Route>
          <Route path = '/Register/:projectId' element = {<ProjectRegister/>}></Route>
          <Route path="/test/:Id" element={<h1>Test Works!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
