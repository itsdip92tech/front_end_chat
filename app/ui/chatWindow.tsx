'use client'
import { useState } from 'react';
import ChatArea from "./chatarea"
import TypeArea from "./typearea"
import { MessageInterface } from '../types/message';
const ChatWindow = ()=>{

    const [userMessage,  setUserMessage] = useState<MessageInterface>();
    const [tempId, setTempId] = useState<string>("");
    const handleMessage = (author:string,message:string,createdAt: string)=>{
        setTempId(`temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
        setUserMessage({author:author,message:message,createdAt:createdAt});
    }

    return(
        <>
            <ChatArea _id={tempId} author={userMessage?.author || ""} message={userMessage?.message || ""} createdAt={userMessage?.createdAt || ""}/>
            <TypeArea handleUserMessage={handleMessage}/>
        </>
    )
}

export default ChatWindow;