import { useMemo, useState } from 'react';
import { arraySort, arraySortByDate } from '../../utils';

const useTableDataSort = (data, config) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedData = useMemo(() => {
    if (Array.isArray(data)) {
      const sortableData = [...data];
      /* sort data if we have a config */
      if (sortConfig !== null) {
        if (sortConfig.key === 'news_added') {
          /* specific case for sort by date handling */
          arraySortByDate(sortableData, sortConfig.direction, sortConfig.key);
        } else {
          arraySort(sortableData, sortConfig.direction, sortConfig.key);
        }
      }
      return sortableData.map((item, idx) => {
        const thisItem = item;
        /* generate a sort/rank number for data items */
        if (idx > 0) {
          /* more than 1 item so rank calculation is required */
          const prevItem = sortableData[idx - 1];
          if (prevItem[sortConfig.key] === item[sortConfig.key]) {
            /* same value = same rank */
            thisItem.rank = prevItem.rank;
          } else if (sortConfig.direction === 'asc') {
            /* not the same score, and ascending */
            /* rank is current index - 1 */
            thisItem.rank = sortableData.length - idx;
          } else {
            /* not the same score, and descending */
            /* rank is current index + 1 */
            thisItem.rank = idx + 1;
          }
        } else if (sortConfig.direction === 'asc') {
          /* only 1 item and ascending - item takes the last ranking spot */
          thisItem.rank = sortableData.length;
        } else {
          /* only 1 item and descending - item takes the rank 1 spot */
          thisItem.rank = 1;
        }
        return thisItem;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return {
    sortedData,
    sortConfig,
    requestSort,
  };
};
export default useTableDataSort;
