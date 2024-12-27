export const calcPaginationData = ( page, perPage, count) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      page,
      perPage,
      totalItems: count,
      totalPages,
      hasNextPage,
      hasPrevPage,
    };
  };
