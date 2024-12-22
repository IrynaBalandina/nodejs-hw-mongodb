import {Router} from "express";
import {getContactsController, getContactControllerById, createContactController, patchContactController, deleteContactController} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { contactsCreateSchema, contactsUpdateSchema} from "../validation/contactsSchema.js";
import { validateBody } from "../utils/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";


const contactsRouter = Router();
contactsRouter.get("/", ctrlWrapper(getContactsController) );
contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactControllerById));
contactsRouter.post("/",validateBody(contactsCreateSchema), ctrlWrapper(createContactController));
contactsRouter.patch("/:contactId", isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
