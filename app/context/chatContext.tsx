'use client'

import React,{ createContext,useState,useEffect,useRef, useMemo, useContext } from "react";
import { fetchChatMessages } from '../services/api';
import { MessageInterface, ChatContextType } from "../types/message";
import moment from 'moment';

// This component will be responsible for maintaing the context for the message form and the chat area.

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({children}:{children:React.ReactNode}){
  const [messages,setMessages] = useState<MessageInterface[]>([]);
  const [error,setError] = useState<string | null>(null);
  const isFetching = useRef<boolean>(false);

  useEffect(()=>{
    let isMounted = true;  
    const controller = new AbortController();

    // Fetch messages
    async function fetchMessages(){
        // Prevent get message call if context is not mounted or existing fetch is in progress
        if(!isMounted || isFetching.current)return;

        try{
          const response: MessageInterface[] = await fetchChatMessages(controller.signal);

          // Update state only if the id of the last message received vs last message in UI is different
          if(response.length>0 && response[response.length-1]?._id != messages[messages.length-1]?._id){
                const formattedData = response.map(data=>{
                    return{
                        ...data,
                        createdAt: moment(data.createdAt).format('D MMM YYYY, HH:mm')
                    }

                })

                setMessages(formattedData);
                setError("");
            };
        }catch(err){
          setError("Trying to establish connection...")
        }finally{
          isFetching.current = false;
          setTimeout(fetchMessages,5000)
        }
    }
    
    fetchMessages();
    
    return()=>{isMounted = false;controller.abort()};
    
  },[])


  const value = useMemo(()=>({
    messages,
    error
  }),[messages,error])

  return(
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
  )

}

export const useChat = ()=>{
  const context = useContext(ChatContext);
  if(!context) throw new Error('useChat must be used with a Chat Provider');
  return context;
}
