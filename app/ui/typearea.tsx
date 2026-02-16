'use client'
import { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';

const TypeArea = ()=>{

    const [message,setMessage] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value);
    }

    const handleSend = async ()=>{
        console.log(message)
        const token = 'super-secret-doodle-token'
        const payload = {
            message: message,
            author: 'John Doe'
        }
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
            console.log(data);
        }catch(err){
            console.log('Fetch error:',err);
        }        
    }

    return (
        <div className='h-[10%] w-full bg-[#3798d4] flex justify-center items-center'>
            <Input message={message} onChange={handleChange}/>
            <Button onClick={handleSend}/>
        </div>
    )
}

export default TypeArea;