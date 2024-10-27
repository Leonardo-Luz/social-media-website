import { INTEGER, Model, Sequelize, STRING } from "sequelize";
import { database } from "../../config/database.config";
import { user } from "../types";


const sequelize = database.sequelize as Sequelize;

export interface userInterface extends Model<user>, 
user{}

export const userModel = sequelize.define<userInterface>(
    'users',
    {
        userId: {
            primaryKey: true,
            type: STRING,
        },
        name: {
            allowNull: false,
            type: STRING
        },
        age: {
            allowNull: false,
            type: INTEGER
        },
        username: {
            allowNull: false,
            type: STRING,
            unique: true
        },
        password: {
            allowNull: false,
            type: STRING
        },
    },
    {
        timestamps: true,
        deletedAt: false
    }
)