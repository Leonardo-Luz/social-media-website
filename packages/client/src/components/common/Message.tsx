import { useEffect, useRef } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"
import { useAuth } from "../../context/AuthProvider"

type messageProps = {
    sender: string,
    text: string
}

// sender is gonna be the username of the authenticated user

export const Message = ( { sender, text }: messageProps ) => {

    const { user } = useAuth()

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        container.current?.scrollIntoView()
    }, [container])

    return(
        <div ref={container} className={`message-container ${sender == user?.userId ? 'me' : 'other'}`}>
            {
                sender != user?.userId && <CgProfile className="message-picture" />
            }
            <p className="message-text">{text}</p>
            {
                sender == user?.userId && <CgProfile className="message-picture" />
            }
        </div>
    )
}