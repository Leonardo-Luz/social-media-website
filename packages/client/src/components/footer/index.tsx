import { useNavigate } from "react-router-dom"

import "./footer.css"
import { BiMessage } from "react-icons/bi";

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="footer-container">
            <BiMessage
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
