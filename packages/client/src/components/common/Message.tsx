import { useEffect, useRef } from "react"
import "../../styles/message.css"
import { CgProfile } from "react-icons/cg"

type messageProps = {
    sender: "me" | "other",
    text: string
}

export const Message = ( { sender, text }: messageProps ) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        container.current?.scrollIntoView()
    }, [container])

    return(
        <div ref={container} className={`message-container ${sender}`}>
            {
                sender == "other" && <CgProfile className="message-picture" />
            }
            <p className="message-text">{text}</p>
            {
                sender == "me" && <CgProfile className="message-picture" />
            }
        </div>
    )
}