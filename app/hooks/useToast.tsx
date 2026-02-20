import { useState, useRef } from "react";
import ToastComponent from "../ui/toast";

export type Type = "info"|"success"|"error"|"warning";

type Position = "top-left"|"top-right"|"bottom-left"|"bottom-right";

interface useToastProps{
    duration: number,
    type: Type,
    message: string
}

interface Notification extends useToastProps{
    id: number
}

const useToast = (Position:Position="top-left")=>{
    // Reference for distinct id of the toast.
    const idRef  = useRef(0);
    const nextId = ()=>{
        idRef.current +=1;
        return idRef.current;
    }

    // const isTop:boolean = Position.startsWith("top")
    // This variable will contain the list of toasts to be displayed
    const [notification,setNotification] = useState<Notification[]>([]);

    const triggerNotification  = (notificationProps:useToastProps)=>{
        const id  = nextId();

        const Toast:Notification = {id:id,...notificationProps};

        // setNotification((notification)=>isTop?[...notification,Toast]:[Toast,...notification]);

        setNotification((notification)=>[...notification,Toast]);

        // Schedule removal of a toast from the array.
        setTimeout(()=>{
            closeNotification(id)
        },notificationProps.duration)
    }

    // Remove a toast from the array.
    const closeNotification = (id:number)=>{
        setNotification((notification)=>notification.filter((t)=>t.id !== id))
    }

    const NotificationComponent = notification.length>0? 
        
            <div className={`${Position}`}>
                {notification.map((t)=>(
                    <ToastComponent key={t.id} type={t.type} msg={t.message} closeToast={()=>closeNotification(t.id)}/>
                ))}            
            </div>
     : null;

    return {triggerNotification, NotificationComponent}
}

export default useToast;