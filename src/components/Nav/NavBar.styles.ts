import { SxProps, Theme } from '@mui/system';

export const brandDesktop: SxProps<Theme> = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

export const brandMobile: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'flex', md: 'none' },
  fontWeight: 700,
  letterSpacing: '.2rem',
  color: 'inherit',
  textDecoration: 'none',
};

export const mobileMenuBox: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'flex', md: 'none' },
};

export const desktopNavBox: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'none', md: 'flex' },
};

export const avatarBox: SxProps<Theme> = {
  flexGrow: 0,
};
