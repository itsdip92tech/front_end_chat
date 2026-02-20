const BASE_URL:string = 'http://localhost:3000/api/v1';
const API_KEY:string = 'super-secret-doodle-token'
const MAX_RETRIES = 3;
const RETRY_AFTER = 5000;

// This method will retry call backs 3 times in case it encounters server error or rate limit exceeded.
const fetchWithRetries = async(url:string,options:RequestInit,retries:number = MAX_RETRIES):Promise<Response> =>{
    try{
        // Fetc
        const response = await fetch(url,options);
        if(response.status>500) throw new Error(`Couldn't connect to the server`);
        return response;
    }
    catch(err){
        if(retries > 0){
            // Retry 3 times if a call fails after every 5 seconds.
            await new Promise((resolve)=>{
                setTimeout(resolve,RETRY_AFTER)
            })
            return await fetchWithRetries(url,options,retries-1);
        }
        throw new Error('Something went wrong while connecting to the server');
    }
}

const fetchChatMessagesService = async(signal?:AbortSignal)=>{
    const response = await fetchWithRetries(`${BASE_URL}/messages`,{
    signal,
    method: 'GET',
    headers:{
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    }})

    return await response.json();
}

const sendMessageService = async(author:string,message:string)=>{

    const payload = {
        author: author,
        message: message
    }

    const response = await fetchWithRetries(`${BASE_URL}/messages`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    
    return response.json();
}

export { fetchChatMessagesService, sendMessageService };