import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
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
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Symposium from './pages/Symposium'
function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Routes>
          <Route path = '/' element = {<Home />}></Route>
          <Route path = '/events' element = {< Events/>}></Route>
          <Route path = '/team' element = {<Team />}></Route>
          <Route path = '/symposium' element = {<Symposium />}></Route>
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
          <Route path = '/contact' element = {<Contact/>}></Route>
          <Route path = '/blog' element = {<Blog/>}></Route>
          <Route path = '/Register/:projectId' element = {<ProjectRegister/>}></Route>
          <Route path="/test/:Id" element={<h1>Test Works!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </>
  )
}

export default App
