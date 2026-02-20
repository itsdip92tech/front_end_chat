'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import BackgroundImg from '../../public/Body_BG.png';
import  useToast from '../hooks/useToast';

const Login = ()=>{

    const[user,setUser] = useState<string>("");

    const userRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const { triggerNotification, NotificationComponent } = useToast("top-left");

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
        if(!user || user.length < 3){
            triggerNotification({duration:3000,type:'error',message: 'Minimum 3 characters'});
            return;
        }
        localStorage.setItem('author',user);
        setUser("");
        router.push('/chat');
    }
    return(
        <div className="login-wrapper">
            { NotificationComponent }
              <Image 
                src={BackgroundImg}
                alt="Login background image"
                fill
                priority
                className="object-cover -z-10"
            ></Image>
            <div className='font-chancery text-4xl mb-8'>Doodle Chat</div>
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