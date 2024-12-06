import { Model, Sequelize, STRING, TEXT } from "sequelize";
import { database } from "../../config/database.config";
import { message } from "../types";
import { chatModel } from "./chat.model";
import { userModel } from "./user.model";


const sequelize = database.sequelize as Sequelize;

export interface messageInterface extends Model<message>,
    message { }

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
        },
        chatId: {
            allowNull: true,
            type: STRING,
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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
})

messageModel.hasOne(chatModel, {
    foreignKey: "chatId",
    sourceKey: "chatId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    hooks: true
})
