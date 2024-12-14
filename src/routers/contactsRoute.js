import {Router} from "express";
import * as contactsController from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();
contactsRouter.get("/", ctrlWrapper(contactsController.getContactsController) );
contactsRouter.get("/:contactId", ctrlWrapper(contactsController.getContactControllerById));
contactsRouter.post("/", ctrlWrapper(contactsController.createContactController));


export default contactsRouter;
