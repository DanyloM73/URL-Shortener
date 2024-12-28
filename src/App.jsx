import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ShortenUrl from './components/ShortenUrl';
import UrlList from './components/UrlList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 5000);
  };

  return (
    <div className='wrapper'>
      <h1>URL shortener</h1>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      {!token ? (
        <>
          <p>Before you start working, please try login or register</p>
          {isRegistering ? (
            <Register 
              apiBaseUrl={API_BASE_URL} 
              onLoginSuccess={(token) => setToken(token)}
              showAlert={showAlert} />
          ) : (
            <Login 
              apiBaseUrl={API_BASE_URL} 
              onLoginSuccess={setToken}
              showAlert={showAlert} />
          )}
          <p>
            {isRegistering ? (
              <>
                If you already have an account try to{' '}
                <button className='toggle' onClick={() => setIsRegistering(false)}>login</button>
              </>
            ) : (
              <>
                If you don't have an account try to{' '}
                <button className='toggle' onClick={() => setIsRegistering(true)}>register</button>
              </>
            )}
          </p>
        </>
      ) : (
        <>
          <ShortenUrl 
            apiBaseUrl={API_BASE_URL} 
            token={token}
            showAlert={showAlert} />
          <UrlList 
            apiBaseUrl={API_BASE_URL} 
            token={token} 
            showAlert={showAlert} />
        </>
      )}
    </div>
  );
};

export default App;
