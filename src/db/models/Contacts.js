import {Schema, model} from "mongoose";

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
        enum: ['work', 'home', 'personal'],
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
