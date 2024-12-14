

import {createContact, getAllContacts, getContactById, patchContacts, deleteContact} from "../services/contacts.js";
import createError from "http-errors";


export const getContactsController = async(req, res, next)=>{
    const data = await getAllContacts();
    res.json({
        status: 200,
         message: "Successfully found contacts!",
        data,
    });
};

export const getContactControllerById = async (req, res, next) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
        throw createError(404,`Contact with id ${contactId} not found`);

      }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  };

  export const createContactController = async (req, res) => {
    const data = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  };

  export const patchContactController = async(req, res) =>{
    const { contactId } = req.params;
    const result = await patchContacts(contactId,req.body);

    if(!result){
      throw createError(404, `Contact with id= ${contactId} not found`);
    }
    res.json({
      status:200,
      message: "Successfully upsert contact",
      data:result.data,
  });
  };

  export const deleteContactController = async(req,res, next)=>{
    const { contactId } = req.params;
    const data = await deleteContact({_id:contactId});
    if(!data) {
      throw createError(404, `Contact with id=${contactId} not found`);
  }

  res.status(204).send();
  };
