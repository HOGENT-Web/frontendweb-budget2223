import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/Theme.context';
import MyAuth0Provider from './contexts/MyAuth0Provider';

const root = createRoot(document.getElementById('root'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <MyAuth0Provider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </MyAuth0Provider>
  </React.StrictMode>,
);
reportWebVitals();
