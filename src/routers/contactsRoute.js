import {Router} from "express";
import {getContactsController, getContactControllerById, createContactController, patchContactController, deleteContactController} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();
contactsRouter.get("/", ctrlWrapper(getContactsController) );
contactsRouter.get("/:contactId", ctrlWrapper(getContactControllerById));
contactsRouter.post("/", ctrlWrapper(createContactController));
contactsRouter.patch("/:contactId", ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController));

export default contactsRouter;
