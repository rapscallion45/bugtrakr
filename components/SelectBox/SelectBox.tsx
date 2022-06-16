import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import useSelectBoxController from './SelectBoxController';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SelectBoxProps {
  disabled?: boolean;
  selectBoxTitle?: string;
  selectBoxName?: string;
  selectionValues?: any;
  initialValue?: any;
  onSelectUpdate?: (selectBox: any, selectBoxVal: any) => void;
  sortKey?: string;
}

const SelectBox: FC<SelectBoxProps> = function SelectBox({
  disabled,
  selectBoxTitle,
  selectBoxName,
  selectionValues,
  initialValue,
  onSelectUpdate,
  sortKey,
}) {
  const theme = useTheme();
  const { currentSelection, selectionData, onSelectChange, getValueLabel } = useSelectBoxController(
    selectBoxName,
    initialValue,
    selectionValues,
    onSelectUpdate,
    sortKey
  );

  const getStyles = (name, appTheme) => ({
    fontWeight:
      selectionData.indexOf(name) === -1
        ? appTheme.typography.fontWeightRegular
        : appTheme.typography.fontWeightMedium,
  });

  return (
    <FormControl
      variant="standard"
      disabled={disabled}
      sx={{ m: 1, width: '100%', maxWidth: '250px' }}
    >
      <InputLabel id={`select-${selectBoxName}`}>{selectBoxTitle}</InputLabel>
      <Select
        data-name={selectBoxName}
        value={[currentSelection]}
        labelId={`select-${selectBoxName}`}
        label={selectBoxTitle}
        onChange={onSelectChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) =>
              value !== '' ? (
                <Chip key={`value${selectBoxName}`} label={getValueLabel(value)} color="primary" />
              ) : (
                <Chip
                  key={`value-${selectBoxTitle}`}
                  label={`All ${selectBoxTitle}s`}
                  color="primary"
                />
              )
            )}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {selectionData.map((option) => (
          <MenuItem key={option.label} value={option.value} style={getStyles(option.value, theme)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectBox;
