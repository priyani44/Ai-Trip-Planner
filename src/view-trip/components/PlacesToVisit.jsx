import React from 'react'

function PlacesToVisit({trip}) {
  return (
   <div>
  <div className='font-bold text-lg'>
    Places To Visit
  </div>

  <div>
    {trip?.tripdata?.itinerary?.map((item, index) => (
      <div key={index}>
        <h2 className='font-medium text-lg'>
          Day {item.day}
        </h2>
        <h3 className="font-medium text-lg">
        {item.theme}
      </h3>

      {item.activities?.map((place, index) => (
        <div key={index} className="border p-3 rounded-lg my-3">
          <h2 className="font-bold">
            {place.place_name}
          </h2>
          <p>{place.place_details}</p>

          <p>
            <strong>Best Time:</strong>{" "}
            {place.best_time_to_visit}
          </p>

          <p>
            <strong>Ticket:</strong>{" "}
            {place.ticket_pricing_eur}
          </p>
        </div>
      ))}
      </div>
    ))}
  </div>
</div>
  )
}

export default PlacesToVisit