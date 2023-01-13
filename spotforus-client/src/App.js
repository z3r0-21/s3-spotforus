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
import EditSelectedHouseholdPage from './pages/EditSelectedHouseholdPage';
import ManageAnnouncementsPage from './pages/ManageAnnouncementsPage';
import AdminNewAnnouncement from './pages/AdminNewAnnouncement';
import EditHouseholdDetailsPage from './pages/EditHouseholdDetailsPage';
import EditHouseholdSettingsPage from './pages/EditHouseholdSettingsPage';
import ManageHouseholdSchedule from './pages/ManageHouseholdSchedule';
import JoinHousehold from './components/Join/JoinHousehold';
import DashboardPage from './pages/DashboardPage';

library.add(far, fas)

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="home" element={ <HomePage/> } />
        <Route path="newAnnouncement" element={ <NewAnnouncementPage/> } />
        <Route path="adminNewAnnouncement" element={ <AdminNewAnnouncement/> } />
        <Route path="landing" element={ <LandingPage/> } />
        <Route path="announcements" element={ <AnnouncementsPage/>} />
        <Route path="myAnnouncements" element={ <MyAnnouncements/>} />
        <Route path="manageHouseholds" element={ <ManageHouseholdsPage/>} />
        <Route path="manageUsers" element={ <ManageUsersPage /> } />
        <Route path="myHousehold" element={ <MyHousehold /> } />
        <Route path="editUser" element={<EditSelectedUserPage/>} />
        <Route path="editHousehold" element={<EditSelectedHouseholdPage/>} />
        <Route path="manageAnnouncements" element={<ManageAnnouncementsPage/>} />
        <Route path="editHouseholdDetails" element={<EditHouseholdDetailsPage/>} />
        <Route path="editHouseholdSettings" element={<EditHouseholdSettingsPage/>} />
        <Route path="manageHouseholdSchedule" element={<ManageHouseholdSchedule/>} />
        <Route path="join" element={<JoinHousehold/>} />
        <Route path="dashboard" element={<DashboardPage/>} />
      </Routes>
    </div>
        // {/* <LandingPage/>
        // <LoginButton/>
        // <LogoutButton/>
        // <Footer/> */}

  );
}

export default App;
