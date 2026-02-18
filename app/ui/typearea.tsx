'use client'
import { useState, useRef, useEffect } from 'react';
import Input from '../components/input';
import Button from '../components/button';
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

    const handleSend = async ()=>{
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
        <div className='h-[10%] w-full bg-[#3798d4] flex justify-center items-center'>
            <Input id='message' ref={messageRef} placeholder='Type a message' value={message} onChange={handleChange}/>
            <Button button='Send' onClick={handleSend} />
        </div>
    )
}

export default TypeArea;