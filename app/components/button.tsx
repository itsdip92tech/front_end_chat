'use client'

const Button = ({ onClick }: {onClick(e: React.MouseEvent<HTMLButtonElement>): void})=>{
    return(
        <button onClick={(e)=>onClick(e)}>Send</button>
    )
};

export default Button;