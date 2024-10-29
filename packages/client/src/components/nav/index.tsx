import { NavLink } from "react-router-dom"

import "./nav.css"
import { BiHome, BiLogOut } from "react-icons/bi"
import { useAuth } from "../../context/AuthProvider"
import { CgProfile } from "react-icons/cg"

export const Nav = () => {
    const { isLogged, logout } = useAuth()

    return isLogged() ? (
        <header className="nav-container">
            <NavLink 
                to='/'
                className={({isActive}) => 
                    isActive ? "nav-link nav-link-active" : "nav-link"
                }
            >
                <BiHome/>
                Home
            </NavLink>

            <div className="nav-links">
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