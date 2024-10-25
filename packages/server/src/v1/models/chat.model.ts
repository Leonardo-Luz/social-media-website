import { Model, Sequelize, STRING } from "sequelize";
import { database } from "../../config/database.config";
import { chat } from "../types";


const sequelize = database.sequelize as Sequelize;

export interface chatInterface extends Model<chat>, 
chat{}

export const chatModel = sequelize.define<chatInterface>(
    'chats',
    {
        chatId: {
            primaryKey: true,
            type: STRING,
        },
        title: {
            allowNull: false,
            type: STRING
        }
    },
    {
        timestamps: true,
        deletedAt: false
    }
)