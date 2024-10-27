import { ReactNode } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const Protected = ( {children}: {children: ReactNode} ) => {

    const location = useLocation()
    const { isLogged } = useAuth()

    return isLogged() ?
        <>{children}</>
    :
        <Navigate to='/login' state={{from : location}} replace/>
}