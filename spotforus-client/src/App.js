import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Footer from './Navigation/Footer';
import LandingPage from './pages/LandingPage';
import LoginButton from './components/Auth/LoginButton';
import LogoutButton from './components/Auth/LogoutButtons';
import SideNavbar from './Navigation/SideNavbar';
import { Routes, Route } from "react-router-dom"


library.add(far, fas)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="dashboard" element={ <SideNavbar/> } />
        <Route path="landing" element={ <LandingPage/> } />
      </Routes>
    </div>
        // {/* <LandingPage/>
        // <LoginButton/>
        // <LogoutButton/>
        // <Footer/> */}

  );
}

export default App;
