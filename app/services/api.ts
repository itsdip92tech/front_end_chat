const BASE_URL:string = 'http://localhost:3000/api/v1';
const API_KEY:string = 'super-secret-doodle-token'
const MAX_RETRIES = 3;
const RETRY_AFTER = 5000;

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
        throw err;
    }
}

const fetchChatMessages = async(signal?:AbortSignal)=>{
    const response = await fetchWithRetries(`${BASE_URL}/messages`,{
        signal,
        headers:{
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }})
    
    return await response.json();
}

export { fetchChatMessages };