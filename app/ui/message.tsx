// Eligible to be server component

import { MessageInterface } from '../types/message';

const Message = (props:MessageInterface)=>{
    const messageContent = <>
                                <span className='text-gray-400 text-sm md:text-lg'>{props.author}</span>
                                <p className='sm:mt-[8px] sm:mb-[8px] md:mt-[10px] md:mb-[10px] text-sm md:text-2xl'>{props.message}</p>
                                <span className='text-gray-400 text-sm md:text-lg'>{props.createdAt}</span>
                           </>
    const messageBox = props.author == localStorage.getItem("author") ? 
                        (<div className='min-h-min mt-2 mb-2 p-4 sm:p-[0.8rem] md:p-4 self-end bg-yellow-100 max-w-[75%] w-fit rounded-md border border-gray-300'>
                            {messageContent}
                        </div>):

                        (<div className='min-h-min mt-2 mb-2 p-4 sm:p-[0.8rem] md:p-4 self-start bg-white max-w-[75%] w-fit rounded-md border border-gray-300'>
                            {messageContent}
                        </div>)

    return(
        messageBox
    )
}

export default Message;