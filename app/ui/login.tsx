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
            <form className="w-[90%] p-4 lg:w-[50%] lg:h[30%] xl:w-[30%] xl:h-[50%] lg:p-8 flex flex-col border border-[#3798d4] rounded-lg justify-center text-center" onSubmit={handleSubmit}>
                <label className="text-xl mb-4" htmlFor="author">
                    Login
                </label>
                <input id="author" className="border-2 border-[#3798d4] rounded-md p-2 mb-4 focus:border-[#3798d4] focus:outline-none" value={user} ref={userRef} placeholder="Enter user name" onChange={handleChange}></input>
                <button className="h-[2rem] bg-[#ff876d] rounded-md text-white mt-2 cursor-pointer" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;