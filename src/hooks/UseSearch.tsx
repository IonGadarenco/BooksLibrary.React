import { useContext, useEffect, useState } from 'react';
import type { PagedResultType } from '../models/types/PagedResultType';
import { useApi } from '../api/axiosInstance';
import { BooksContext } from '../contexts/booksContext';
import { useRequest } from '../contexts/requestContext';
import type { PagedRequestType } from '../models/types/PagedRequestType';

export const useSearch = () => {
  const { request, updateRequest } = useRequest();
  const { setBooks } = useContext(BooksContext);
  const api = useApi();
  const [pagedResult, setPagedResult] = useState<PagedResultType>();

  useEffect(() => {
    api.post<PagedResultType>('books/paged', request).then(res => {
      setPagedResult(res.data);
      setBooks(res.data.items);
    });
  }, [request, api, setBooks]);

  const handleChangeFiltre = (value: string) => {
    updateRequest({ searchBy: value, pageIndex: 1 });
  };

  const handleChangeSort = (value: string) => {
    updateRequest({ columnNameForSorting: value, pageIndex: 1 });
  };

  const handleSortDirection = () => {
    updateRequest((prevRequest: PagedRequestType) => ({
      sortDirection: prevRequest.sortDirection === 'asc' ? 'desc' : 'asc',
      pageIndex: 1,
    }));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateRequest({ searchValue: event.target.value, pageIndex: 1 });
  };

  const handleSearchClick = () => {
    updateRequest({ pageIndex: 1 });
  };

  return {
    filtreBy: request.searchBy,
    sortBy: request.columnNameForSorting,
    sortDirection: request.sortDirection,
    searchValue: request.searchValue,
    pageIndex: request.pageIndex,
    pagedResult,
    setPageIndex: (value: number) => updateRequest({ pageIndex: value }),
    handleChangeFiltre,
    handleChangeSort,
    handleSortDirection,
    handleSearchInputChange,
    handleSearchClick,
  };
};
