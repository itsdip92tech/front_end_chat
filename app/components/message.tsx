import { MessageInterface } from '../types/message';

const Message = (props:MessageInterface)=>{
    return(
        <div className='min-h-min mt-2 mb-2 p-4 bg-white max-w-screen-sm w-fit rounded-md border border-gray-300'>
            <span className='text-gray-400 text-sm'>{props.author}</span>
            <p>{props.message}</p>
            <span className='text-gray-400 text-sm'>{props.createdAt}</span>
        </div>
    )
}

export default Message;