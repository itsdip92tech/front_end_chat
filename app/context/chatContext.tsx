'use client'

import React,{ createContext,useState,useEffect,useRef,useCallback, useMemo, useContext } from "react";
import { fetchChatMessagesService, sendMessageService } from '../services/api';
import { MessageInterface, ChatContextType } from "../types/message";
import moment from 'moment';

// This component will be responsible for maintaing the context for the message form and the chat area.

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({children}:{children:React.ReactNode}){
  const [messages,setMessages] = useState<MessageInterface[]>([]);
  const [error,setError] = useState<string | null>(null);
  const isFetching = useRef<boolean>(false);
  
  // This effect will fetch the messages every 5 seconds
  useEffect(()=>{
    let isMounted = true;  
    const controller = new AbortController();

    // Fetch messages
    async function fetchMessages(){
        // Prevent get message call if context is not mounted or existing fetch is in progress
        if(!isMounted || isFetching.current)return;
        try{
          const response: MessageInterface[] = await fetchChatMessagesService(controller.signal);


          // Update state only if new messages are received
          if(Array.isArray(response) && response.length>0){
              // Check for messages yet to be posted
                const preservedMessages = messages.filter(m=>!m.isPosted);
                const formattedData = response.map(data=>{
                    return{
                        ...data,
                        createdAt: moment(data.createdAt).format('D MMM YYYY HH:mm')
                    }

                })

                setMessages((prev)=>{
                  if(prev.length == formattedData.length){
                    if(JSON.stringify(prev) == JSON.stringify(formattedData))
                      return prev;
                  }
                  // This will prevent any messages currently being posted from being removed from the chat area if the fetch messages tries to update the state.
                  return [...formattedData,...preservedMessages]
                })             
                setError("");
            };
        }catch(err){
          if (err instanceof Error && err.name  === 'AbortError') {
            return; 
          }
          if(isMounted)
          setError("Unable to fetch messages")
        }finally{
          isFetching.current = false;
          setTimeout(fetchMessages,5000)
        }
    }
    
    fetchMessages();
    
    return()=>{isMounted = false;controller.abort()};
    
  },[])

  const sendMessage = useCallback(async(author:string,message:string)=>{
      if(!author || author == "" || !message || message == "")
      return;
      
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      const createdAt = moment().format('DD MMM YYYY, HH:mm');
      const messageObject: MessageInterface = {
        _id: tempId,
        message: message,
        author: author,
        createdAt: createdAt,
        isPosted: false
      }

      // Update the state locally first

      setMessages((prev)=>[...prev,messageObject]);

      try{

        const postMessage: MessageInterface = await sendMessageService(author,message);
        if(postMessage){
          setMessages((prev)=>prev.map(m=>{
              if(m.isPosted == false){
               return{...m,isPosted:true,_id:postMessage._id};
              }
              return m
          }))
          setError("");
        }
      }catch(err){
          setMessages((prev)=>prev.filter(m=>m._id !== tempId));
          setError('Unable to send message, try again')
      }
  },[])


  const value = useMemo(()=>({
    messages,
    error,
    sendMessage
  }),[messages,error,sendMessage])

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
