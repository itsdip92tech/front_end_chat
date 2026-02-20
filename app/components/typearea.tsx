'use client'
import { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/chatContext';


const TypeArea = ()=>{
    const [message,setMessage] = useState<string>("");

    const messageRef = useRef<HTMLInputElement>(null);

    const { sendMessage, error } = useChat();
    useEffect(()=>{
        messageRef.current?.focus();
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value);
    }

    const handleSend = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(message == "") return;
        const author = localStorage.getItem('author') || "";
        sendMessage(author,message);
        setMessage("");
    }

    return (
        <form className="h-[10%] w-full bg-[#3798d4] flex justify-center items-center" onSubmit={handleSend}>
            <input id="message" aria-label='User Message' className="message-input" value={message} ref={messageRef} placeholder="Type a message" onChange={handleChange}></input>
            <button className="message-button" type="submit">Send</button>
        </form>
    )
}

export default TypeArea;