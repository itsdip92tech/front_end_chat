'use client'

const Input = ({ message, onChange }: {message:string, onChange(e:React.ChangeEvent<HTMLInputElement>): void})=>{
    return(
        <input value={message} onChange={(e)=>onChange(e)}></input>
    )
}

export default Input;