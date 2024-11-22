import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { user } from "../types";
import { useNavigate } from "react-router-dom";
import { userService } from "../service/user.service";
import { Modal } from "../components/common/Modal";


type userContext = {
    user: user | null,
    token: string | null,
    registerUser: (newUser: user) => Promise<void>;
    loginUser: (login: string, password: string) => void,
    updateUser: (updatedUser: user) => Promise<void>;
    deleteUser: (password: string) => Promise<void>;
    logout: () => void,
    isAuth: () => void,
    isLogged: () => boolean // need to fetch authentication / verify on backend ?
}

type authData = {
    user: user | null,
    token: string | null
}

const AuthContext = createContext<userContext>({} as userContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate();

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<user | null>(null)
    const [status, setStatus] = useState(false)

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const [modalSwitch, setModalSwitch] = useState<number>();

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (user && token) {
            setUser(JSON.parse(user))
            setToken(token)
        }
        else logout()

        setStatus(true)
    }, [])

    const registerUser = async (newUser: user) => {
        const response = await userService.create(newUser)

        switch (response.status) {
            case 200:
                setMessage('User succefully created!')
                setModalSwitch(1);
                setModal(true);
                break;
            case 409:
                setMessage('Login alredy taken!')
                setModalSwitch(0);
                setModal(true);
                break;
            default:
                setMessage(`Error! Code ${(response).status}`)
                setModalSwitch(0);
                setModal(true);
        }
    }

    const loginUser = async (username: string, password: string) => {

        const response = await userService.login(username, password)

        const json = (await response.json())

        if (!json.data) {
            setMessage('Login or Password invalid!')
            setModalSwitch(0);
            setModal(true)
            return;
        }

        const data = json.data as authData

        if (!data.user) {
            setMessage('Login or Password invalid!')
            setModalSwitch(0);
            setModal(true)
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

        setMessage('User logged succefully');
        setModalSwitch(1);
        setModal(true);
    }

    const updateUser = async (updatedUser: user) => {
        const response = await userService.update(user!.userId!, { ...updatedUser, userId: user!.userId! })

        // Shouldn't use status code for validation ? 
        switch (response.status) {
            case 200:
                setMessage('User succefully updated!')
                setModalSwitch(0);
                setModal(true);
                break;
            default:
                setMessage('Error on user update!')
                setModalSwitch(0);
                setModal(true);
        }

        logout()
    }

    const deleteUser = async () => {
        const response = await userService.selfDelete(user!.userId!, token!)

        const data = (await response.json())

        switch (response.status) {
            case 200:
                setMessage('User succefully deleted!')
                setModalSwitch(2);
                setModal(true);
                break;
            default:
                setMessage('Error on user delete!\n' + data.message)
                setModalSwitch(0);
                setModal(true);
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
        const response = await userService.isAuthenticated(token!)

        const message = (await response.json()).message

        if (message != 'Authenticated') {
            setMessage('Session expired')
            setModalSwitch(2);
            setModal(true);
        }
    }

    useEffect(() => {
        if (token)
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
        {
            (modal && modalSwitch === 0) &&
            <Modal
                setModal={setModal}
            >
                <p>{message}</p>
                <button
                    onClick={() => {
                        setModal(false)
                    }}
                    className="basic-button"
                >Confirm</button>
            </Modal>
        }
        {
            (modal && modalSwitch === 1) &&
            <Modal
                setModal={setModal}
            >
                <p>{message}</p>
                <button
                    onClick={() => {
                        navigate('/')
                        setModal(false)
                    }}
                    className="basic-button"
                >Confirm</button>
            </Modal>
        }
        {
            (modal && modalSwitch === 2) &&
            <Modal
                setModal={setModal}
            >
                <p>{message}</p>
                <button
                    onClick={() => {
                        logout()
                        setModal(false)
                    }}
                    className="basic-button"
                >Confirm</button>
            </Modal>
        }
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
