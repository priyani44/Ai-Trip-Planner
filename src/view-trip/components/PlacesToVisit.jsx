import React from 'react'

function PlacesToVisit({trip}) {
  // console.log("Places to visit:" , JSON.stringify(trip,null,2))
  console.log(trip)
  return (
   <div>
  <div className='font-bold text-lg'>
    Places To Visit
  </div>

  <div>
    {trip?.tripdata?.travelPlan?.itinerary?.map((item, index) => (
      <div key={index}>
        <h2 className='font-medium text-lg'>
          Day {item.day}
        </h2>
       {item.activities?.map((activity,index)=>(
  <div key={index}>
    <h3 className='font-medium text-sm text-red-600'>{activity.time}</h3>
    <p>{activity.description}</p>
  </div>
))}


      </div>
    ))}
  </div>
</div>
  )
}

export default PlacesToVisit