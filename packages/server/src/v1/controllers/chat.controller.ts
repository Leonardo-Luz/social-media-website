import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid"

import { service } from "../services/chat.service"
import { chat } from "../types"
import { DAO } from "./dao.controller"
import { chatModel } from "../models/chat.model";


class Controller implements DAO<chat>{
    async getAllHandler(req: Request, res: Response): Promise<Response> {
        try{
            const response = await service.getAll( chatModel );

            return res.status(200).json({
                chats: response 
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
            const response = await service.getById( chatModel, id );

            return response == null ?
                res.status(404).json({
                    message: 'Chat not found!'
                })
            :
                res.status(200).json({
                    chat: response
                })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async createHandler(req: Request<any, any, { createElement: chat; }>, res: Response): Promise<Response> {
        const { createElement } = req.body

        try{
            const response = await service.getById( chatModel, createElement.chatId );

            if(response !== null)
                return res.status(409).json({
                    message: "Conflict, Chat alredy exists!"
                })

            await service.create( chatModel, {
                ...createElement,
                chatId: uuidv4()
            } )

            return res.status(200).json({
                message: "Chat succefully created!"
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async updateHandler(req: Request<{}, {}, { updateElement: chat; }>, res: Response): Promise<Response> {
        const { updateElement } = req.body

        try{
            const response = await service.getById( chatModel, updateElement.chatId );

            if(response !== null){
                response.title = updateElement.title

                await service.update( response )

                return res.status(200).json({
                    message: 'Chat succefully updated!'
                })
            }
            else
                return res.status(404).json({
                    message: 'Chat not found!'
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

            const response = await service.getById( chatModel, id );

            if(response !== null){
                await service.delete( response );

                return res.status(200).json({
                    message: 'Chat succefully deleted!'
                })
            }
            else
            return res.status(404).json({
                message: 'Chat not found!'
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
