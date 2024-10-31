export const HealthCheck = () => 
    fetch(`${import.meta.env.VITE_API_URL}/health`, {
        method: 'GET'
    })