import express, { Request, Response } from "express";
 
import controller from "../controllers/user.controller";
import { authantication } from "../middlewares/auth.middleware";

export const router = express.Router();

router.get('/', controller.getAllHandler);

router.get('/:id', controller.getByIdHandler);

router.post('/', controller.createHandler);

router.put('/:id', controller.updateHandler);

router.delete('/:id', controller.deleteHandler);


router.post('/login', controller.authenticateUserHandler)

// dont need to pass id param, can just get from payload...
router.delete('/self/:id', authantication ,controller.selfDeleteHandler);

router.post('/authenticated', authantication, controller.isAuthenticated)