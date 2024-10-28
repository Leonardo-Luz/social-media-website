import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { service } from "../services/message.service"
import { message } from "../types"
import { DAO } from "./dao.controller"
import { messageModel } from "../models/message.model";


class Controller implements DAO<message>{
    async getAllHandler(req: Request, res: Response): Promise<Response> {
        try{
            const response = await service.getAll( messageModel );

            return res.status(200).json({
                messages: response 
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }        
    }

    async getByIdHandler(req: Request<{ id: string; }>, res: Response): Promise<Response> {
        const { id } = req.params

        try{
            const response = await service.getById( messageModel, id );

            return response == null ?
                res.status(404).json({
                    message: 'Message not found!'
                })
            :
                res.status(200).json({
                    message: response
                })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async createHandler(req: Request<any, any, { createElement: message; }>, res: Response): Promise<Response> {
        const { createElement } = req.body

        try{
            const response = await service.getById( messageModel, createElement.messageId);

            if(response !== null)
                return res.status(409).json({
                    message: "Conflict, Message alredy exists!"
                })

            const parsedMessage = {
                ...createElement,
                messageId: uuidv4()
            }

            await service.create( messageModel, parsedMessage )

            return res.status(200).json({
                message: "Message succefully created!",
                data: parsedMessage
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async updateHandler(req: Request<{}, {}, { updateElement: message; }>, res: Response): Promise<Response> {
        const { updateElement } = req.body

        try{
            const response = await service.getById( messageModel, updateElement.messageId );

            if(response !== null){
                response.text = updateElement.text

                await service.update( response )

                return res.status(200).json({
                    message: 'Message succefully updated!'
                })
            }
            else
                return res.status(404).json({
                    message: 'Message not found!'
                })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async deleteHandler(req: Request<{ id: string; }>, res: Response): Promise<Response> {
        const { id } = req.params

        try{

            const response = await service.getById( messageModel, id );

            if(response !== null){
                await service.delete( response );

                return res.status(200).json({
                    message: 'Message succefully deleted!'
                })
            }
            else
            return res.status(404).json({
                message: 'Message not found!'
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }
}

const controller = new Controller();

export default controller;
