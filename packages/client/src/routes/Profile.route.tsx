import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect, useState } from "react"
import { user } from "../types"
import { userService } from "../service/user.service"
import { BiEdit, BiLogOut, BiMessage } from "react-icons/bi"

import "../styles/profile.css"

export const Profile = () => {
    const { id } = useParams()

    const navigate = useNavigate();

    const { deleteUser, user: loggedUser, logout } = useAuth()

    const [user, setUser] = useState<user | null>();

    const deleteHandler = () => {
        const aux = prompt('Digite sua senha para confirmar a exclusão')

        if (aux) {
            deleteUser(aux)
            logout()
        }
        else
            alert('Senha inválida!')
    }

    const getUserHandler = async (id: string) => {
        const response = await userService.getById(id)

        const data = (await response.json())

        if (data.user)
            setUser(data.user);
        else
            setUser(user)
    }

    useEffect(() => {
        if (!id) {
            setUser(loggedUser);

        }
        else {
            getUserHandler(id)
        }
    }, [id])

    return (
        <div className="basic-body">
            <div className="basic-container">
                <div className="basic-header">
                    <h3 className="profile-title">
                        &ensp;&ensp;Profile
                    </h3>
                    {
                        !id &&
                        <BiEdit className="profile-edit-icon"
                            onClick={() => navigate('/profile/update')}
                        />
                    }
                </div>
                <hr className="basic-division" />

                <div className="profile-data">
                    {
                        user ? (
                            <div>
                                <label className="profile-label">Nome: <p>{user.name}</p></label>
                                <label className="profile-label">username: <p>{user.username}</p></label>
                                <label className="profile-label">age: <p>{user.age}</p></label>
                            </div>
                        ) :
                            <div>
                                Loading...
                            </div>
                    }
                </div>

                <hr className="basic-division" />

                <div className="profile-buttons">
                    {
                        !id &&
                        <button className="basic-button"
                            onClick={() => deleteHandler()}
                        >
                            Excluir Conta!
                        </button>
                    }
                    {
                        !id ?
                            <button className="basic-button"
                                onClick={() => logout()}
                            >
                                <BiLogOut /> Logout
                            </button>
                            :
                            <button className="basic-button"
                                onClick={() => alert("to chat")}
                            >
                                <BiMessage /> Mandar Mensager
                            </button>
                    }
                </div>
            </div>
        </div>
    )



}
