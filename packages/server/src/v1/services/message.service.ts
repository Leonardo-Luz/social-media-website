import { ModelStatic } from "sequelize";
import { messageInterface } from "../models/message.model";
import { message } from "../types";
import { DAO } from "./dao.service";

class Service extends DAO<messageInterface, message>{
    deleteAll( model: ModelStatic<messageInterface> ){
        model.destroy({ truncate: true })
    }
}

export const service = new Service();