import { useEffect, useRef, useState } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"
import { useAuth } from "../../context/AuthProvider"
import { message } from "../../types"
import { userService } from "../../service/user.service"

type messageProps = {
    sender: message,
    text: string
}

// sender is gonna be the username of the authenticated user

export const Message = ( { sender, text }: messageProps ) => {

    const { user: loggedUser } = useAuth()

    const container = useRef<HTMLDivElement>(null);

    const [ user, setUser ] = useState(loggedUser);

    const getUserHandler = async () => {
        const res = await userService.getById(sender.userId!)

        const data = await res.json();

        setUser(data.user)
    }

    useEffect(() => {
        container.current?.scrollIntoView()

        getUserHandler()
    }, [container])

    return(
        <div ref={container} className={`message-container ${sender.userId == loggedUser?.userId ? 'me' : 'other'}`}>
            {
                sender.userId != loggedUser?.userId && <CgProfile className="message-picture" />
            }
            <p className="message-text"><em>{user?.username}</em><br/><br/>{text}</p>
            {
                sender.userId == loggedUser?.userId && <CgProfile className="message-picture" />
            }
        </div>
    )
}