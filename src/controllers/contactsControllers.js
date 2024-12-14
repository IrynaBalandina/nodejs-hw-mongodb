

import {getAllContacts, getContactById} from "../services/contacts.js";
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
