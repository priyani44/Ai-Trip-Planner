import React from 'react'
import { Button } from "@/components/ui/button"
import {Link} from "react-router-dom"
function Hero() {
  return <div className= 'flex flex-col items-center mx-50 gap-9'>
    <h1 className= 'font-extrabold text-[40px] text-center'
    >
        <span className= 'text-pink-500'>Plan smarter, travel better. </span> Personalized travel plans are just a few clicks away.
    <p className= 'text-xl text-gray-500'>Discover your perfect trip with AI, Your personal trip planner and travel curator. Tailored to your interests and budget.</p>
</h1>
<Link to={"/create-trip"}>
<Button>Get Started, It's Free</Button>
</Link>
  </div>;
}

export default Hero;