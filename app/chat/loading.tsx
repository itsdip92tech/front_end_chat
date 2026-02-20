const dummyChatMessages = [
    {
        _id: "1",
       direction: 'start'
    },
    {
        _id: "2",
       direction: 'start'
    },
    {
        _id: "3",
       direction: 'end'
    },
    {
        _id: "4",
       direction: 'start'
    },
    {
        _id: "5",
       direction: 'end'
    }
]

const SkeletonMessage = ({direction}:{direction:string})=>{
    return(
        <div className={`loading-skeleton self-${direction}`}>
            <span className='h-10 bg-gray-200 rounded'></span>
            <p className='h-20 bg-gray-100 rounded'></p>
            <span className='h-10 bg-gray-200 rounded'></span>
        </div>
    )
}

const Loading = ()=>{
    return(
        <div className="h-full w-full overflow-hidden">
            <div className="h-[90%] w-full p-8 overflow-auto">
                <div className="h-[95%] overflow-y flex flex-col">
                    {dummyChatMessages.map(message=>
                        <SkeletonMessage key={message._id} direction={message.direction}/>                
                    )}
                </div>            
            </div>
            <div className="h-[10%] w-full bg-[#3798d4] flex justify-center items-center">
                <div className="w-[60%] h-[75%] bg-gray-100rounded"></div>
                <div className="w-[20%] h-[75%] bg-gray-200rounded"></div>
            </div>
        </div>
    )
}

export default Loading;