import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { service } from "../services/user.service"
import { user } from "../types"
import { DAO } from "./dao.controller"
import { userModel } from "../models/user.model";


class Controller implements DAO<user>{
    async getAllHandler(req: Request, res: Response): Promise<Response> {
        try{
            const response = await service.getAll( userModel );

            return res.status(200).json({
                users: response 
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
            const response = await service.getById( userModel, id );

            return response == null ?
                res.status(404).json({
                    message: 'User not found!'
                })
            :
                res.status(200).json({
                    user: response
                })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async createHandler(req: Request<any, any, { createElement: user; }>, res: Response): Promise<Response> {
        const { createElement } = req.body

        try{
            const response = await service.getById( userModel, createElement.userId);

            if(response !== null)
                return res.status(409).json({
                    message: "Conflict, User alredy exists!"
                })

            await service.create( userModel, {
                ...createElement,
                userId: uuidv4()
            } )

            return res.status(200).json({
                message: "User succefully created!"
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async updateHandler(req: Request<{}, {}, { updateElement: user; }>, res: Response): Promise<Response> {
        const { updateElement } = req.body

        try{
            const response = await service.getById( userModel, updateElement.userId );

            if(response !== null){
                response.name = updateElement.name
                response.age = updateElement.age
                response.username = updateElement.username
                response.password = updateElement.password

                await service.update( response )

                return res.status(200).json({
                    message: 'User succefully updated!'
                })
            }
            else
                return res.status(404).json({
                    message: 'User not found!'
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

            const response = await service.getById( userModel, id );

            if(response !== null){
                await service.delete( response );

                return res.status(200).json({
                    message: 'User succefully deleted!'
                })
            }
            else
            return res.status(404).json({
                message: 'User not found!'
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
