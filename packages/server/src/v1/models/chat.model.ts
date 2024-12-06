import { Model, Sequelize, STRING } from "sequelize";
import { database } from "../../config/database.config";
import { chat } from "../types";
import { userModel } from "./user.model";


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
        },
        adminId: {
            allowNull: false,
            type: STRING,
            references: {
                model: userModel,
                key: "userId"
            }
        }
    },
    {
        timestamps: true,
        deletedAt: false
    }
)

chatModel.belongsToMany(userModel, {
    through: "Chat_User",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

userModel.belongsToMany(chatModel, {
    through: "Chat_User",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

chatModel.hasMany(userModel, {
    foreignKey: "userId",
    sourceKey: "adminId",
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION"
})
