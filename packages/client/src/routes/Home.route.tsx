import { BiGlobe } from "react-icons/bi"
import "../styles/chat.css"
import { Chat } from "../components/common/Chat"

export const Home = () => {
    return(
        <div className="basic-body">
            <Chat Icon={BiGlobe} title="global chat" />
        </div>
    )
}