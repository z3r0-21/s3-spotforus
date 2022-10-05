import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Footer from './Navigation/Footer';
import LandingPage from './components/Landing/LandingPage';


library.add(far, fas)

function App() {
  return (
    <div className="App">
        <LandingPage/>
        <Footer/>
    </div>
  );
}

export default App;
