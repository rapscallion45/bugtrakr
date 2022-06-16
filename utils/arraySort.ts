const arraySort = (array, direction, sortKey) => {
  if (Array.isArray(array) && sortKey) {
    array.sort((a, b) => {
      if (parseFloat(a[sortKey], 10) < parseFloat(b[sortKey], 10)) {
        return direction === 'asc' ? -1 : 1;
      }
      if (parseFloat(a[sortKey], 10) > parseFloat(b[sortKey], 10)) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
};
export default arraySort;
