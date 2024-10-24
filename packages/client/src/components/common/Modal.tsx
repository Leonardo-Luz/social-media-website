import { Dispatch, ReactNode, SetStateAction } from "react"

type modalProps = {
    message?: string,
    children: ReactNode,
    setModal: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ( { message, children, setModal }:modalProps ) => {
    return(
        <div
            className="modal-container"
        >
            <div className="modal-header">
                <p className="modal-message">{message}</p>
                <button
                    className="modal-close-button"
                    onClick={() => setModal(false)}
                >x</button>
            </div>
            <div className="modal-data">{children}</div>
        </div>
    )
}