import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BookSearch from '../components/BookSearch';
import { AccountMenu } from '../components/AccountMenu';

export default function Navbar() {
  
  return (
    <Box >
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            BooksLibrary
          </Typography>
          <BookSearch />
          <Box sx={{ flexGrow: 1 }} />
          <AccountMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
