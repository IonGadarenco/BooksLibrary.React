import Navbar from './layouts/Navbar';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getTheme } from './theme/Theme';
import { ThemeContext } from './contexts/ThemeContext';
import { useState } from 'react';
import { BooksContext, type Book } from './contexts/BooksContext';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [books, setBooks] = useState<Book[]>([]);
  console.log(books);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={getTheme(mode)}>
          <BooksContext.Provider value={{books, setBooks}}>
            <CssBaseline />
            <Navbar />
            <Content />
            <Footer />
          </BooksContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
