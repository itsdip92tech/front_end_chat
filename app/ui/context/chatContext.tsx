// // components/ChatProvider.tsx
// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
// import { MessageInterface } from '../../types/message';

// type ChatContextType = {
//   messages: MessageInterface[];
//   addMessage: (text: string, sender: string) => Promise<void>;
// };


// // Create context to be used between typearea and chatarea components
// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// export ChatProvider = 



































// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// export function ChatProvider({ children }: { children: ReactNode }) {
//   const [messages, setMessages] = useState<MessageInterface[]>([]);

//   const fetchMessages = useCallback(async () => {
//     try {
//       const res = await fetch('/api/messages');
//       const data = await res.json();
//       // Ensure we don't overwrite pending optimistic messages
//       setMessages(prev => {
//         const optimistic = prev.filter(m => m.isPosted);
//         return [...data.messages, ...optimistic];
//       });
//     } catch (err) { console.error(err); }
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//     const id = setInterval(fetchMessages, 5000);
//     return () => clearInterval(id);
//   }, [fetchMessages]);

//   const addMessage = async (text: string, sender: string) => {
//     const tempId = Math.random().toString();
//     const optimisticMsg: Message = {
//       id: tempId,
//       sender,
//       text,
//       createdAt: new Date().toISOString(), // Temporary local time
//       isOptimistic: true 
//     };

//     // 1. Show instantly
//     setMessages(prev => [...prev, optimisticMsg]);

//     try {
//       const res = await fetch('/api/messages', {
//         method: 'POST',
//         body: JSON.stringify({ text, sender }),
//       });
//       const savedMsg = await res.json(); // DB returns real { sender, text, createdAt }

//       // 2. Reconcile: Replace temporary message with official server message
//       setMessages(prev => 
//         prev.map(m => m.id === tempId ? { ...savedMsg, isOptimistic: false } : m)
//       );
//     } catch (err) {
//       // 3. Rollback on failure
//       setMessages(prev => prev.filter(m => m.id !== tempId));
//     }
//   };

//   return (
//     <ChatContext.Provider value={{ messages, addMessage }}>
//       {children}
//     </ChatContext.Provider>
//   );
// }

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) throw new Error("useChat must be used within a ChatProvider");
//   return context;
// };
