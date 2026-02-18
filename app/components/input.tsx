'use client'
import React from 'react';

type InputType = {
    id: string,
    value: string,
    ref: React.Ref<HTMLInputElement>,
    placeholder: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=> void
}


const Input = ({id,value,ref,placeholder,onChange}: InputType)=>{
    return(
        <input className="sm: w-[75%] md: w-[50%]  h-[75%] w-[30%] bg-white border-2 border-[#3798d4] rounded-md p-2 focus:border-[#3798d4] focus:outline-none mr-2"
         id={id} ref={ref} name="message" value={value} placeholder={placeholder} onChange={(e)=>onChange(e)} required aria-required></input>
    )
}

export default Input;