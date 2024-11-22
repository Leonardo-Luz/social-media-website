import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect, useState } from "react"
import { user } from "../types"
import { userService } from "../service/user.service"
import { BiEdit, BiLogOut, BiMessage } from "react-icons/bi"

import "../styles/profile.css"
import { Modal } from "../components/common/Modal"

export const Profile = () => {
    const { id } = useParams()
    const { deleteUser, user: loggedUser, logout } = useAuth()
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [confirmPass, setConfirmPass] = useState("");

    const [user, setUser] = useState<user | null>();


    const confirmDelete = () => {
        setModalMessage('Digite sua senha para confirmar a exclusão');
        setModal(true);
    }

    const deleteHandler = () => {
        deleteUser(confirmPass);
        logout();
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
                            onClick={() => confirmDelete()}
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
            {
                modal &&
                <Modal setModal={setModal} title="Ateção!" >
                    <p>
                        {modalMessage}
                    </p>
                    <input type="password" onChange={(e) => setConfirmPass(e.target.value)} />
                    <div
                        className="buttons-container"
                    >
                        <button
                            onClick={() => setModal(false)}
                            className="basic-button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => deleteHandler()}
                            className="basic-button"
                        >
                            Confirm
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
}
