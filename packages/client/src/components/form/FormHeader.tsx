import { BiX } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

type formHeaderProps = {
    title: string
}

export const FormHeader = ( { title }: formHeaderProps ) => {
    const navigate = useNavigate();

    return(
        <div className="form-header">
            <div className="form-header-container">
                <p className="form-header-message">{title}</p>
                <button 
                    className="form-close-button"
                    onClick={() => navigate(-1)}
                ><BiX/></button>
            </div>
            <hr className="basic-division"/>
        </div>
    )
}