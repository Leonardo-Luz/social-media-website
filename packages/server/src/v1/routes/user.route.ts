import express, { Request, Response } from "express";
 
import controller from "../controllers/user.controller";

export const router = express.Router();

router.get('/', controller.getAllHandler);

router.get('/:id', controller.getByIdHandler);

router.post('/', controller.createHandler);

router.put('/:id', controller.updateHandler);

router.delete('/:id', controller.deleteHandler);