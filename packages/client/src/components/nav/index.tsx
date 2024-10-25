import { NavLink } from "react-router-dom"

import "./nav.css"
import { BiHome, BiLogIn, BiPen } from "react-icons/bi"

export const Nav = () => {
    return(
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
                    to='/register'
                    className={({isActive}) => 
                        isActive ? "nav-link nav-link-active" : "nav-link"
                }
                >Register<BiPen/></NavLink>
                <NavLink
                    className={({isActive}) => 
                        isActive ? "nav-link nav-link-active" : "nav-link"
                    }
                    to='/login'
                >Login<BiLogIn /></NavLink>
            </div>
        </header>
    )
}