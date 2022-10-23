import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/Theme.context';
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
