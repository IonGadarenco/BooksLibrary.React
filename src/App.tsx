import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme/Theme';
import { ThemeContext } from './contexts/themeContext';
import { useState } from 'react';
import { BooksProvider } from './contexts/booksContext';
import { RequestProvider } from './contexts/requestContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useSyncUser } from './hooks/useSyncUser';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { isLoading: auth0Loading, error: auth0Error } = useAuth0();
  const { syncedUser, isSyncing, syncError } = useSyncUser();

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 1. Stare de încărcare Auth0 inițială
  if (auth0Loading) {
    return <div>Se încarcă autentificarea...</div>; // Sau un spinner drăguț
  }

  // 2. Eroare Auth0 (dacă autentificarea inițială eșuează)
  if (auth0Error) {
    return <div>Oups... Eroare de autentificare: {auth0Error.message}</div>;
  }

  // 3. Stare de sincronizare cu backend-ul
  // Aici poți alege să blochezi UI-ul sau să afișezi un indicator
  // până când sincronizarea este completă.
  if (isSyncing) {
    return <div>Sincronizez datele utilizatorului...</div>; // Sau un spinner
  }

  // 4. Eroare la sincronizarea cu backend-ul
  // Aici poți decide cum să gestionezi eroarea. Poate vrei să permiți aplicației să continue,
  // dar cu o notificare că datele utilizatorului nu sunt complet sincronizate.
  // if (syncError) {
  //   return (
  //     <div>
  //       Eroare la sincronizarea utilizatorului cu baza de date: {syncError}
  //       <br />
  //       Vă rugăm să încercați să reîncărcați pagina sau să contactați suportul.
  //     </div>
  //   );
  // }

  console.log(syncedUser);

  return (
    <>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={getTheme(mode)}>
          <RequestProvider>
            <BooksProvider>
              <CssBaseline />
              {/* <MainLayout/> */}
              <AppRoutes />
            </BooksProvider>
          </RequestProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
