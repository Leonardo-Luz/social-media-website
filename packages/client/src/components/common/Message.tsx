import { useEffect, useRef, useState } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"
import { useAuth } from "../../context/AuthProvider"
import { message } from "../../types"

type messageProps = {
    message: message,
}

type messageTimerProps = {
    milli: number
}
const MessageTimer = ({ milli }: messageTimerProps) => {
    const seconds = (Math.round(milli / 1000))
    const minutes = (Math.round(seconds / 60))
    const hours = (Math.round(minutes / 60))
    const days = (Math.round(hours / 24))

    return (
        <em>
            {
                days >= 1 ? days + ` Day${days > 1 ? "s" : ""} Ago` :
                    hours >= 1 ? hours + ` Hour${hours > 1 ? 's' : ""} Ago` :
                        minutes >= 1 ? minutes + ` minute${minutes > 1 ? 's' : ""} Ago` :
                            seconds >= 10 ? seconds + ' seconds Ago' :
                                'Now'
            }
        </em>
    )
}
export const Message = ({ message }: messageProps) => {

    const { user: loggedUser } = useAuth()

    const [sendDays, setSendDays] = useState(0);

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        container.current?.parentElement?.scroll
            (0, container.current?.parentElement?.scrollHeight - container.current.clientHeight)
    }, [message.user])

    useEffect(() => {
        if (!message.createdAt)
            return;

        const dateInMilli = Date.now() - Date.parse(message.createdAt.toString());

        setSendDays(dateInMilli);
    }, [])

    return message.user ? (
        <div ref={container} className={`message-container ${message.userId == loggedUser?.userId ? 'me' : 'other'}`}>
            {
                message.userId != loggedUser?.userId && <CgProfile className="message-picture" />
            }
            <p className="message-text">
                <em>{message.user!.username}</em>
                {": " + message.text}
                <br /><br />
                <div
                    className={
                        `message-date-container 
                            ${message.user.userId != loggedUser?.userId ?
                            'text-end' :
                            'text-start'}`
                    }
                >
                    <MessageTimer milli={sendDays} />
                </div>
            </p>
            {
                message.userId == loggedUser?.userId && <CgProfile className="message-picture" />
            }
        </div>
    ) : undefined
}
