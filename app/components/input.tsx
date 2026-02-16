'use client'

const Input = ({ message, onChange }: {message:string, onChange(e:React.ChangeEvent<HTMLInputElement>): void})=>{
    return(
        <input className="h-[75%] w-[30%] bg-white border-2 border-[#3798d4] rounded-md p-2 focus:border-[#3798d4] focus:outline-none mr-2"
         id="message" name="message" value={message} placeholder="Message" onChange={(e)=>onChange(e)}></input>
    )
}

export default Input;