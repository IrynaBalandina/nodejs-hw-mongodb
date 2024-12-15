import { ContactsCollection } from "../db/models/Contacts.js";

export const getAllContacts = async()=>{
    const contacts = await ContactsCollection.find();
    return contacts;
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
