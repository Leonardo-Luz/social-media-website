import { NavLink } from "react-router-dom"

import "./nav.css"
import { BiHome, BiLogOut } from "react-icons/bi"
import { useAuth } from "../../context/AuthProvider"

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
                <button className="nav-link"
                    onClick={() => logout()}
                >Logout <BiLogOut /></button>
                {/* <NavLink
                    className={({isActive}) => 
                        isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                    to='/login'
                >Login<BiLogIn /></NavLink> */}
            </div>
        </header>
    ) : <p></p>
}