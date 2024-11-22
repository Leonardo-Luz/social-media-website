import { Dispatch, ReactNode, SetStateAction } from "react"

import './modal.style.css'
import { CgClose } from "react-icons/cg";

type modalProps = {
    title?: string,
    children: ReactNode,
    setModal: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ title, children, setModal }: modalProps) => {
    return (
        <div
            className="modal-container"
        >
            <div className="modal-header">
                <p className="modal-message">{title}</p>
                <CgClose
                    className="modal-close-button"
                    onClick={() => setModal(false)}
                >x</CgClose>
            </div>
            <div className="modal-data">
                {children}
            </div>
        </div>
    )
}
