const arraySortByDate = (array, direction, sortKey) => {
  if (Array.isArray(array) && sortKey) {
    array.sort((a, b) => {
      if (new Date(a[sortKey]) < new Date(b[sortKey])) {
        return direction === 'asc' ? -1 : 1;
      }
      if (new Date(a[sortKey]) > new Date(b[sortKey])) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
};
export default arraySortByDate;
