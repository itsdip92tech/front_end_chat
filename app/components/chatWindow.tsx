import ChatArea from "./chatarea"
import TypeArea from "./typearea"
import { ChatProvider } from '../context/chatContext';

const ChatWindow = ()=>{
    return(
        <ChatProvider>
            <ChatArea />
            <TypeArea/>
        </ChatProvider>
    )
}

export default ChatWindow;