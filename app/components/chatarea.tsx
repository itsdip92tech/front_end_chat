'use client';

import {useEffect, useRef } from "react";
import  Message  from "./message";
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';
import { useChat } from "../context/chatContext";
import  useToast from '../hooks/useToast';

const ChatArea = ()=>{

    const { messages, error } = useChat();
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = ()=>{
        chatEndRef.current?.scrollIntoView({behavior:'smooth'});
    }

    const { triggerNotification, NotificationComponent } = useToast("top-left");

    // Scroll to bottom on initial load or when new chat message arrives
    useEffect(()=>{
        if(messages.length>0)
        scrollToBottom();
        
    },[messages]);

    useEffect(()=>{
        if(error)
        triggerNotification({duration:3000,type:'error',message: error});
        
    },[error]);
    
    return(
        <div className="h-[90%] relative">
            {NotificationComponent}
            <Image 
                src={BackgroundImg}
                alt="Background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <div className="chat-wrapper">
                {messages.map(message=>
                    <Message key={message._id} author={message.author} message={message.message} createdAt={message.createdAt} _id={message._id} />                
                )}
                <div ref={chatEndRef}></div>
            </div>            
        </div>
    )
}

export default ChatArea