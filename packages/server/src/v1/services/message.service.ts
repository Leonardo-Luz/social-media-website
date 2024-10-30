import { ModelStatic } from "sequelize";
import { messageInterface } from "../models/message.model";
import { message } from "../types";
import { DAO } from "./dao.service";
import { userModel } from "../models/user.model";

class Service extends DAO<messageInterface, message>{
    public deleteAll = async ( model: ModelStatic<messageInterface> ) => 
        model.destroy({ truncate: true })
    
    public getAll = async ( model: ModelStatic<messageInterface> ) =>
        model.findAll({
            include: [{
                model: userModel,
                required: true
            }]
        })
}

export const service = new Service();