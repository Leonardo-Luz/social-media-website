import { api } from "../utils/server";

export const HealthCheck = () => 
    fetch(`${api}/health`, {
        method: 'GET'
    })