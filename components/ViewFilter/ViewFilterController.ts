import { useEffect, useState } from 'react';

const useViewFilterController = (
  viewFilterName,
  selectionData,
  onViewFilterChange,
  initialSelection
) => {
  const singleSelection = selectionData.length === 1;
  const initialSelectionVal = initialSelection ? selectionData[initialSelection].value : '';
  const initialValue = singleSelection ? selectionData[0].value : initialSelectionVal;
  const [viewVal, setViewVal] = useState({
    [viewFilterName]: initialValue,
  });
  const selectionDisabled = singleSelection;

  /* on first mount, callback with initial value if set */
  useEffect(() => {
    onViewFilterChange(viewVal);
  }, []);

  useEffect(() => {
    onViewFilterChange(viewVal);
  }, [viewVal]);

  const onViewChange = (viewFilter, viewFilterValue) => {
    if (viewFilterValue) {
      setViewVal({
        ...viewVal,
        [viewFilter]: viewFilterValue.value,
      });
    } else {
      setViewVal({
        ...viewVal,
        [viewFilter]: '',
      });
    }
  };

  return {
    selectionDisabled,
    initialValue,
    onViewChange,
  };
};
export default useViewFilterController;
