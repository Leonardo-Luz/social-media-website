import { useNavigate } from "react-router-dom"

import "./footer.css"
// import logo from '../../images/logo.png';

export const Footer = () => {
    const navigate = useNavigate();

    return(
        <footer className="footer-container">
            <img 
                src={'#'} 
                alt="logo" 
                className="footer-logo"
                onClick={() => navigate('/')}
            />

            <div className="footer-social-media">

            </div>

            <p className="footer-copyright">
                Copyright &copy; 2024 Leonardo Luz
            </p>
        </footer>
    )
}