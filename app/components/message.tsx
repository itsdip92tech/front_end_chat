import { MessageInterface } from '../types/message';

const Message = (props:MessageInterface)=>{
    return(
        <div>
            <span>{props.author}</span>
            <p>{props.message}</p>
            <span>{props.createdAt}</span>
        </div>
    )
}

export default Message;