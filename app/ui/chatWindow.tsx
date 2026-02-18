'use client'
import { useState } from 'react';
import ChatArea from "./chatarea"
import TypeArea from "./typearea"
import { MessageInterface } from '../types/message';

const ChatWindow = ()=>{

    const [userMessage,  setUserMessage] = useState<MessageInterface>();

    const handleMessage = (author:string,message:string,createdAt: string)=>{
        setUserMessage({author:author,message:message,createdAt:createdAt});
    }

    return(
        <>
            <ChatArea _id='1' author={userMessage?.author || ""} message={userMessage?.message || ""} createdAt={userMessage?.createdAt || ""}/>
            <TypeArea handleUserMessage={handleMessage}/>
        </>
    )
}

export default ChatWindow;