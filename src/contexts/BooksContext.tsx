import { createContext, useState, type ReactNode } from 'react';
import type { BookListType } from '../models/types/bookListType';

interface BooksContextType {
  books: BookListType[];
  setBooks: (books: BookListType[]) => void;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  setBooks: () => {},
});

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookListType[]>([]);

  return <BooksContext.Provider value={{ books, setBooks }}>{children}</BooksContext.Provider>;
};
