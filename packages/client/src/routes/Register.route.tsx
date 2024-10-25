import { Link } from "react-router-dom"

import "../styles/form.css"
import { FormHeader } from "../components/form/FormHeader"

export const Register = () => {

    return(
        <div className="basic-body">
            <div className="basic-container">
                <FormHeader title="register page" />


                <div className="form-data">
                    <label className="form-input-label">
                        Name:
                        <input type="text" className="form-input" />
                    </label>
                    <label className="form-input-label">
                        Username:
                        <input type="text" className="form-input" />
                    </label>
                    <label className="form-input-label">
                        Password:
                        <input type="password" className="form-input" />
                    </label>
                    <label className="form-input-label">
                        Confirm Password:
                        <input type="password" className="form-input" />
                    </label>
                </div>

                <hr className="basic-division" />
                
                <div className="form-submit-container">
                    <input className="form-button" type="submit" value="Cadastrar" />
                    <Link to={'/login'} className="form-to-link">Já possui uma conta? <em>Entre!</em></Link>
                </div>
            </div>
        </div>
    )
}