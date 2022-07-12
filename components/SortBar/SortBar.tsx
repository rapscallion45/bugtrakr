import { FC, ReactNode } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

interface SortBarProps {
  sortBy: string;
  handleSortChange: (e: SelectChangeEvent<string>, child: ReactNode) => void;
  menuItems: { value: string; label: string }[];
  label: string;
  size?: 'small' | 'medium';
}

const SortBar: FC<SortBarProps> = function SortBar({
  sortBy,
  handleSortChange,
  menuItems,
  label,
  size,
}) {
  return (
    <FormControl variant="outlined" fullWidth size={size || 'medium'}>
      <InputLabel id="sort-label">Sort {label} By</InputLabel>
      <Select
        labelId="sort-label"
        value={sortBy}
        onChange={handleSortChange}
        label={`Sort ${label} By`}
        startAdornment={
          <InputAdornment position="start">
            <SortIcon color="primary" fontSize={size === 'small' ? 'inherit' : 'large'} />
          </InputAdornment>
        }
      >
        {menuItems.map((m) => (
          <MenuItem key={m.value} value={m.value}>
            {m.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortBar;
