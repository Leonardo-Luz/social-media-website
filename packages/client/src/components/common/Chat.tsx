import React, { useEffect, useRef, useState } from "react"
import { IconType } from "react-icons"

import { useAuth } from "../../context/AuthProvider"

import { Message } from "./Message"
import { message } from "../../types"
import { messageService } from "../../service/message.service"
import { chatService } from "../../service/chat.service"

type chatProps = {
    Icon: IconType,
    title: string
}

export const Chat = ( { Icon, title }: chatProps ) => {
    const { user } = useAuth()
        
    const ws = useRef<WebSocket | null>(null)

    const [ chatId, setChatId ] = useState<string>()

    const chatText = useRef<HTMLInputElement>(null);
    const [ text, setText ] = useState<string>();
    
    const [ messages, setMessages ] = useState<message[]>([]);
    const [ , setNewMessage ] = useState(0);
    
    const chatContainer = useRef<HTMLDivElement>(null)    

    const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setText(e.currentTarget.value);
    }

    const getChatIdHandler = async () => {
        const response = await chatService.getAll()

        const data = await response.json()

        setChatId(data.chats[0].chatId)
    }

    const getMessagesHandler = async () => {
        const response = await messageService.getAll()

        const data = (await response.json())

        setMessages(() => data.messages)
    }

    const sendMessage = async () => {
        if(!text || text.length <= 0)
            return;

        if(text == "/clear"){
            chatContainer.current?.scroll(0,0)
            messageService.deleteAll()

            setMessages([])

            if(chatText.current){
                chatText.current.value = ""
                setText(undefined);
            }
    
            return;
        }

        const send = {
            text: text,
            chatId: chatId,
            userId: user?.userId
        } as message

        const response = await messageService.create(send)

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

    const visibilityChangeHandler = () => {
        if(!(document.visibilityState === 'hidden')) {            
            document.title = 'Social media website'

            setNewMessage(0)

            chatContainer.current?.scroll(0, chatContainer.current.scrollHeight)
        }
    }

    useEffect(() => {
        getChatIdHandler()

        getMessagesHandler()
  
        document.addEventListener('visibilitychange', visibilityChangeHandler)

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
                setMessages(prev => {
                    const aux = [ ...prev, JSON.parse(messageString) ]
                
                    return aux
                })
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

            document.removeEventListener('visibilitychange', visibilityChangeHandler)
        }
    }, [])

    return(
        <div className="basic-container">
            <div className="home-header">
                <p><Icon/> {title} <Icon/></p>
                <hr className="basic-division" />
            </div>

            <div ref={chatContainer} className="chat-container">
            {
                (messages && messages.length > 0) ?
                    messages.map(message => <>
                        <Message message={message} />
                        {
                            (messages.indexOf(message) != messages.length - 1 && messages[messages.indexOf(message) + 1].userId !== message.userId ) &&
                                <hr className="chat-division"/>
                        }
                    </>
                )
                    
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