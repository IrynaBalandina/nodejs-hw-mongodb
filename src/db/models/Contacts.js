import {Schema, model} from "mongoose";
import { contactsTypeList } from "../../constants/contactsType.js";



const contactsSchema = new Schema(
    {
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
      },
      isFavourite: {
        type: Boolean,
        default: true,
        required: true,
      },
      contactType: {
        type: String,
        required: true,
        enum: contactsTypeList,
        default: 'personal',
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );


export  const sortByList = ["_id","name", "phoneNumber", "email", "isFavourite", "contactType"];
const ContactsCollection= model("contacts", contactsSchema);
export default ContactsCollection;
