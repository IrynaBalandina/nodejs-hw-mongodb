const parseIsFavourite = (value)=>{
const stringBoolean = typeof value === "string";
if(!stringBoolean) return;
if(value.toLowerCase() === "true") return true;
if(value.toUpperCase() === "false") return false;
return;
};

const parseType = (contactType) =>{
    const isString = typeof contactType === 'string';
if(!isString) return;
const isContactType = (contactType) => ['home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};
export const parseContactFilterParams = (query) =>{

const {isFavourite, contactType} = query;
const parsedIsFavourite = parseIsFavourite(isFavourite);
const parsedType = parseType(contactType);

return{
contactType:parsedType,
isFavourite:parsedIsFavourite,
};
};
