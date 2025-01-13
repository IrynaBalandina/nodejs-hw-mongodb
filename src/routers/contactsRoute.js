import {Router} from "express";
import {getContactsController, getContactControllerById, createContactController, patchContactController, deleteContactController} from "../controllers/contactsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { contactsCreateSchema, contactsUpdateSchema} from "../validation/contactsSchema.js";
import { validateBody } from "../utils/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import {upload} from "../middlewares/multer.js";


const contactsRouter = Router();
contactsRouter.use(authenticate);
contactsRouter.get("/", ctrlWrapper(getContactsController) );
contactsRouter.get("/:contactId", isValidId, ctrlWrapper(getContactControllerById));
contactsRouter.post("/",upload.single("photo"), validateBody(contactsCreateSchema), ctrlWrapper(createContactController));
contactsRouter.patch("/:contactId",upload.single("photo"),  isValidId, validateBody(contactsUpdateSchema), ctrlWrapper(patchContactController));
contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
