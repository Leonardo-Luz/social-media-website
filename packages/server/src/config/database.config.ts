import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as unknown as string;

    private MONGODB_URL = process.env.MONGODB_URL as unknown as string;

    private MYSQL_DB = process.env.MYSQL_DB as string;
    private MYSQL_HOST = process.env.MYSQL_HOST as string;
    private MYSQL_USER = process.env.MYSQL_USER as string;
    private MYSQL_PASSWORD = process.env.MYSQL_PASSWORD as unknown as string;

    constructor() {
        this.connectToPostgres();
    }

    private async connectToMongoDB() {
        mongoose.connect(this.MONGODB_URL)
            .then(() => console.log('database connected!'))
            .catch(err => console.error('unable to connect to database', err));
    }

    private async connectToMySQL() {
        this.sequelize = new Sequelize({
            database: this.MYSQL_DB,
            username: this.MYSQL_USER,
            password: this.MYSQL_PASSWORD,
            host: this.MYSQL_HOST,
            dialect: 'mysql',
            logging: false
        })

        await this.sequelize.authenticate()
            .then(() => console.log('database connected!'))
            .catch(err => console.error('unable to connect to database', err));
    }

    private async connectToPostgres() {
        this.sequelize = new Sequelize({
            database: this.POSTGRES_DB,
            username: this.POSTGRES_USER,
            password: this.POSTGRES_PASSWORD,
            host: this.POSTGRES_HOST,
            port: this.POSTGRES_PORT,
            dialect: 'postgres',
            logging: false
        });

        await this.sequelize.authenticate()
            .then(() => console.log('database connected!'))
            .catch(err => console.error('unable to connect to database', err));
    }
}

export const database = new Database();
