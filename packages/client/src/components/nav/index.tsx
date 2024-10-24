import { NavLink } from "react-router-dom"

import "./nav.css"
import { BiLogIn, BiPen } from "react-icons/bi"

export const Nav = () => {
    return(
        <header className="nav-container">
            <NavLink 
                to='/'
                className={({isActive}) => 
                    isActive ? "nav-link-active" : ""
                }
            >Home</NavLink>

            <div className="nav-links">
                <NavLink 
                    to='/register'
                    className={({isActive}) => 
                        isActive ? "nav-link-active" : ""
                    }
                >Register<BiPen/></NavLink>
                <NavLink
                    className={({isActive}) => 
                        isActive ? "nav-link-active" : ""
                    }
                    to='/login'
                >Login<BiLogIn /></NavLink>
            </div>
        </header>
    )
}