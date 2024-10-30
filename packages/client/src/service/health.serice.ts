import { api } from "../utils/api";

export const HealthCheck = () => 
    fetch(`${api}/health`, {
        method: 'GET'
    })