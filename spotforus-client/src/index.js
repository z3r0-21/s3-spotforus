import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Auth0Provider
          domain="spotforus-auth.eu.auth0.com"
          clientId="6zynGUG0iL3qVdBgexomDL9vlPUYkCcQ"
          redirectUri="http://localhost:3000/home"
          audience="https://spotforus-auth.eu.auth0.com/api/v2/"
          scope="read:current_user update:current_user_metadata"
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Auth0Provider>
      </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
