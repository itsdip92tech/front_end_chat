'use client'
import { useState } from 'react';
import Input from '../components/input';
import Button from '../components/button';

const TypeArea = ()=>{

    const [message,setMessage] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value);
    }

    const handleSend = ()=>{
        console.log(message)
    }

    return (
        <div>
            <Input message={message} onChange={handleChange}/>
            <Button onClick={handleSend}/>
        </div>
    )
}

export default TypeArea;