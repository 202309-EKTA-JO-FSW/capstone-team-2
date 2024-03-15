"use client";
import React from "react";

const Hero = () => {
  

  return (
    <div className="flex flex-col bg-white">
    <div className="flex items-center justify-center h-screen relative ">
      <img src="/intro.png" alt="Intro" className="w-full max-h-full mt-40" />
      <div className="absolute text-center text-[#2C2F24] mt-28">
        <h1 className="font-serif text-8xl mb-5 leading-11 ">Best food for <br /> your taste</h1>
        <p className="mt-6 mb-14 text-xl font-normal">Discover delectable cuisine and unforgettable moments <br /> in our welcoming, culinary haven.</p>
        
        <div className="flex">
          <input className="mr-2 ml-20 bg-gray-200 rounded-md px-14 py-3.5 focus:border-gray-900" placeholder="Enter your delivery location"/>
          <button className="bg-[#AD343E] text-white px-4 rounded-md cursor-pointer mr-20">Order now</button>
        </div>
      </div>
    </div>

    <div className="text-black text-left mt-28 ml-36 text-2xl font-bold">
      <h2>How it works</h2>

      <div className="grid grid-cols-3 gap-8 mt-12">
        <div >
          <img src="/step1.jpeg" className="w-80 rounded-md"/>
          <h2 className="mt-8">Step 1</h2>
          <p className="mt-8 text-xl font-medium">Enter your locatin. Simply type <br/> in your address or enable <br/> location servicesfor a precise</p>
        </div>

        <div>
          <img src="/step2.jpeg" className="w-80 rounded-md"/>
          <h2 className="mt-8">Step 2</h2>
          <p className="mt-8 text-xl font-medium">Choose a restaurant and a <br/> mouthwatering dish. The perfect <br/> quick bite is just a click away.</p>
        </div>

        <div>
          <img src="/step3.jpeg" className="w-80 rounded-md"/>
          <h2 className="mt-8">Step 3</h2>
          <p className="mt-8 text-xl font-medium">Complete your payment. Sit <br/> back and relax while we prepare <br/> your delicious food.</p>
        </div>
      </div>
    </div>

    <div className="flex gap-7 text-black font-serif text-left mt-20 pt-32 pl-16 pb-10 text-2xl font-bold bg-[#F9F9F7]">
       <img src="/food_delivery.png" className="h-[650px]"/>

       <div className="ml-14 mt-24">
          <h2 className="font-thin text-6xl mb-8 leading-tight text-[#2C2F24]">Fastest Food <br/> Delivery in City</h2>
          <p className="font-sans font-normal leading-10">Experience lightning-fast food delivery services <br /> tailored to the bustling pace of city life. With our efficient delivery network and diverse culinary <br /> offerings, satisfy your cravings in record time. </p>

          <div >
            <div className="mt-12">
              <img src="/clock.png" className="inline-block"/>
              <p className="inline-block ml-6 font-sans font-medium align-middle">Delivery within 30 minutes</p>
            </div>

            <div className="mt-2">
              <img src="/offer.png" className="inline-block"/>
              <p className="inline-block ml-7 font-sans font-medium align-middle">Best Offer & Prices</p>
            </div>

            <div className="mt-2">
              <img src="/online.png" className="inline-block "/>
              <p className="inline-block ml-6 font-sans font-medium	align-middle">Online Services Available</p>
            </div>
          </div>
       </div>
    </div>
  
    
    <div className="text-black text-left mt-16 ml-36 text-2xl font-bold">
      <h2>Join the FoodieHub community</h2>
      
      <div className="grid grid-cols-2 gap-[15rem] mt-12">
       <div>
          <img src="/raider.jpeg" className="w-80 ml-32 rounded-md"/>
          <img src="/partner.jpeg" className="w-80 ml-32 mt-20 rounded-md"/>
          <img src="/team.jpeg" className="w-80 ml-32 mt-20 rounded-md"/>
        </div>

        <div>
          <div>
             <h2 className="mt-8 text-3xl font-bold">Become a raider</h2>
              <p className="mt-8 text-xl font-medium">Earn money by delivering food <br/> from restaurants. All you need is a <br/> bike and a passion for great service.</p>
    
              <button className="bg-[#AD343E] text-white font-semibold text-lg h-[62px] w-48 mt-6 rounded-md cursor-pointer ">Start Riding</button>
           </div>

           <div className="mt-[11rem]">
             <h2 className="mt-8 text-3xl font-bold	">Partner with Us</h2>
              <p className="mt-8 text-xl font-medium">FoodieHub helps restaurants <br /> thrive with online ordering, <br /> loyalty programs, and more.</p>
    
              <button className="bg-[#AD343E] text-white font-semibold text-lg h-[62px] w-48 mt-6 rounded-md cursor-pointer ">Join Now</button>
           </div>

           <div className="mt-[11rem]">
             <h2 className="mt-8 text-3xl font-bold	">Join Our Team</h2>
              <p className="mt-8 text-xl font-medium">Be part of a team that's <br /> building an exceptional <br /> delivery service.</p>
    
              <button className="bg-[#AD343E] text-white font-semibold text-lg h-[62px] w-48 mt-6 rounded-md cursor-pointer ">Work with Us</button>
           </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default Hero;
