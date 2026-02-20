// Eligible to be server component

import { MessageInterface } from '../types/message';

const Message = (props:MessageInterface)=>{
    const messageContent = <>
                                <span className='message-author'>{props.author}</span>
                                <p className='message'>{props.message}</p>
                                <span className='message-createdat'>{props.createdAt}</span>
                           </>
    const messageBox = props.author == localStorage.getItem("author") ? 
                        (<div className='message-wrapper-user'>
                            {messageContent}
                        </div>):

                        (<div className='message-wrapper'>
                            {messageContent}
                        </div>)

    return(
        messageBox
    )
}

export default Message;