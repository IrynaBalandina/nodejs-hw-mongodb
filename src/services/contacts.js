import { ContactsCollection } from "../db/models/Contacts.js";

export const getAllContacts = ()=>ContactsCollection.find();
export const getContactById = contactId=>ContactsCollection.findById(contactId);
export const createContact = payload =>ContactsCollection.create(payload);

export const  patchContacts = async(contactId, payload, options = {}) =>{
  const {upsert = false} = options;
const result  = await ContactsCollection.findOneAndUpdate(
  { _id: contactId },
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

export const deleteContact = filter =>ContactsCollection.findOneAndDelete(filter);
