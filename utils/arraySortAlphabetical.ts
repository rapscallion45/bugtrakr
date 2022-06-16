const arraySortAlphabetical = (array, sortKey) => {
  if (Array.isArray(array) && sortKey) {
    array.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });
  }
};
export default arraySortAlphabetical;
