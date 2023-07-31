const defaultValues =  {
  'x-pagination-limit': 1, // number of rows per page
  'x-pagination-index': 1, // current page number
  'x-pagination-page-count': 1, // number of pages available for this query
  'x-pagination-total-count': 1, // total rows regardless of 1eries
};

export const fromResponseHeaders = (headers = defaultValues) => {
  const {
    'x-pagination-limit': page_limit, // number of rows per page
    'x-pagination-index': page_index, // current page number
    'x-pagination-page-count': page_count, // number of pages available for this query
    'x-pagination-total-count': total_count, // total rows regardless of queries
  } = headers;
  return {
    page_limit,
    page_index,
    page_count,
    total_count,
  };
};
