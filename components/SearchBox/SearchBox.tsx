import { FC } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useSearchBoxController from './SearchBoxController';

interface SearchBoxProps {
  selectionItems?: any;
  placeholderText?: string;
  onChange?: () => void;
  optionRenderer?: (props: any, option: any) => void;
}

const SearchBox: FC<SearchBoxProps> = function SearchBox({
  selectionItems,
  placeholderText,
  onChange,
  optionRenderer,
}) {
  const { onSearchChange } = useSearchBoxController(onChange);

  return (
    <Autocomplete
      id="search-select"
      sx={{ width: 300 }}
      options={selectionItems}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => optionRenderer(props, option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={placeholderText}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
      onChange={onSearchChange}
    />
  );
};
export default SearchBox;
