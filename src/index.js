import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/Theme.context';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>{/*👈*/}
      <App />
    </ThemeProvider>{/*👈*/}
  </React.StrictMode>
);
reportWebVitals();
