'use client';

import {useEffect, useRef } from "react";
import  Message  from "./message";
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';
import { useChat } from "../context/chatContext";

const ChatArea = ()=>{

    const { messages, error } = useChat();
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = ()=>{
        chatEndRef.current?.scrollIntoView({behavior:'smooth'});
    }

    // Scroll to bottom on initial load or when new chat message arrives
    useEffect(()=>{
        if(messages.length>0)
        scrollToBottom();
    },[messages]);

    console.log('Chat area re-rendered')
    
    return(
        <div className="h-[90%] relative">
            <Image 
                src={BackgroundImg}
                alt="Background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <div className="absolute inset-0 overflow-y-auto pl-10 pr-10 md:pl-20 md:pr-20 pt-10 pb-10 h-[95%] flex flex-col">
                {messages.map(message=>
                    <Message key={message._id} author={message.author} message={message.message} createdAt={message.createdAt} _id={message._id} />                
                )}
                <div ref={chatEndRef}></div>
            </div>            
        </div>
    )
}

export default ChatArea