import { Server } from "./config/server.config";

const server = new Server()

server.start()
server.webSocketStart()