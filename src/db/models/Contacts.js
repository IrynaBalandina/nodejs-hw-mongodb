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
        required:true,
        default: false,
    },
    contactType: {
        type: String,
        enum: contactsTypeList,
        required: true,
        default: 'personal',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey:false, timestamps: true});

export  const sortByList = ["_id","name", "phoneNumber", "email", "isFavourite", "contactType"];
const ContactsCollection= model("contact", contactsSchema);
export default ContactsCollection;
