import { FC } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useToggleButtonsController from './ToggleButtonsController';

interface ToggleButtonsProps {
  initialValue?: any;
  options?: any[];
  exclusive?: boolean;
  onUpdate?: () => void;
}

const ToggleButtons: FC<ToggleButtonsProps> = function ToggleButtons({
  initialValue,
  options = [],
  exclusive,
  onUpdate,
}) {
  const { value, handleChange } = useToggleButtonsController(initialValue, onUpdate);

  return (
    <ToggleButtonGroup color="primary" value={value} exclusive={exclusive} onChange={handleChange}>
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default ToggleButtons;
