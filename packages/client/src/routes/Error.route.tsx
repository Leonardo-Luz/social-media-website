import { Link } from "react-router-dom"

export const Error = () => {
    return(
        <div className="error-container">
            <h1 
                className="error-message"
            >
                Um erro ocorreu!
                \nEsta página não foi encontrada
            </h1>
            <Link 
                className="error-link" 
                to='/'
            >Voltar a página inicial</Link>
        </div>
    )
}