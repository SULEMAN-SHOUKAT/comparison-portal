import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const initParams = (pageSize: number, page: number) => ({
  pageSize: pageSize.toString(),
  page: page.toString(),
});

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams(
    initParams(pageSize, page)
  );

  const onPageChange = (val: number) => {
    setPage(val);
    setSearchParams(initParams(pageSize, val));
  };
  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") as string, 10);
    const currentpageSize = parseInt(
      searchParams.get("pageSize") as string,
      10
    );
    setPage(currentPage);
    setPageSize(currentpageSize);
    setSearchParams(initParams(currentpageSize, currentPage));
  }, []);

  return {
    page,
    pageSize,
    onPageChange,
  };
};

export default usePagination;
