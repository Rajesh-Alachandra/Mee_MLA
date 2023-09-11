import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './pages/Login';
import { AuthProvider } from './components/AuthProvider';


function Root() {

  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
      {/* {isLoggedIn ? <App /> : <Login />} */}
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

