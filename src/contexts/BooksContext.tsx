import { createContext } from 'react';

export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  totalCopies: number
}

interface BooksContextType {
  books: Book[];
  setBooks: (books: Book[]) => void;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  setBooks: () => {},
});

