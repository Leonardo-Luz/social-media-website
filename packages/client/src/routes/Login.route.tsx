import { Link, useNavigate } from "react-router-dom"

import { BiX } from "react-icons/bi"
import "../styles/form.css"


export const Login = () => {
    const navigate = useNavigate();

    return(
        <div className="basic-body">
            <div className="basic-container">
                <div className="form-header">
                    <div className="form-header-container">
                        <p className="form-header-message">login page</p>
                        <button 
                            className="form-close-button"
                            onClick={() => navigate(-1)}
                        ><BiX/></button>
                    </div>
                    <hr className="basic-division"/>
                </div>

                <div className="form-data">
                    <label className="form-input-label">
                        Username:
                        <input type="text" className="form-input" />
                    </label>
                    <label className="form-input-label">
                        Password:
                        <input type="password" className="form-input" />
                    </label>
                </div>

                <hr className="basic-division" />
                
                <div className="form-submit-container">
                    <input className="form-button" type="submit" value="Entrar" />
                    <Link to={'/register'} className="form-to-link">não possui uma conta? <em>Registre-se já!</em></Link>
                </div>
            </div>
        </div>
    )
}