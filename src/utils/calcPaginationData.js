
export const calcPaginationData = ({total, page, perPage})=>{
const totalPages = Math.ceil(total/perPage);
const hasNextPage = Boolean(totalPages - page);
const hasPrevPage = page !== 1;
return {
    page,
    perPage,
    totalPages,
     hasNextPage,
     hasPrevPage,
};
};
