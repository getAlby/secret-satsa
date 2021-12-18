import React from 'react'
import Snowfall from "react-snowfall";
import SnowIcon from "../assets/images/snow-icon.png";
import Stick from "../assets/images/stick.png";


function StepsSection() {
    return (
        <div className='w-full bg-white relative'>
        <div className='text-center pt-60 w-4/6 2xl:w-2/6 mx-auto relative'>
            <p className=' text-[32px] font-primary mx-auto'>
            Alby is a browser extension to create the best online experience to consume and reward content or services online.
            </p>

             <div className='flex py-40 w-full justify-between'>
                 <div>
                 <div className='circle-icon-color rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white text-[32px]'>1</div>
                 <div className='text-black pt-[23px]'>
                     <h1 className='text-[32px] font-bold'>Install Alby </h1>
                     <p className='w-64 pt-4 pb-24 text-[24px]'>Available on chrome and Firefox</p>
                 </div>
                 </div>

                 <div>
                 <div className='circle-icon-color rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white text-[32px]'>2</div>
                 <div className='text-black pt-[23px]'>
                     <h1 className='text-[32px] font-bold'>Connect </h1>
                     <p className='w-64 pt-4 pb-24 text-[24px]'>Connect Alby to your existing Lightning wallet or open a new wallet with Alby</p>
                 </div>
                 </div>

                 <div>
                 <div className='circle-icon-color rounded-full w-16 h-16 mx-auto flex items-center justify-center text-white text-[32px]'>3</div>
                 <div className='text-black pt-[23px]'>
                     <h1 className='text-[32px] font-bold'>Start Using</h1>
                     <p className='w-64 pt-4 pb-24 text-[24px]'>Immediately start sending and receiving Bitcoin payments with your normal browser.</p>
                 </div>
                 </div>
                 

             </div>
        </div>
        
        <div className='absolute top-48 left-24 '>
        <img src={SnowIcon} alt="christmas" className='w-[65%]'/>
        </div>
        <div className='absolute bottom-0 right-0'>
        <img src={Stick} alt="christmas" className='w-[60%] mx-auto'/>
        </div>
        <Snowfall className=" min-h-screen" />
        </div>
    )
}

export default StepsSection
