'use-client';

import  Message  from "../components/message";


const ChatArea = ()=>{
    return(
        <div>
            <Message author="test" message="This is a test message" createdAt="15th Feb 21:43" _id="12345" />
            <Message author="test" message="This is a test message" createdAt="15th Feb 21:43" _id="12345" />
            <Message author="test" message="This is a test message" createdAt="15th Feb 21:43" _id="12345" />
            <Message author="test" message="This is a test message" createdAt="15th Feb 21:43" _id="12345" />
            <Message author="test" message="This is a test message" createdAt="15th Feb 21:43" _id="12345" />
        </div>
    )
}

export default ChatArea