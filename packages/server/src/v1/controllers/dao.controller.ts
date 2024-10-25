import express from "express";

export interface DAO<T>{
    getAllHandler( req: express.Request, res: express.Response ): Promise<express.Response>

    getByIdHandler( req: express.Request<{id: string}>, res: express.Response ): Promise<express.Response>

    createHandler( req: express.Request<{}, {}, { createElement: T }>, res: express.Response ): Promise<express.Response>

    updateHandler( req: express.Request<{}, {}, { updateElement: T }>, res: express.Response ): Promise<express.Response>

    deleteHandler( req: express.Request<{id: string}>, res: express.Response ): Promise<express.Response>
}