import React, { useEffect, useRef, useState } from "react"
import { IconType } from "react-icons"

import { useAuth } from "../../context/AuthProvider"

import { Message } from "./Message"
import { message } from "../../types"
import { messageService } from "../../service/message.service"

type chatProps = {
    Icon: IconType,
    title: string
}

export const Chat = ( { Icon, title }: chatProps ) => {

    const [ , setNewMessage ] = useState(0);

    const ws = useRef<WebSocket | null>(null)

    const { user } = useAuth()

    const chatText = useRef<HTMLInputElement>(null);

    const [ text, setText ] = useState<string>();
    const [ messages, setMessages ] = useState<message[]>([]);

    const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setText(e.currentTarget.value);
    }

    const getMessagesHandler = async () => {
        const response = await messageService.getAll()

        const data = (await response.json())

        setMessages(() => data.messages)
    }

    const sendMessage = async () => {
        if(!text || text.length <= 0)
            return;

        const response = await messageService.create({
            text: text,
            chatId: "c8cd9168-f599-4c1a-accc-a28762e9d087",
            userId: user?.userId
        })

        const data = (await response.json()).data

        ws.current && ws.current.send(JSON.stringify(data))

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

        document.addEventListener('visibilitychange', () => {
            if(!document.hidden) {
                document.title = 'Social media website'

                const chatContainer = document.getElementsByClassName('chat-container')[0] as HTMLDivElement
                
                chatContainer.scroll(0, chatContainer.scrollHeight)

                setNewMessage(0)
            }
        })

        ws.current = new WebSocket(import.meta.env.VITE_WS_URL)

        ws.current.onopen = () => {
            console.log('Connected to server!');
        }

        ws.current.onmessage = (message) => {
            if(document.hidden){
                setNewMessage(prev => {
                    const aux = prev+1;
                    
                    document.title = `(${aux}) New Message${aux > 1 && 's' || ''} ⚠️!`

                    return aux;
                })
            }

            // Shouldnt be necessary but isnt working without it -> was working before l o l
            getMessagesHandler()
            
            const buffer = (JSON.parse(message.data))

            const uint8Array = new Uint8Array(buffer.data);
            
            const decoder = new TextDecoder('utf-8');
            const messageString = decoder.decode(uint8Array);

            try{
                setMessages(prev => [ ...prev, JSON.parse(messageString) ])
            }
            catch(e){
                console.error('Failed to parse message!');
            }
        }

        ws.current.onclose = () => {
            console.log('Disconnected from server');
        }

        return () => {
            ws.current?.close()
        }
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
                    messages.map(message => <Message message={message} />)
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