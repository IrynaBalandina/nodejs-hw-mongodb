import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import contactsRouter from "./routers/contactsRoute.js";
import {logger} from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();


export const setupServer = ()=>{
    const app = express();

    app.use(cors());

   app.use(express.json());

    app.use(logger);

    app.use("/contacts", contactsRouter);


        app.use(notFoundHandler);

        app.use(errorHandler);
        const PORT = Number(process.env.PORT) || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
          });
};



