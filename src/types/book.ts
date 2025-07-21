import type { Author } from './author';
import type { Category } from './category';
import type { Loan } from './loan';
import type { Publisher } from './publisher';
import type { Reservation } from './reservation';
import type { Review } from './review';

export interface BookListItem {
  id: number;
  title: string;
  coverImageUrl: string;
  authors: Author[];
}

export interface PublicBookDetails {
  id: number;
  title: string;
  description: string;
  isbn: string;
  totalCopies: number;
  coverImageUrl: string;
  publisher: Publisher;
  authors: Author[];
  categories: Category[];
  reviews: Review[];
  availableCopies: number;
  likeCount: number;
  userHasLiked: boolean;
  userHasActiveReservation: boolean;
  userHasActiveLoan: boolean;
  activeLoanDueDate?: string | null;
}

export interface AdminBookDetails extends PublicBookDetails {
  loans: Loan[];
  reservations: Reservation[];
}

export type BookDetails = PublicBookDetails | AdminBookDetails;

export function isAdminBookDetails(book: BookDetails): book is AdminBookDetails {
  return (book as AdminBookDetails).loans !== undefined;
}
