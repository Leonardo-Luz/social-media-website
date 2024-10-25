import { userInterface } from "../models/user.model";
import { user } from "../types";
import { DAO } from "./dao.service";

class Service extends DAO<userInterface, user>{}

export const service = new Service();