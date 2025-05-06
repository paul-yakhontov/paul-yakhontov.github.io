import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { Page } from '@store/store';
import NavLinkButton from './NavLinkButton';
import NavMenuItemLink from './NavMenuItemLink';
import * as styles from './NavBar.styles';
import {
  BRAND_NAME,
  ROUTE_ROOT,
  MENU_APPBAR_ID,
  ARIA_CURRENT_PAGE,
  NAV_ANCHOR_ORIGIN,
  NAV_TRANSFORM_ORIGIN,
  AVATAR_LINK,
} from 'constants/appConstants';

type Props = {
  pages: Page[];
};

const NavBar: React.FC<Props> = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const openNavMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElNav(e.currentTarget);
  const closeNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            component="a"
            href={ROUTE_ROOT}
            sx={styles.brandDesktop}
          >
            {BRAND_NAME}
          </Typography>

          <Box sx={styles.mobileMenuBox}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls={MENU_APPBAR_ID}
              aria-haspopup="true"
              onClick={openNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id={MENU_APPBAR_ID}
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={closeNavMenu}
              anchorOrigin={NAV_ANCHOR_ORIGIN}
              transformOrigin={NAV_TRANSFORM_ORIGIN}
            >
              {pages.map(p => (
                <NavMenuItemLink
                  key={p.routeName}
                  to={p.routeName}
                  label={p.routeName}
                  isActive={pathname === `/${p.routeName}`}
                  aria-current={pathname === `/${p.routeName}` ? ARIA_CURRENT_PAGE : undefined}
                  onClick={() => {
                    closeNavMenu();
                    navigate(p.routeName);
                  }}
                />
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            component="a"
            href={ROUTE_ROOT}
            sx={styles.brandMobile}
          >
            {BRAND_NAME}
          </Typography>

          <Box component="nav" aria-label="Primary" sx={styles.desktopNavBox}>
            {pages.map(p => {
              const isActive = pathname === `/${p.routeName}`;
              return (
                <NavLinkButton
                  key={p.routeName}
                  to={p.routeName}
                  label={p.routeName}
                  isActive={isActive}
                  aria-current={isActive ? ARIA_CURRENT_PAGE : undefined}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                />
              );
            })}
          </Box>

          <Box sx={styles.avatarBox}>
            <Avatar alt={BRAND_NAME} src={AVATAR_LINK} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
