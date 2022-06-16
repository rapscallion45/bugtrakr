import { useEffect, useState } from 'react';
import { arraySortAlphabetical } from '../../utils';

const useSelectBoxController = (selectBoxName, initialValue, data, onChange, sortKey) => {
  const [currentSelection, setCurrentSelection] = useState(initialValue);
  const selectionData = data;
  arraySortAlphabetical(selectionData, sortKey);

  const getItem = (value) => 
    /* get selected item's data */
     data.find((option) => {
      const comp = typeof option.value === 'number' ? parseInt(value, 10) : value;
      if (comp === option.value) {
        return option;
      }
      return null;
    })
  ;

  useEffect(() => {
    /* if an intial value is provided, callback to perform initial data filtering */
    if (initialValue) {
      /* callback with latest selected item and selection key name */
      onChange(selectBoxName, getItem(initialValue));
    }
  }, []);

  const onSelectChange = (event) => {
    /* update select box value to the selected item */
    setCurrentSelection(event.target.value);

    /* callback with latest selected item and selection key name */
    onChange(selectBoxName, getItem(event.target.value));
  };

  const getValueLabel = (value) => selectionData.find((option) => option.value === value)?.label;

  return {
    currentSelection,
    selectionData,
    onSelectChange,
    getValueLabel,
  };
};
export default useSelectBoxController;
