import { createContext, useState, type ReactNode } from 'react';
import type { BookListItem } from '../types/book';

interface BooksContextType {
  books: BookListItem[];
  setBooks: (books: BookListItem[]) => void;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  setBooks: () => {},
});

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookListItem[]>([]);

  return <BooksContext.Provider value={{ books, setBooks }}>{children}</BooksContext.Provider>;
};
