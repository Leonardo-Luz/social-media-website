import { ReactNode, useEffect, useState } from "react";
import { HealthCheck } from "../service/health.serice";


export const Health = ( {children}: {children: ReactNode} ) => {
    const [ situation, setSituation ] = useState(false)

    const healthCheckHandler = async () => {
        const response = await HealthCheck()
    
        const data = (await response.json()).message

        setSituation(data === 'OK')
    }

    useEffect(() => {
        healthCheckHandler()
    }, [])

    return situation ?
        <>{children}</>
    :
        <div className="basic-body">
            <div className="basic-container">
                <p>Server Error</p>
                <p>Contact an admin</p>
            </div>
        </div>
}