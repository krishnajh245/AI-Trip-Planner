import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'

const CreateNewTrip = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[30%_70%] gap-4 md:gap-6 px-4 md:px-6 lg:px-10">
      <div className="order-1 ">
        <ChatBox />
      </div>
      <div className="order-2 ">
        <Itinerary />
      </div>
    </div>

  )
}

export default CreateNewTrip