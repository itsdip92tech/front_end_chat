export interface MessageInterface{
    _id?: string,
    message: string,
    author: string,
    createdAt: string,
    isPosted?: string
}

export interface ChatContextType{
    messages: MessageInterface[],
    error: string | null
}