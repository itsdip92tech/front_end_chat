'use client'

const Button = ({ onClick }: {onClick(e: React.MouseEvent<HTMLButtonElement>): void})=>{
    return(
        <button className="bg-[#ff876d] h-[75%] w-[10%] rounded-md text-white ml-2" onClick={(e)=>onClick(e)}>Send</button>
    )
};

export default Button;