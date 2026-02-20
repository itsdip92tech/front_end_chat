export interface MessageInterface{
    _id?: string,
    message: string,
    author: string,
    createdAt: string,
    isPosted?: boolean
}

export interface ChatContextType{
    messages: MessageInterface[],
    sendMessage: (author:string,message:string)=>void,
    error: string | null
}