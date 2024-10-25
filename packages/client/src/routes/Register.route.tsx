import { Link } from "react-router-dom"

import "../styles/form.css"
import { FormHeader } from "../components/form/FormHeader"
import { useState } from "react"
import { user } from "../types"
import { userService } from "../service/user.service"

export const Register = () => {
    
    const [ user, setUser ] = useState<user>({
        name: '',
        age: -1,
        password: '',
        username: ''
    });

    const createUserHandler = async () => {
        if(
            user.name.length <= 0 ||
            user.password.length <= 0 ||
            user.username.length <= 0 ||
            user.age <= 0
        )
            return;
        else{
            alert(
                (await (await 
                    userService.create(user))
                        .json())
                            .message
            )
        }
    }

    return(
        <div className="basic-body">
            <div className="basic-container">
                <FormHeader title="register page" />


                <div className="form-data">
                    <label className="form-input-label">
                        Name:
                        <input type="text" className="form-input" 
                            onChange={(e) => setUser(prev => {return {...prev, name: e.target.value}})}
                        />
                    </label>
                    <label className="form-input-label">
                        Age:
                        <input type="number" className="form-input" 
                            onChange={(e) => setUser(prev => {return {...prev, age: parseInt(e.target.value)}})}
                        />
                    </label>
                    <label className="form-input-label">
                        Username:
                        <input type="text" className="form-input" 
                            onChange={(e) => setUser(prev => {return {...prev, username: e.target.value}})}
                        />
                    </label>
                    <label className="form-input-label">
                        Password:
                        <input type="password" className="form-input" 
                            onChange={(e) => setUser(prev => {return {...prev, password: e.target.value}})}
                        />
                    </label>
                    <label className="form-input-label">
                        Confirm Password:
                        <input 
                            type="password" 
                            className="form-input" 
                        />
                    </label>
                </div>

                <hr className="basic-division" />
                
                <div className="form-submit-container">
                    <input className="form-button" type="submit" value="Cadastrar" 
                        onClick={() => createUserHandler()}
                        onKeyDown={(e) => e.key == "Enter" ? createUserHandler() : false}
                    />
                    <Link to={'/login'} className="form-to-link">Já possui uma conta? <em>Entre!</em></Link>
                </div>
            </div>
        </div>
    )
}