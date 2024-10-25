import { IconType } from "react-icons"
import { Message } from "./Message"
import React, { useEffect, useRef, useState } from "react"
import { message } from "../../types"
import { messageService } from "../../service/message.service"

type chatProps = {
    Icon: IconType,
    title: string
}

export const Chat = ( { Icon, title }: chatProps ) => {

    const chatText = useRef<HTMLInputElement>(null)

    const watchDatabase = useRef<number | null>(null);

    const [ text, setText ] = useState<string>();
    const [ messages, setMessages ] = useState<message[]>([]);

    const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setText(e.currentTarget.value);
    }

    const getMessagesHandler = async () => {
        const aux = (await (await messageService.getAll()).json()).messages as message[]

        setMessages(() => aux)
    }    

    const sendMessage = async () => {
        if(!text || text.length <= 0)
            return;

        await messageService.create({
            text: text,
            chatId: "873c6dfa-beac-4a08-88ff-cb8ff4de07a7",
            userId: "b28225ae-6217-4f49-90a2-f59dd1fb7d79"
        })

        getMessagesHandler()

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

    useEffect(() => {
        getMessagesHandler()

        // watchDatabase.current = setInterval(() => {
        //     getMessagesHandler();
        // }, 2000)        

        // document.addEventListener('visibilitychange', () => {
        //     if(document.visibilityState === 'visible' && watchDatabase.current == null)
        //         watchDatabase.current = setInterval(() => {
        //             getMessagesHandler();
        //         }, 2000)
        //     else{
        //         clearTimeout(watchDatabase.current!)
        //         watchDatabase.current = null    
        //     }
        // })

    }, [])

    return(
        <div className="basic-container">
            <div className="home-header">
                <p><Icon/> {title} <Icon/></p>
                <hr className="basic-division" />
            </div>

            <div className="chat-container">
            {
                (messages && messages.length > 0) ?
                    messages.map(message => <Message sender={message.userId!} text={message.text} />)
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
                    placeholder="≫"
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