import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  to: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavMenuItemLink: React.FC<Props> = ({ to, label, isActive, onClick }) => (
  <MenuItem
    component={RouterLink}
    to={to}
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
  >
    <Typography textAlign="center">{label}</Typography>
  </MenuItem>
);

export default NavMenuItemLink;
