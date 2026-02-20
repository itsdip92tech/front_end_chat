import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import type { Type } from '../hooks/useToast';

interface ToastProps{
    type: Type,
    msg: string,
    closeToast: ()=>void;
}


const icons = {
    error: <AiOutlineExclamationCircle />
}

const ToastComponent = ({type,msg="New Notification",closeToast}:ToastProps)=>{
    return (
        <div className={`toast-wrapper ${type}`}>
            {icons.error}
            <span className="mr-4 ml-4 max-w-[80%]">{msg}</span>
            <AiOutlineClose className="toast-close" onClick={closeToast}/>
        </div>
    )
}

export default ToastComponent