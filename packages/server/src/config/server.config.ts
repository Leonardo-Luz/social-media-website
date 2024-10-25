import express, { Application } from "express"

import { port } from "../utils";
import { database } from "./database.config";

import { errorHandler, logger, rules } from "../v1/middlewares";
import { chatRouter, healthRouter, messageRouter, userRouter } from "../v1/routes";


export class Server{
    private app: Application;

    constructor(){
        this.app = express();

        this.databaseSync();

        this.middlewares();

        this.app.use(rules);

        this.routes();

        this.app.use(errorHandler);
    }

    private routes = () => {
        this.app.use('/api/v1/health', healthRouter);
        this.app.use('/api/v1/users', userRouter);
        this.app.use('/api/v1/messages', messageRouter);
        this.app.use('/api/v1/chats', chatRouter);
    }

    private middlewares = () => {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        this.app.use(logger);
    }

    private databaseSync = () => {
        database.sequelize?.sync();
    }

    public start = () => {
        this.app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        })
    }
}