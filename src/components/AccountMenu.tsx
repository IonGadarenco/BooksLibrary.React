import { Nightlight, LightMode, AccountCircle } from '@mui/icons-material';
import { Menu, MenuItem, IconButton, Box, Avatar, Typography, Divider } from '@mui/material';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

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
        vertical: 'bottom',
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
      <MenuItem onClick={handleMenuClose}>
        {isAuthenticated && user ? (
          <Typography
            component={Link}
            to="/profile"
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px',
              display: 'block',
            }}
          >
            {user.name || user.email || 'Profile'}
          </Typography>
        ) : (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Not Logged In
          </Typography>
        )}
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleMenuClose}>
        <Box
          onClick={() =>
            isAuthenticated
              ? logout({ logoutParams: { returnTo: window.location.origin } })
              : loginWithRedirect()
          }
          sx={{
            width: '100%',
            textAlign: 'left',
          }}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: -1 }}>
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
