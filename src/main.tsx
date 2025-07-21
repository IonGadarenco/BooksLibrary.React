import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from './contexts/themeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-oexrocuoi2ooa4oq.eu.auth0.com"
          clientId="nqLtEZ6ivn6gorJkdJwpwBEtTrbgEPXd"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'https://bookslibrary.api',
            scope: 'openid profile email',
          }}
          cacheLocation="localstorage"
        >
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Auth0Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
