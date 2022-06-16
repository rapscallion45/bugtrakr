const useSearchBoxController = (onChange) => {
  function onSearchChange(event, value) {
    /* callback with latest selected item */
    onChange(value);
  }

  return { onSearchChange };
};
export default useSearchBoxController;
