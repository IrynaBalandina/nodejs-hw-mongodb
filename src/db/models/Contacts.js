import {Schema, model} from "mongoose";
import { contactsTypeList } from "../../constants/contactsType.js";

const contactsSchema = new  Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: undefined,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: contactsTypeList,
        required: true,
        default: 'personal',
    },
},
{
    timestamps: true,
    createdAt: Date.now,
    updatedAt: Date.now,

}
);
const ContactsCollection= model("contact", contactsSchema);
export  {ContactsCollection};
