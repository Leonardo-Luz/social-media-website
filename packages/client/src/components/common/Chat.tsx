import { IconType } from "react-icons"
import { Message } from "./Message"
import React, { useRef, useState } from "react"

type chatProps = {
    Icon: IconType,
    title: string
}

type message = {
    text: string,
    sender: "me" | "other"
}

export const Chat = ( { Icon, title }: chatProps ) => {

    const chatText = useRef<HTMLInputElement>(null)

    const [ text, setText ] = useState<string>();
    const [ messages, setMessages ] = useState<message[]>([]);

    const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setText(e.currentTarget.value);
    }

    const sendMessage = () => {
        if(!text || text.length <= 0)
            return;

        const send = {
            sender: "me",
            text: text
        } as message

        setMessages(prev => [...prev, send]);

        if(chatText.current){
            chatText.current.value = ""
            setText(undefined);
        }
    }

    const clickHandler = ( ) => {
        sendMessage();
    }

    const enterHandler = ( e: React.KeyboardEvent ) => {
        e.key == "Enter" &&
            sendMessage()
    }

    return(
        <div className="basic-container">
            <div className="home-header">
                <p><Icon/> {title} <Icon/></p>
                <hr className="basic-division" />
            </div>

            <div className="chat-container">
            {
                messages && messages.length > 0 ?
                    messages.map(message => <Message sender={message.sender} text={message.text} />)
                :
                    "Não há mensagens neste chat!"
            }
            </div>

            <hr className="basic-division" />

            <div className="chat-input-container">
                <input
                    ref={chatText}
                    type="text" 
                    className="chat-text-input" 
                    onChange={changeHandler}
                    onKeyDown={enterHandler}
                />
                <input 
                    type="submit" 
                    value="enviar" 
                    className="chat-text-submit" 
                    onClick={clickHandler}
                />
            </div>
        </div>
    )
}