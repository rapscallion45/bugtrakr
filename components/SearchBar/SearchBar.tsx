import { FC } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  label: string;
  size?: 'small' | 'medium';
}

const SearchBar: FC<SearchBarProps> = function SearchBar({
  searchValue,
  setSearchValue,
  label,
  size,
}) {
  return (
    <div>
      <div>
        <TextField
          value={searchValue}
          fullWidth
          size={size || 'medium'}
          type="text"
          label={`Search ${label}`}
          variant="outlined"
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" fontSize={size === 'small' ? 'inherit' : 'large'} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                {searchValue !== '' ? (
                  <IconButton onClick={() => setSearchValue('')} size="small">
                    <ClearIcon color="primary" fontSize={size === 'small' ? 'inherit' : 'large'} />
                  </IconButton>
                ) : (
                  <div />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
