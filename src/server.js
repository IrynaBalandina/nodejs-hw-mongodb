import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import contactsRouter from "./routers/contactsRoute.js";
 import {logger} from "./middlewares/logger.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routers/auth.js";
// import { UPLOAD_DIR } from "./constants/index.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

dotenv.config();


export const setupServer = ()=>{
    const app = express();
    const { serve, setup } = swaggerDocs();
    app.use(cors());

    app.use(express.json());
    // app.use('/uploads', express.static(UPLOAD_DIR));
    app.use(express.static("uploads"));
    app.use('/api-docs', serve, setup);;
    app.use(cookieParser());
     app.use(logger);

    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);


        app.use(notFoundHandler);

        app.use(errorHandler);
        const PORT = Number(process.env.PORT) || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
          });
};



