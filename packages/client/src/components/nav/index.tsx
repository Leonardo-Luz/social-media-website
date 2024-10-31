import { NavLink } from "react-router-dom"

import "./nav.css"
import { BiHome } from "react-icons/bi"
import { useAuth } from "../../context/AuthProvider"
import { CgProfile } from "react-icons/cg"
import { DropMenu } from "./DropMenu"
import { useEffect, useState } from "react"
import { userService } from "../../service/user.service"
import { user } from "../../types"

export const Nav = () => {
    const { isLogged } = useAuth()

    const [ users, setUsers ] = useState<user[]>();

    const getUsersHandler = async () => {
        const response = await userService.getAll()

        const data = (await response.json())

        setUsers(data.users)
    }

    useEffect(() => {
        getUsersHandler()
    }, [])

    return isLogged() ? (
        <header className="nav-container">
            <NavLink 
                to='/'
                className={({isActive}) => 
                    isActive ? "nav-link nav-link-active" : "nav-link"
                }
            > <BiHome size={40}/>&ensp;Home </NavLink>

            <div className="nav-links">
                {
                    users &&
                    <DropMenu list={users} />
                }
                <NavLink
                    className={({isActive}) => 
                        isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                    to='/profile'
                ><CgProfile size={50} /></NavLink>
            </div>
        </header>
    ) : <p></p>
}