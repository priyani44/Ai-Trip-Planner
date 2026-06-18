import React from 'react'
import {useEffect} from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
 
 useEffect(() =>{
  console.log(user)
 },[])
  return (
 <div className = 'p-3 shadow-sm flex justify-between items-center px-5'>
    <img src="/logo.svg"/>
   <div>
     {user ?
     <div className='flex items-center gap-3'> 
      <Button variant='outline'  className='rounded-full'>My Trips</Button>
      {/* <img src={user?.picture} className='h-35px w-35px rounded-full'/> */}
     <Popover>
  <PopoverTrigger >
     <img src={user?.picture} className='h-35px w-35px rounded-full'/>
     </PopoverTrigger>
  <PopoverContent>
    <h2>Logout</h2>
  </PopoverContent>
</Popover>
     </div>
     :
      <Button>Sign In</Button>
     }
    </div>
   </div>
  )
}

export default Header