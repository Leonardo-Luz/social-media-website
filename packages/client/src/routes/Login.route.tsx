import { Link } from "react-router-dom"

import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";

import "../styles/form.css"
import { FormHeader } from "../components/form/FormHeader";
import { useAuth } from "../context/AuthProvider";

const loginSchema = z.object({
    username: z.string()
        .min(1, 'Username is required!'),
    password: z.string()
        .min(1, 'Password is required!')
})
type loginData = z.infer<typeof loginSchema>

export const Login = () => {
    const { loginUser } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<loginData>({
        resolver: zodResolver(loginSchema)
    })

    const loginHandler = ( form: loginData ) => loginUser(form.username, form.password)


    return(
        <div className="basic-body">
            <form className="basic-container"
                onSubmit={handleSubmit(loginHandler)}
            >
                <FormHeader title='login page' />

                <div className="form-data">
                    <label className="form-input-label">
                        Username:
                        <input type="text" className="form-input" 
                            { ...register('username') }
                        />
                    </label>
                    {
                        errors.username &&
                        <span className="form-validation">
                        {
                            errors.username.message
                        }
                        </span>
                    }
                    <label className="form-input-label">
                        Password:
                        <input type="password" className="form-input" 
                            { ...register('password') }
                        />
                    </label>
                    {
                        errors.password &&
                        <span className="form-validation">
                        {
                            errors.password.message
                        }
                        </span>
                    }
                </div>

                <hr className="basic-division" />
                
                <div className="form-submit-container">
                    <input className="form-button" type="submit" value="Entrar" />
                    <Link  to={'/register'} className="form-to-link">não possui uma conta? <em>Registre-se já!</em></Link>
                </div>
            </form>
        </div>
    )
}