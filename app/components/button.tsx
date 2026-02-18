'use client'

const Button = ({button, onClick }: {button:string,onClick(e: React.MouseEvent<HTMLButtonElement>): void})=>{
    return(
        <button className="sm: w-[10%] md: w-[15%] bg-[#ff876d] h-[75%] w-[10%] rounded-md text-white ml-2 cursor-pointer" onClick={(e)=>onClick(e)}>{button}</button>
    )
};

export default Button;