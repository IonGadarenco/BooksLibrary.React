import type { BookListItem } from './book';

export interface PagedResultType {
  items: BookListItem[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}
