import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import LandingPage from './pages/LandingPage';
import ManageHouseholdsPage from './pages/ManageHouseholdsPage';
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navigation/Navbars/Navbar';
import HomePage from './pages/HomePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NewAnnouncementPage from './pages/NewAnnouncementPage';


library.add(far, fas)

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="home" element={ <HomePage/> } />
        <Route path="newAnnouncement" element={ <NewAnnouncementPage/> } />
        <Route path="landing" element={ <LandingPage/> } />
        <Route path="announcements" element={ <AnnouncementsPage/>} />
      </Routes>
    </div>
        // {/* <LandingPage/>
        // <LoginButton/>
        // <LogoutButton/>
        // <Footer/> */}

  );
}

export default App;
