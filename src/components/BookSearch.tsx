import {
  Box,
  InputBase,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearch } from '../hooks/useSearch';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    handleSearchClick,
  } = useSearch();
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Search>
            <SearchIconWrapper onClick={handleSearchClick}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInputChange}
              onClick={() => navigate('/books/paged')}
            />
          </Search>
        </Grid>
        <Grid size={{ xs: 5, md: 3 }}>
          <Box>
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
                <MenuItem value="ISBN">ISBN</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={{ xs: 5, md: 3 }}>
          <Box>
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
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={{ xs: 2, md: 1 }}>
          <Button sx={{ color: 'inherit' }} onClick={handleSortDirection}>
            {sortDirection === 'asc' ? 'asc' : 'desc'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
