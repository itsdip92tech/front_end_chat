'use client';

import { useState,useEffect, useRef,useCallback } from "react";
import  Message  from "../components/message";
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';
import { MessageInterface } from '../types/message';
import  moment  from "moment";

const ChatArea = ({_id,author,message,createdAt}:MessageInterface)=>{

    const [chatMessages,setChatMessages] = useState<MessageInterface[]>([]);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = ()=>{
        chatEndRef.current?.scrollIntoView({behavior:'smooth'});
    }

    const fetchData =useCallback(async() =>{
        const token = 'super-secret-doodle-token'

        try{
            const response = await fetch("http://localhost:3000/api/v1/messages",{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok) throw new Error('Unauthorized access');
            const messageData: MessageInterface[] = await response.json();

            if(messageData.length>0){
                const formattedData = messageData.map(data=>{
                    return{
                        ...data,
                        createdAt: moment(data.createdAt).format('D MMM YYYY, HH:mm')
                    }

                })

                setChatMessages(()=>formattedData)
            };
        }catch(err){
            console.log('Fetch error:',err);
        }        
    },[]);


    // Scroll to bottom on initial load or when new chat message arrives
    useEffect(()=>{
        if(chatMessages.length>0)
        scrollToBottom();
    },[chatMessages]);

    useEffect(()=>{
        if(author != "" && message !=""){
            console.log(author)
            const newMessage = {author,message,createdAt}
            setChatMessages((prev)=>[...prev,newMessage]); 
        }
    },[author,message,createdAt])

    useEffect(()=>{
        fetchData();
        const polling = setInterval(fetchData,5000);   
        return()=>clearInterval(polling);
    },[fetchData])


    return(
        <div className="h-[90%] relative">
            <Image 
                src={BackgroundImg}
                alt="Background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <div className="absolute inset-0 overflow-y-auto pl-20 pr-20 pt-10 pb-10 flex flex-col">
                {chatMessages.map(message=>
                    <Message key={message._id} author={message.author} message={message.message} createdAt={message.createdAt} _id={message._id} />                
                )}
                <div ref={chatEndRef}></div>
            </div>            
        </div>
    )
}

export default ChatArea