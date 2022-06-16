import { useState } from 'react';

const useToggleButtonGroupController = (intialValue, onUpdate) => {
  const [value, setValue] = useState(intialValue);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      if (onUpdate) onUpdate(newValue);
    }
  };

  return {
    value,
    handleChange,
  };
};
export default useToggleButtonGroupController;
