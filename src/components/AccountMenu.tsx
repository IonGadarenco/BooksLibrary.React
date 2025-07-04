import { Nightlight, LightMode, AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem, IconButton, Box, Avatar } from '@mui/material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';

export const AccountMenu = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {isAuthenticated ? (
          <Box onClick={() => logout()}>Logout</Box>
        ) : (
          <Box onClick={() => loginWithRedirect()}>Login</Box>
        )}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === 'light' ? <Nightlight /> : <LightMode />}
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        {isAuthenticated ? <Avatar src={user?.picture} /> : <AccountCircle />}
      </IconButton>
      {renderMenu}
    </Box>
  );
};
