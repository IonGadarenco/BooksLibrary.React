import { Box, InputBase, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearch } from '../hooks/UseSearch';
import { useAxiosAuth } from '../hooks/UseAxiosAuth';
import { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: theme.spacing(2, 2, 2, 2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function BookSearch() {
  const {
    filtreBy,
    sortBy,
    sortDirection,
    handleChangeFiltre,
    handleChangeSort,
    handleSortDirection,
    handleSearchInputChange,
    request,
  } = useSearch();
  const axiosAuth = useAxiosAuth();
  const { setBooks } = useContext(BooksContext);

  const handleSearch = async () => {
    const response = await axiosAuth.post('books/paged', request);
    setBooks(response.data.items);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Search>
        <SearchIconWrapper onClick={handleSearch}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchInputChange}
        />
      </Search>
      <Box sx={{ display: 'flex', py: 2 }}>
        <Box sx={{ width: '15ch', marginRight: 2}}>
          <FormControl fullWidth>
            <InputLabel id="filtre-label">Filtre</InputLabel>
            <Select
              labelId="filtre-label"
              id="filtre-select"
              value={filtreBy}
              onChange={e => handleChangeFiltre(e.target.value)}
              label="Filtre"
            >
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="Description">Description</MenuItem>
              <MenuItem value="Authors">Authors</MenuItem>
              <MenuItem value="Categories">Categories</MenuItem>
              <MenuItem value="Publisher">Publisher</MenuItem>
              <MenuItem value="ISBM">ISBM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: '16ch' }}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-id"
              label="Sort"
              value={sortBy}
              onChange={e => handleChangeSort(e.target.value)}
            >
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="TotalCopies">Total Copies</MenuItem>
              <MenuItem value="Categories">Categories</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button sx={{ color: 'inherit' }} onClick={handleSortDirection}>
          {sortDirection === 'asc' ? 'asc' : 'desc'}
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
}
