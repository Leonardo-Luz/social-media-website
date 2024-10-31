import { useEffect, useRef } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"
import { useAuth } from "../../context/AuthProvider"
import { message } from "../../types"

type messageProps = {
    message: message,
}

export const Message = ( { message }: messageProps ) => {

    const { user: loggedUser } = useAuth()

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        container.current?.parentElement?.scroll
            (0, container.current?.parentElement?.scrollHeight - container.current.clientHeight)
    }, [message.user])

    return message.user ? (
        <div ref={container} className={`message-container ${message.userId == loggedUser?.userId ? 'me' : 'other'}`}>
            {
                message.userId != loggedUser?.userId && <CgProfile className="message-picture" />
            }
            <p className="message-text">
                <em>{message.user!.username}</em>
                    <br/><br/>
                        {message.text}
                    <br/><br/>
                    <em>{message.createdAt.toString().split('T')[1].split('.')[0]}</em>
            </p>
            {
                message.userId == loggedUser?.userId && <CgProfile className="message-picture" />
            }
        </div>
    ) : undefined
}