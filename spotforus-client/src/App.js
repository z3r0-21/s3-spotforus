import logo from './logo.svg';
import './App.css';
import LoginButton from './components/Auth/LoginButton';
import LogoutButton from './components/Auth/LogoutButtons';
import Profile from './components/Auth/Profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
      </header>
    </div>
  );
}

export default App;
