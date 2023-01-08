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
import MyAnnouncements from './pages/MyAnnouncements';
import MyHousehold from './pages/MyHouseholdPage'
import ManageUsersPage from './pages/ManageUsersPage'
import EditSelectedUserPage from './pages/EditSelectedUserPage';
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
        <Route path="myAnnouncements" element={ <MyAnnouncements/>} />
        <Route path="manageHouseholds" element={ <ManageHouseholdsPage/>} />
        <Route path="manageUsers" element={ <ManageUsersPage /> } />
        <Route path="myHousehold" element={ <MyHousehold /> } />
        <Route path="editUser" element={<EditSelectedUserPage/>} />
      </Routes>
    </div>
        // {/* <LandingPage/>
        // <LoginButton/>
        // <LogoutButton/>
        // <Footer/> */}

  );
}

export default App;
