import { useState, type ChangeEvent } from 'react';

export const useSearch = () => {
  const [filtreBy, setFiltreBy] = useState('Title');
  const [sortBy, setSortBy] = useState('Title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchValue, setSearchValue] = useState('');

  const handleChangeFiltre = (value: string) => setFiltreBy(value);
  const handleChangeSort = (value: string) => setSortBy(value);
  const handleSortDirection = () => setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const request = {
    pageIndex: 1,
    pageSize: 10,
    columnNameForSorting: sortBy,
    sortDirection: sortDirection,
    requestFilters: {
      logicalOperator: 1,
      filters: [
        {
          path: filtreBy,
          value: searchValue,
        },
      ],
    },
  };

  return {
    filtreBy,
    sortBy,
    sortDirection,
    searchValue,
    request,
    handleChangeFiltre,
    handleChangeSort,
    handleSortDirection,
    handleSearchInputChange,
  };
};
