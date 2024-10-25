import { useEffect, useRef } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"

type messageProps = {
    sender: string,
    text: string
}

// sender is gonna be the username of the authenticated user

export const Message = ( { sender, text }: messageProps ) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        container.current?.scrollIntoView()
    }, [container])

    return(
        <div ref={container} className={`message-container ${sender == '9dd436ed-0d3f-4f7b-acc4-d0946f757619' ? 'me' : 'other'}`}>
            {
                sender != "9dd436ed-0d3f-4f7b-acc4-d0946f757619" && <CgProfile className="message-picture" />
            }
            <p className="message-text">{text}</p>
            {
                sender == "9dd436ed-0d3f-4f7b-acc4-d0946f757619" && <CgProfile className="message-picture" />
            }
        </div>
    )
}