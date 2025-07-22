// src/components/DrawerListComponent.tsx
import { Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  LibraryBooks as LibraryBooksIcon,
  Bookmark as BookmarkIcon,
  Favorite as FavoriteIcon,
  Book as BookIcon,
  Group as GroupIcon,
  AddCircle as AddCircleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useSyncUser } from '../hooks/useSyncUser';

const mainMenuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  { text: 'All books', icon: <LibraryBooksIcon />, path: '/books/paged' },
  { text: 'Liked books', icon: <FavoriteIcon />, path: '/liked' },
  { text: 'Reserved books', icon: <BookmarkIcon />, path: '/reserved' },
  { text: 'Loaned books', icon: <BookIcon />, path: '/loaned' },
];

const adminMenuItems = [
  { text: 'Users', icon: <GroupIcon />, path: '/admin-dashboard/users' },
  { text: 'Add book', icon: <AddCircleIcon />, path: '/admin-dashboard/add-book' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin-dashboard/settings' },
];

export default function DrawerListComponent() {
  const { loading, error, isAdmin } = useSyncUser();

  if (loading) {
    return (
      <Box textAlign="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={2}>
        {error}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h6" noWrap sx={{ px: 2, py: 1 }}>
        BooksLibrary
      </Typography>
      <Divider />
      <List>
        {mainMenuItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAdmin && (
        <>
          <Divider />
          <List>
            {adminMenuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
}
