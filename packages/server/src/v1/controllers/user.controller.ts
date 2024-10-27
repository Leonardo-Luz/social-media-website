import { Request, response, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";

import { service } from "../services/user.service"
import { user } from "../types"
import { DAO } from "./dao.controller"
import { userModel } from "../models/user.model";

class Controller implements DAO<user>{
    async getAllHandler(req: Request, res: Response): Promise<Response> {
        try{
            const response = await service.getAll( userModel );

            response.forEach( data => data.password = '_' )

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

            if(response == null)
                return res.status(404).json({
                    message: 'User not found!'
                })
            else{
                response.password = '_';

                return res.status(200).json({
                    user: response
                })
            }
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async createHandler(req: Request<any, any, { createElement: user; }>, res: Response): Promise<Response> {
        const createElement = {
            ...req.body.createElement,
            password: await bycript.hash(req.body.createElement.password, 10)
        }

        try{
            const response = await service.getByUsername( userModel, createElement.username);

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

    // should use payload to verify authentication
    async updateHandler(req: Request<{}, {}, { updateElement: user; }>, res: Response): Promise<Response> {
        const { updateElement } = req.body

        const usernameTaken = await service.getByUsername( userModel, updateElement.username )

        if(usernameTaken && usernameTaken.userId !== updateElement.userId)
            return res.status(409).json({
                message: 'Conflict, Username alredy taken!'
            })

        try{
            const response = await service.getById( userModel, updateElement.userId );

            if(response !== null){
                response.name       = updateElement.name
                response.age        = updateElement.age
                response.username   = updateElement.username
                response.password   = updateElement.password

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

    async selfDeleteHandler( req: Request<{ id: string; }>, res: Response ): Promise<Response> {
        const { id } = req.params

        const payload = res.locals.payload

        try{
            if(id != payload.userId)
                return res.status(401).json({
                    message: 'User unauthorized!'
                })

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

    async deleteHandler( req: Request<{ id: string; }>, res: Response ): Promise<Response> {
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

    async authenticateUserHandler( req: Request<{}, {}, {user: user}>, res: Response ): Promise<Response> {
        const { username, password } = req.body.user

        try{
            const user = await service.getByUsername( userModel, username );

            if(!user || !(await bycript.compare(password, user.password)))
                return res.status(401).json({
                    message: 'Invalid password or username!'
                })
            
            const token = jwt.sign({
                id: user.userId
            },
            process.env.JWT_PASS!, {
                expiresIn: '1d'
            })

            const authenticatedUser = {
                ...user.dataValues,
                password: '_'
            }

            return res.status(200).json({
                message: 'User succefully authenticated!',
                data: {
                    user: authenticatedUser,
                    token: token
                }
            })
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                message: "Server Error!"
            })
        }
    }

    async isAuthenticated( req: Request, res: Response ): Promise<Response> {
        return res.status(200).json({
            message: 'Authenticated'
        })
    }
}

const controller = new Controller();

export default controller;
