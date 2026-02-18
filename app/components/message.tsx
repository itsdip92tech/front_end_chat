import { MessageInterface } from '../types/message';

const Message = (props:MessageInterface)=>{
    console.log(props.author);
    console.log(localStorage.getItem("author"))
    const messageBox = props.author == localStorage.getItem("author") ? 
                        (<div className='min-h-min mt-2 mb-2 p-4 self-end bg-yellow-100 max-w-screen-sm w-fit rounded-md border border-gray-300'>
                            <span className='text-gray-400 text-sm'>{props.author}</span>
                            <p>{props.message}</p>
                            <span className='text-gray-400 text-sm'>{props.createdAt}</span>
                        </div>):

                        (<div className='min-h-min mt-2 mb-2 p-4 self-start bg-white max-w-screen-sm w-fit rounded-md border border-gray-300'>
                            <span className='text-gray-400 text-sm'>{props.author}</span>
                            <p>{props.message}</p>
                            <span className='text-gray-400 text-sm'>{props.createdAt}</span>
                        </div>)

    return(
        messageBox
    )
}

export default Message;