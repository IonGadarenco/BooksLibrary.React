import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerListComponent = () => {
  const mainMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'All books', icon: <LibraryBooksIcon />, path: '/books/paged' },
    { text: 'Info', icon: <InfoIcon />, path: '/info' },
    { text: 'Saved', icon: <BookmarkIcon />, path: '/saved' },
  ];

  const adminMenuItems = [
    { text: 'Users', icon: <GroupIcon />, path: '/admin-dashboard/users' },
    { text: 'Add book', icon: <AddCircleIcon />, path: '/admin-dashboard/add-book' },
  ];

  return (
    <>
      <Typography variant="h6" noWrap component="div" sx={{ px: 2, py: 1 }}>
        BooksLibrary
      </Typography>
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {adminMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default DrawerListComponent;