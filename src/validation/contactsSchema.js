import Joi from "joi";
import { contactsTypeList } from "../constants/contactsType.js";

export const contactsCreateSchema = Joi.object({
    name:Joi.string().min(3).max(30).required().messages({
        "nameMin":"Name should have at least 3 characters",
        "nameMax":"Name should have at most 20 characters",

    }),
    phoneNumber: Joi.string().min(3).max(20).required()
    .messages({
        "numberMin":"PhoneNumber should have at least 3 characters",
        "numberMax" :"PhoneNumber should have at most 20 characters",
    }),
    email:Joi.string().email().optional().required().messages({
        mailError:"Email must be a valid email address!",
    }),
    isFavorite:Joi.boolean().required().messages({
        messageBoolean:"This field must be true or false",
    }),
    contactType:Joi.string().valid(...contactsTypeList),
});

export const contactsUpdateSchema = Joi.object({
    name:Joi.string().min(3).max(30).messages({
        "nameMin":"Name should have at least 3 characters",
        "nameMax":"Name should have at most 20 characters",

    }),
    phoneNumber: Joi.string().min(3).max(20)
    .messages({
        "numberMin":"PhoneNumber should have at least 3 characters",
        "numberMax" :"PhoneNumber should have at most 20 characters",
    }),
    email:Joi.string().email().optional().messages({
        mailError:"Email must be a valid email address!",
    }),
    isFavorite:Joi.boolean().messages({
        messageBoolean:"This field must be true or false",
    }),
    contactType:Joi.string().valid(...contactsTypeList),
});