import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../service/firebaseConfig';
import { toast } from "sonner";
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function ViewTrip() {
  const { tripId } = useParams();
  console.log(tripId)
  const[trips,setTrips] = useState([]);
  useEffect(()=>{
    tripId && GetTripData();
  },[tripId])

  // to get info from firebase
const GetTripData = async () => {
  const docRef = doc(db, "AiTrips", tripId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    let tripDataString = data.tripdata;

// Find where JSON actually starts
const jsonStart = tripDataString.indexOf("{");

tripDataString = tripDataString
  .substring(jsonStart)
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
console.log("Before Parse:", tripDataString);
data.tripdata = JSON.parse(tripDataString);
console.log("Parsed Data:", data);
console.log("tripdata:", data.tripdata);
setTrips(data);

    console.log(data);

    setTrips(data);
  } else {
    console.log("No such document!");
  }
};

  return(
   <div className='p-10 md:px-20 lg:px-40 xl:px-55'>
    {/* Information Section  */}
     <InfoSection trip={trips}/>

    {/* Recommended hotels  */}
      <Hotels trip={trips}/>
    {/* Daily plans  */}
       <PlacesToVisit trip={trips}/>
    {/* Footer  */}
   </div>

  )
   
}

export default ViewTrip;