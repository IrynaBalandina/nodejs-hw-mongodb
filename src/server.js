import express from "express";
import cors from "cors";
import pino from "pino-http";
import dotenv from "dotenv";
import { getAllContacts, getContactById } from "./services/contacts.js";

dotenv.config();


export const setupServer = ()=>{
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
          },
        }),
      );


        app.get("/contacts", async(req, res, next)=>{
            const data = await getAllContacts();
            res.json({
                status: 200,
                 message: "Successfully found contacts!",
                data,
            });
        });


        app.get("/contacts/:contactId", async(req, res, next)=>{
            const  {contactId } = req.params;
            const data = await getContactById(contactId);
            res.json({
                status:200,
                message:`Successfully found contact with id= ${contactId}`,
                data,
            });
            if(!data){
                return res.status(404).json({
                     status:404,
                     message:"Contact not found",
                    });
                };
                });


        app.use((req, res)=>{
            res.status(404).json({
                message:`${req.url} is not found`
            });
        });

        app.use((error, res, req, next)=>{
            res.status(500).json({
                message:"Server error",
                error:error.message,
            });
        });
        const PORT = Number(process.env.PORT) || 3000;

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
          });
};



