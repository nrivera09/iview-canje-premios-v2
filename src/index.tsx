import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { initConsoleInterceptor } from './shared/debug/initConsoleInterceptor';
import { ClickInterceptor } from './shared/debug/ClickInterceptor';

if (process.env.NODE_ENV === 'development') {
  initConsoleInterceptor();
  ClickInterceptor.init();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
