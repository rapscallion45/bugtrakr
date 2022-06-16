import { useEffect, useState } from 'react';

const usePagination = (data, itemsPerPage, startPage = 0) => {
  const [currentPage, setCurrentPage] = useState(startPage);
  const maxPage = data ? Math.ceil(data.length / itemsPerPage) : 0;

  useEffect(() => {
    /* if data length changes, i.e. filtered applied, return to first page */
    setCurrentPage(startPage);
  }, [maxPage]);

  const currentPageData = () => {
    const begin = currentPage * itemsPerPage;
    const end = begin + itemsPerPage;
    return data?.slice(begin, end);
  };

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const jumpPage = (page) => {
    const pageNumber = Math.max(0, page);
    setCurrentPage(Math.min(pageNumber, maxPage));
  };

  return { nextPage, prevPage, jumpPage, currentPageData, currentPage, maxPage };
};
export default usePagination;
