import {Router} from "express";
import {getContactsController, getContactControllerById, createContactController, patchContactController, deleteContactController} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { contactsCreateSchema, contactsUpdateSchema} from "../validation/contactsSchema.js";
import { validateBody } from "../utils/validateBody.js";

const contactsRouter = Router();
contactsRouter.get("/", ctrlWrapper(getContactsController) );
contactsRouter.get("/:contactId", ctrlWrapper(getContactControllerById));
contactsRouter.post("/",validateBody(contactsCreateSchema), ctrlWrapper(createContactController));
contactsRouter.patch("/:contactId",validateBody(contactsUpdateSchema), ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactController));

export default contactsRouter;
