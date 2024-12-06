import { Model, Sequelize, STRING, TEXT } from "sequelize";
import { database } from "../../config/database.config";
import { message } from "../types";
import { chatModel } from "./chat.model";
import { userModel } from "./user.model";


const sequelize = database.sequelize as Sequelize;

export interface messageInterface extends Model<message>, 
message{}

export const messageModel = sequelize.define<messageInterface>(
    'messages',
    {
        messageId: {
            primaryKey: true,
            type: STRING,
        },
        text: {
            allowNull: false,
            type: TEXT
        },
        userId: {
            allowNull: true,
            type: STRING,
            references: {
                key: "userId",
                model: userModel,
            }
        },
        chatId: {
            allowNull: true,
            type: STRING,
            references: {
                key: "chatId",
                model: chatModel,
            }
        }
    },
    {
        timestamps: true,
        deletedAt: false
    }
)

messageModel.hasOne(userModel, {
    foreignKey: "userId",
    sourceKey: "userId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})

messageModel.hasOne(chatModel, {
    foreignKey: "chatId",
    sourceKey: "chatId",
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
})