
import mongoose from "mongoose";
import {createContact, getAllContacts, getContactById, patchContacts, deleteContact} from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { sortByList } from "../db/models/Contacts.js";
import { parseContactFilterParams } from "../utils/filters/parseContactFilterParams.js";
import {saveFileToCloudinary} from "../utils/saveFileToCloudinary.js";
 import {saveFileToUploadDir} from "../utils/saveFileToUploadDir.js";

 import dotenv from 'dotenv';
dotenv.config();

export const getContactsController = async(req, res, next)=>{
  const {page, perPage}= parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query, sortByList);
  const filter = {...parseContactFilterParams(req.query), userId: req.user._id, };

    const contacts = await getAllContacts({page, perPage, sortBy, sortOrder, filter,  userId: req.user._id});
    res.json({
        status: 200,
         message: "Successfully found contacts!",
       data:contacts,

    });
};

export const getContactControllerById = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);
    if (!contact) {
        throw createHttpError(404,`Contact with id ${contactId} not found`);

      }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data:contact,
    });
  };

  export const createContactController = async (req, res) => {
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (process.env.ENABLE_CLOUDINARY === "true") {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const contact = await createContact({ ...req.body, userId, photo: photoUrl });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  };



  export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return next(createHttpError(400, 'Invalid contactId'));
    }

    if (photo) {
      if (process.env.ENABLE_CLOUDINARY === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const result = await patchContacts(
      contactId,
      { userId, ...req.body, photo: photoUrl },
      { new: true },
    );
    if (!result) {
      next(createHttpError(404, 'Contact not found'));
      return;
    }
    res.json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result.contact,
    });
  };

  export const deleteContactController = async(req,res, next)=>{
    const userId = req.user._id;
    const { contactId } = req.params;
    const data = await deleteContact(contactId, userId);
    if(!data) {
      throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.status(204).send();
  };

