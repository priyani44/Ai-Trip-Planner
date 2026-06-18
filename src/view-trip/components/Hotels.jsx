import React from 'react'

function Hotels({trip}) {
  //  console.log("Hotel Data:", JSON.stringify(trip, null, 2))
  console.log(trip)
  console.log(trip?.tripdata)
  return (
    <div>
    <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip?.tripdata?.travelPlan?.hotels?.map((item,index)=>(
          <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item?.address)}`}
      target="_blank"
      rel="noopener noreferrer"
      >

            <div key={index} className='hover:scale-106 transition-all cursor-pointer'>
                <img src = "/vacation.jpg" className= 'rounded-xl'/>
                <div className='my-5 flex flex-col gap-2'>
                 <h2 className='font-medium'>{item?.name}</h2>
                 <p className='text-xs text-gray-500'>📍{item?.location}</p>
                 <h2 className='text-sm'>💲{item?.estimated_price_per_night}</h2>
                 <h2 className='text-sm'>⭐{item?.description}</h2>
            </div>
            </div>
            </a>
        ))}
    </div>
  </div>
  )
}

export default Hotels