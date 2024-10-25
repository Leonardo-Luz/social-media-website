import { chatInterface } from "../models/chat.model";
import { chat } from "../types";
import { DAO } from "./dao.service";

class Service extends DAO<chatInterface, chat>{}

export const service = new Service();