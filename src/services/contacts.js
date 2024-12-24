import { ContactsCollection } from "../db/models/Contacts.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";


export const getAllContacts = async({
  page = 1,
   perPage = 10,
    sortBy = "_id",
     sortOrder = "asc",
     filter,
    })=>{
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactsQuery = ContactsCollection.find();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder}).exec();
    const totalContacts = await ContactsCollection.find().merge(contactsQuery).countDocuments();


    if(filter.contactType){
      contactsQuery.where("contactType").equals(filter.contactType);
    }
    if(filter.isFavourite){
      contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const paginationData = calcPaginationData({page, perPage, totalContacts});
    return {

     data:contacts,

    ...paginationData,

  };
};

export const getContactById = async(contactId)=>{

    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async(payload )=>{
  const contact = await  ContactsCollection.create(payload);
  return contact;
};

export const  patchContacts = async(contactId, payload, options = {}) =>{
  const {upsert = false} = options;
const result  = await ContactsCollection.findOneAndUpdate(
    {_id:contactId},
     payload,
      {
    new:true,
    upsert,
    includeResultMetadata: true,

}
);
if(!result || !result.value) return null;
const isNew = Boolean(result.lastErrorObject.upserted);
return {
    isNew,
    data: result.value,
};
};

export const deleteContact = async(contactId) =>{
    const contact = await ContactsCollection.findOneAndDelete({_id: contactId});
    return contact;
};
