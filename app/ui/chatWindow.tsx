import ChatArea from "./chatarea"
import TypeArea from "./typearea"
import { ChatProvider } from '../context/chatContext';

const ChatWindow = ()=>{

    const handleMessage = (author:string,message:string,createdAt: string)=>{
        console.log(author,message,createdAt);
    }

    console.log('Chat window re-rendered')

    return(
        <ChatProvider>
            <ChatArea />
            <TypeArea handleUserMessage={handleMessage}/>
        </ChatProvider>
    )
}

export default ChatWindow;