'use client'

import { useState, useEffect, useRef } from "react"
import Input from "../components/input"
import Button from "../components/button"
import { useRouter } from 'next/navigation'

const Login = ()=>{

    const[user,setUser] = useState<string>("");

    const userRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(()=>{
        userRef.current?.focus();
    },[])
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setUser(e.target.value);
    }

    // Set user name and route to chat page
    const handleSubmit = ()=>{
        localStorage.setItem('author',user);
        setUser("");
        router.push('/chat');
    }
    return(
        <form className="sm:w-[90%] md:w-[90%] lg:w-[30%] h-20% border-gray-500 rounded-md" onSubmit={handleSubmit}>
            <label htmlFor="author">
                User Name
            </label>
            <Input id="author" value={user} ref={userRef} placeholder="Enter user name" onChange={handleChange}/>
            <Button button="Login" onClick={handleSubmit}/>
        </form>
    )
}

export default Login;