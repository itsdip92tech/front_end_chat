'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';

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
    // Mock auth setup.
    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        localStorage.setItem('author',user);
        setUser("");
        router.push('/chat');
    }
    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
              <Image 
                src={BackgroundImg}
                alt="Login background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="text-xl mb-4" htmlFor="author">
                    Login
                </label>
                <input id="author" className="login-input" value={user} ref={userRef} placeholder="Enter user name" onChange={handleChange}></input>
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;