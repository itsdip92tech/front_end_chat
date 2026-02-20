'use client'
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';



const TypeArea = ({handleUserMessage}:{handleUserMessage:(author:string,message:string,dateTime:string)=>void})=>{

    const [message,setMessage] = useState<string>("");

    const messageRef = useRef<HTMLInputElement>(null);

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
        const dateTime = moment().format('D MMM YYYY, HH:mm');
        const token = 'super-secret-doodle-token'
        const payload = {
            message: message,
            author: author
        }

        handleUserMessage(author,message,dateTime)
        
        try{
            const response = await fetch("http://localhost:3000/api/v1/messages",{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if(!response.ok) throw new Error('Unauthorized access');
            const data = await response.json();
            if(data) setMessage("");
            console.log(data);
        }catch(err){
            console.log('Fetch error:',err);
        }        
    }

    return (
        <form className="h-[10%] w-full bg-[#3798d4] flex justify-center items-center" onSubmit={handleSend}>
            <input id="message" aria-label='User Message' className="w-[60%] h-[75%] md:text-2xl bg-white border-2 border-[#3798d4] rounded-md p-2 focus:border-[#3798d4] focus:outline-none mr-2" value={message} ref={messageRef} placeholder="Type a message" onChange={handleChange}></input>
            <button className="w-[20%] h-[75%] bg-[#ff876d] rounded-md text-white ml-2 cursor-pointer md:text-2xl" type="submit">Send</button>
        </form>
    )
}

export default TypeArea;