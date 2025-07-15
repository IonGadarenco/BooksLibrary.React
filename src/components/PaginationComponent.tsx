import { Pagination } from '@mui/material';
import { useRequest } from '../contexts/requestContext'; 
import { useSearch } from '../hooks/useSearch'; 

const PaginationComponent = () => {
  const { request, updateRequest } = useRequest();
  const { pagedResult } = useSearch();

  if (!pagedResult) {
    return null;
  }

  if(pagedResult.totalPages <= 1){
    return null;
  }

  const paginationKey = `${request.searchBy}-${request.columnNameForSorting}-${request.sortDirection}-${request.searchValue}`;

  return (
    <Pagination
      key={paginationKey}
      sx={{ my: 2 }}
      count={pagedResult.totalPages}
      page={request.pageIndex}
      onChange={(_, value) => {
        updateRequest({ pageIndex: value });
      }}
      shape="rounded"
      variant="outlined"
    />
  );
};

export default PaginationComponent;