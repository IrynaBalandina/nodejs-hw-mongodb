
const parseNumber = (number, defaulValue)=>{
if(typeof number !== "string") return defaulValue;
const parsedNumber = parseInt(number);
if(Number.isNaN(parseNumber)) return defaulValue;
return parsedNumber;
};

export const parsePaginationParams = ({page, perPage}) =>{
const parsedPage = parseNumber(page, 1);
const parsedPerPage = parseNumber(perPage, 10);
return {
    page:parsedPage,
    perPage:parsedPerPage
};
};
