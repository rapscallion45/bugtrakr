import { FC } from 'react';
import { styled } from '@mui/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import useSliderFilterController from './SliderFilterController';

const SliderFilterTitle = styled('div')(() => ({
  position: 'relative',
  top: '5px',
  overflow: 'hidden',
  marginLeft: '-10px',
}));

interface SliderFilterProps {
  disabled?: boolean;
  sliderName?: string;
  sliderLabel?: string;
  selectionValues?: any;
  initialValue?: any;
  minValue?: number;
  maxValue?: number;
  marks?: any;
  onSliderUpdate?: (filter: any, filterValue: any) => void;
}

const SliderFilter: FC<SliderFilterProps> = function SliderFilter({
  disabled,
  sliderName,
  sliderLabel,
  selectionValues,
  initialValue,
  minValue,
  maxValue,
  marks,
  onSliderUpdate,
}) {
  const { value, onSliderChange, onSliderChangeCommitted, valueLabelFormat } =
    useSliderFilterController(sliderName, initialValue, selectionValues, maxValue, onSliderUpdate);

  return (
    <Box sx={{ margin: '0 40px' }}>
      <SliderFilterTitle>
        <Typography sx={{ fontSize: '0.75rem', color: '#637381' }}>{sliderLabel}</Typography>
      </SliderFilterTitle>
      <Slider
        sx={{ minWidth: '150px' }}
        disabled={disabled}
        defaultValue={value}
        value={value}
        onChange={onSliderChange}
        onChangeCommitted={onSliderChangeCommitted}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={minValue}
        max={maxValue}
        valueLabelFormat={valueLabelFormat}
        name={sliderName}
        aria-label={sliderName}
        color="primary"
        size="small"
      />
    </Box>
  );
};
export default SliderFilter;
