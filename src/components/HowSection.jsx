import React from 'react'
import ChristmasTree from "../assets/images/christmas-tree.png";
import SnowIcon from "../assets/images/snow-icon.png";

function HowSection() {
    return (
        <div className='w-full about-background relative'>
            <div className='pt-52 text-center mx-auto relative'>
                <p className='w-3/5 2xl:w-2/6 text-[32px] font-primary mx-auto'>
                This showcase was built using WebLN. WebLN is a library and set of specifications for lightning apps and client providers to facilitate communication between apps and users' lightning nodes in a secure way. <br/><br/>
                It provides a programmatic, permissioned interface for letting applications ask users to send payments, generate invoices to receive payments, and much more. This documentation covers how to use WebLN in Lightning-driven applications.
                </p>
            </div>
            
            <div className='absolute left-0'>
            <img src={ChristmasTree} alt="christmas" className='w-[85%]'/>
            </div>
            <div className='absolute top-16 right-48'>
            <img src={SnowIcon} alt="christmas" className='w-[85%]'/>
            </div>
            </div>
    )
}

export default HowSection