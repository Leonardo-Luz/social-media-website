import { Link } from "react-router-dom"

import "../styles/form.css"
import { FormHeader } from "../components/form/FormHeader";


export const Login = () => {
    return(
        <div className="basic-body">
            <div className="basic-container">
                <FormHeader title='login page' />

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