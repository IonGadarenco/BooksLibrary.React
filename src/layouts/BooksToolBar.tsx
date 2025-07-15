import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import BookSearch from '../components/BookSearch';
import { AccountMenu } from '../components/AccountMenu';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Grid, IconButton } from '@mui/material';
import DrawerListComponent from '../components/DrawerListComponent';

export default function BooksToolBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <DrawerListComponent/>
    </Box>
  );

  return (
    <Container>
      <AppBar>
        <Grid container sx={{ m: 2 }} alignItems="center" columnSpacing={{ xs: 1, lg: 3 }}>
          <Grid size={{ xs: 8, md: 2 }} order={1} sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              BooksLibrary
            </Typography>
          </Grid>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <Grid size={{ xs: 12, md: 8 }} order={{ xs: 3, md: 2 }}>
            <BookSearch />
          </Grid>
          <Grid size={{ xs: 4, md: 2 }} order={{ xs: 2, md: 3 }}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
              <AccountMenu />
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </Container>
  );
}
