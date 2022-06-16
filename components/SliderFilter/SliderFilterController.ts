import { useEffect, useState } from 'react';

const useSliderFilterController = (
  sliderName,
  initialValue,
  selectionValues,
  maxValue,
  onChange
) => {
  const [value, setValue] = useState(initialValue || maxValue);

  useEffect(() => {
    /* if an intial value is provided, callback to perform initial data filtering */
    if (initialValue) onChange(sliderName, initialValue);
  }, []);

  const onSliderChange = (event, newValue) => {
    /* update slider to new value */
    setValue(newValue);
  };

  const onSliderChangeCommitted = (event, newValue) => {
    /* update slider to new value */
    setValue(newValue);
    /* as we've got a mouseup event, get selected slider item's data */
    const selectedItem = selectionValues.find((option) => option.value === newValue);
    /* callback with latest selected item data and slider name */
    onChange(sliderName, selectedItem);
  };

  const valueLabelFormat = (ariaValue) => `${selectionValues.find((option) => option.value === ariaValue).label}`;

  return { value, onSliderChange, onSliderChangeCommitted, valueLabelFormat };
};
export default useSliderFilterController;
