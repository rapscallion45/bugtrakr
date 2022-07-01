const arraySort = (array, direction, sortKey) => {
  if (Array.isArray(array) && sortKey) {
    array.sort((a, b) => {
      if (parseFloat(a[sortKey]) < parseFloat(b[sortKey])) {
        return direction === 'asc' ? -1 : 1;
      }
      if (parseFloat(a[sortKey]) > parseFloat(b[sortKey])) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
};
export default arraySort;
