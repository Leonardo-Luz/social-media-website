import express, { Request, Response } from "express";
 
import controller from "../controllers/message.controller";
import { service } from "../services/message.service";
import { messageModel } from "../models/message.model";

export const router = express.Router();

router.get('/', controller.getAllHandler);

router.get('/:id', controller.getByIdHandler);

router.post('/', controller.createHandler);

router.put('/:id', controller.updateHandler);

router.delete('/:id', controller.deleteHandler);

router.delete('/temp/all', ( req: Request, res: Response ) => {
    service.deleteAll( messageModel )
    
    return res.status(200).json({
        message: "All messages deleted!"
    })
})