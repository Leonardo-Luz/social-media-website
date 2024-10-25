import { BiGlobe } from "react-icons/bi"
import "../styles/chat.css"
import { Chat } from "../components/common/Chat"
import { chatService } from "../service/chat.service"
import { messageService } from "../service/message.service"

export const Home = () => {
    return(
        <div className="basic-body">
            <button style={{margin: "20px", padding: '8px'}}
                onClick={() => chatService.create({
                    title: "global"
                })}
            >temp - new chat</button>

            <Chat Icon={BiGlobe} title="global chat" />

            <button style={{margin: "20px", padding: '8px'}}
                onClick={() => messageService.deleteAll()}
            >temp - Clean All Messages</button>
        </div>
    )
}