import * as React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps, Theme } from '@mui/system';

interface Props {
  to: string;
  label: string;
  isActive: boolean;
  sx?: SxProps<Theme>;
}

const NavLinkButton: React.FC<Props> = ({ to, label, isActive, sx }) => (
  <Button
    component={RouterLink}
    to={to}
    sx={sx}
    aria-current={isActive ? 'page' : undefined}
    disableRipple
  >
    {label}
  </Button>
);

export default NavLinkButton;
