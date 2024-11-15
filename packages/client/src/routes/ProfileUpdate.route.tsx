import "../styles/form.css"
import { FormHeader } from "../components/form/FormHeader"
import { z } from "zod"
import { useAuth } from "../context/AuthProvider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const updateSchema = z.object({
    name: z.string()
        .min(1, 'Name is required'),
    age: z.coerce.number()
        .min(1, 'Age is required')
        .gte(12, 'Must be at least 12 years old'),
    password: z.string()
        .min(4, 'Password has to be at least 4 character long'),
    username: z.string()
        .min(1, 'Usarname is required'),
})
type updateData = z.infer<typeof updateSchema>

export const ProfileUpdate = () => {
    const { updateUser, user } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm<updateData>({
        resolver: zodResolver(updateSchema),
        defaultValues: user!
    })

    const updateHandler = (form: updateData) => {
        updateUser(form)
    }

    return (
        <div className="basic-body">
            <form onSubmit={handleSubmit(updateHandler)} className="basic-container">
                <FormHeader title="update page" />


                <div className="form-data">
                    <label className="form-input-label">
                        Name:
                        <input type="text" className="form-input"
                            {...register('name')}
                        />
                    </label>
                    {
                        errors.name &&
                        <span className="form-validation">
                            {
                                errors.name.message
                            }
                        </span>
                    }
                    <label className="form-input-label">
                        Age:
                        <input type="number" className="form-input"
                            {...register('age')}
                        />
                    </label>
                    {
                        errors.age &&
                        <span className="form-validation">
                            {
                                errors.age.message
                            }
                        </span>
                    }
                    <label className="form-input-label">
                        Username:
                        <input type="text" className="form-input"
                            {...register('username')}
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
                            {...register('password')}
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
                    <input className="form-button" type="submit" value="Atualizar" />
                </div>
            </form>
        </div>
    )
}
