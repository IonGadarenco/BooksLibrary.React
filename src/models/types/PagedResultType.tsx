import type { BookListType } from './bookListType';

export interface PagedResultType {
  items: BookListType[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}
