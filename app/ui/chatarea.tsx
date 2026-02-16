'use client';

import { useState,useEffect } from "react";
import  Message  from "../components/message";
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';
import { MessageInterface } from '../types/message';

const ChatArea = ()=>{

    const [chatMessages,setChatMessages] = useState<MessageInterface[]>([]);

    useEffect(()=>{
        fetchData();    
    },[]);

    const fetchData = async() =>{
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
            const data = await response.json();
            if(data)setChatMessages(data);
        }catch(err){
            console.log('Fetch error:',err);
        }        
    }

    return(
        <div className="h-[90%] relative">
            <Image 
                src={BackgroundImg}
                alt="Background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <div className="absolute inset-0 overflow-y-auto pl-20 pr-20 pt-10 pb-10">
                {chatMessages.map(message=>
                    <Message key={message._id} author={message.author} message={message.message} createdAt={message.createdAt} _id={message._id} />                
                )}
            </div>
        </div>
    )
}

export default ChatArea