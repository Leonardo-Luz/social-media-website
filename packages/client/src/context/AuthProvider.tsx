import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { user } from "../types";
import { useNavigate } from "react-router-dom";
import { userService } from "../service/user.service";


type userContext = {
    user:           user | null,
    token:          string | null,
    registerUser:   ( newUser: user ) => Promise<void>;
    loginUser:      ( login: string , password: string ) => void,
    updateUser:     ( updatedUser: user ) => Promise<void>;
    deleteUser:     ( password: string ) => Promise<void>;
    logout:         () => void,
    isAuth:         () => void,
    isLogged:       () => boolean // need to fetch authentication / verify on backend ?
}

type authData = {
    user:   user | null,
    token:  string | null
}

const AuthContext = createContext<userContext>({} as userContext);

export const AuthProvider = ( {children}: {children: ReactNode} ) => {

    const navigate = useNavigate();
    
    const [ token, setToken ] = useState<string | null>(null)
    const [ user, setUser ] = useState<user | null>(null)
    const [ status, setStatus ] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if(user && token){
            setUser(JSON.parse(user))
            setToken(token)
        }
        else logout()

        setStatus(true)
    }, [])

    const registerUser = async ( newUser: user ) => {
        const response = await userService.create( newUser )

        switch(response.status){
            case 200:
                alert('User succefully created!')
                navigate('/')
                break;
            case 409:
                alert('Login alredy taken!')
                break;
            default:
                alert(`Error! Code ${(await response).status}`)
        }
    }

    const loginUser = async ( username: string, password: string ) => {

        const response = await userService.login( username, password )

        const json = (await response.json())

        if(!json.data){
            alert('Login or Password invalid!')
            return;
        }
            
        const data = json.data as authData

        if(!data.user){
            alert('Login or Password invalid!')
            return;
        }

        localStorage.setItem('token', data.token!)

        const userStored = {
            ...data.user,
            password: '_'
        } as user

        localStorage.setItem('user', JSON.stringify(userStored))

        setToken(data.token)
        setUser(data.user)

        alert('User logged succefully')

        navigate('/')
    }

    const updateUser = async ( updatedUser: user ) => {
        const response = await userService.update( user!.userId!, {...updatedUser, userId: user!.userId!} )

        const json = (await response.json())

        console.log(json);
        
        // Shouldn't use status code for validation ? 
        switch(response.status){
            case 200:
                alert('User succefully updated!')
                break;
            default:
                alert('Error on user update!')
        }

        logout()
    }

    const deleteUser = async ( ) => {
        const response = await userService.selfDelete( user!.userId!, token! )

        const data = (await response.json())

        switch(response.status){
            case 200:
                alert('User succefully deleted!')
                logout()
                break;
            default:
                alert('Error on user delete!\n' + data.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken(null)

        navigate('/')
    }

    const isAuth = async () => {
        const response = await userService.isAuthenticated( token! )

        const message = (await response.json()).message

        console.log(response);
        console.log(message);
        
        if(message != 'Authenticated'){
            alert('Session expired')
            logout()
        }
    }

    useEffect(() => {
        if(token)
        isAuth()
    }, [token])

    const isLogged = () => !!user

    return <AuthContext.Provider value={{
        deleteUser,
        isLogged,
        loginUser,
        logout,
        registerUser,
        updateUser,
        isAuth,
        token,
        user,
    }}>
    {
        status ? 
            children
        :
            null
    }
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)