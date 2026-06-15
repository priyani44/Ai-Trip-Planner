import React, {useState, useEffect} from 'react'
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions } from '@/constants/Options';
import { SelectTravelsList } from '@/constants/Options';
import {Button} from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_PROMPT } from "../constants/options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { chatSession } from "../service/AIModel";
import { useNavigate} from 'react-router-dom';

function CreateTrip() {
  const [destination, setDestination] = useState('')
const [places, setPlaces] = useState([]);

const [formData, setFormData] = useState({});
const [openDialog, setOpenDialog] = useState(false);
const[loading, setLoading] = useState(false);
const navigate = useNavigate();
const handleInputChange = (name, value) => {

if(name == 'noOfdays'&&value>5) {
 alert('Please select a value less than or equal to 5');
  return;
}

  setFormData({
    ...formData,
    [name]: value,
  });
};

useEffect(() =>{
  console.log(formData);
},[formData])

const login=useGoogleLogin({
  onSuccess: (codeResp) => {console.log(codeResp)
    GetUserProfile(codeResp);
 } , 
  onError: (error) => console.log('Login Failed:', error)
})

const OnGenerateTrip =async() => {
  const user = localStorage.getItem('user');
  if(!user){
    setOpenDialog(true); 
    return ;
  }

  
  const SaveAiTrip=async(TripData) =>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    // Add a new document in collection "cities"
await setDoc(doc(db, "AiTrips", docId), {
  userSelection: formData,
  tripdata: TripData,
  userEmail: user?.email,
  id:docId
});
 setLoading(false);
 navigate(`/view-trip/${docId}`);
  }

  if(
    !formData?.destination ||
    !formData?.noOfDays ||
    !formData?.budget ||
    !formData?.traveler
  ){
    toast("Please fill all the details.")
    return;
  }
   setLoading(true);
  const FINAL_PROMPT=AI_PROMPT
  .replace ('{location}', formData?.destination)
  .replace ('{totalDays}', formData?.noOfDays)
  .replace ('{Traveler}', formData?.traveler)
  .replace ('{budget}', formData?.budget)
  .replace ('{totalDays}', formData?.noOfDays)
// console.log(FINAL_PROMPT);

console.log(FINAL_PROMPT);
console.log(formData);
try {
  const result = await chatSession.sendMessage(FINAL_PROMPT);
  console.log(result?.response?.text());
  SaveAiTrip(result?.response?.text());
} catch (error) {
  console.log(error);
  toast("AI service is busy. Please try again in a few minutes.");
} finally {
  setLoading(false);
}

}

const GetUserProfile = (tokenInfo) => {
  axios.get('https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + tokenInfo?.access_token, {
    headers: {
      Authorization: `Bearer ${tokenInfo.access_token}`,
      Accept:'Application/json'
    },
  })
  .then((response) => {
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    setOpenDialog(false);
    OnGenerateTrip();
  })
  .catch((error) => {
    console.error('Error fetching user profile:', error);
  });
};

const searchPlaces = async (value) => {
  setDestination(value);

  if (value.length < 2) {
    setPlaces([]);
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`
    );

    const data = await response.json();
    setPlaces(data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className= 'sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className= 'mt-3 text-gray-500 text-xl'>Provide some basic information about your ideal trip and our planner will generate a customised itinerary.</p>
   
    <div className= 'mt-10 flex flex-col gap-9'> 
        <div>
        <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2> 
           <input
    type="text"
    value={destination}
    onChange={(e) => searchPlaces(e.target.value)}
    placeholder="Search city or destination"
    className="w-full p-3 border rounded-lg"
  />

  {places.length > 0 && (
    <div className="border rounded-lg mt-2 bg-white">
      {places.map((place) => (
        <div
          key={place.place_id}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setDestination(place.display_name);
            handleInputChange("destination", place.display_name);
             setPlaces([]);
             console.log(place);
          }}
        >
          {place.display_name}
        </div>
      ))}
    </div>
  )}
</div> 
<div>
   <h2 className='text-xl my-3 font-medium'>For how many days you are planning to travel?</h2> 
   <Input placeholder={'Ex-4'} type="number" 
   onChange={(e) => handleInputChange('noOfDays', e.target.value)}
   
   />
</div>
     </div> 
     <div>
      <h2 className='text-xl my-3 font-medium'>What is your travel budget?</h2>
     <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectBudgetOptions.map((item,index) =>(
        <div key={index}
        onClick={() => handleInputChange('budget', item.title)}
        className={'p-4 border cursor-pointer rounded-lg hover:shadow-lg ' + 
        (formData.budget === item.title ? 'shadow-lg border-black' : '')}>
          <h2 className='text-5xl'>{item.icon}</h2>
          <h2 className='text-lg font-bold'>{item.title}</h2>
          <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
        </div>
      ))}
     </div>

     <div>
      <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with?</h2>
     <div className='grid grid-cols-3 gap-5 mt-5'>
      {SelectTravelsList.map((item,index) =>(
        <div key={index}
        onClick={() => handleInputChange('traveler', item.people)}
        className={'p-4 border cursor-pointer rounded-lg hover:shadow ' + 
        (formData.traveler === item.people ? 'shadow-lg border-black' : '')}>
          <h2 className='text-5xl'>{item.icon}</h2>
          <h2 className='text-lg font-bold'>{item.title}</h2>
          <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
        </div>
      ))}
     </div>

     </div>
     </div>  
  
  <div className='my-10 justify-end flex'>
    <Button 
    disabled={loading}
    onClick={OnGenerateTrip}>
      {loading?
      <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
    }
     </Button>
  </div>

  <Dialog open={openDialog} >
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        <img src ="/logo.svg" alt="Logo" className="w-32 h-32 mx-auto font-bold"/>
        <h2>Sign In with Google</h2>
        <p>Sign In with Google Authentication to continue</p>
        <Button
        
        onClick = {login}
        className="w-full mt-5">Sign In with Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
   </div>
)
}

export default CreateTrip
