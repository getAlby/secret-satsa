import React from 'react'
import GiftImage from "../assets/images/gift.png";
import SnowImage from "../assets/images/snow.png";

function Gift() {
    return (
        <div className='w-full about-background relative'>
            <div className='py-80 text-center mx-auto relative'>
                <p className='w-3/5 2xl:w-2/6 text-[32px] font-primary mx-auto'>
                   This website aggregates tweets with QR codes of Lightning invoices using the #SecretSatsa hashtag.<br/><br/>
                   To see how you can receive or send a gift yourself check out https://secretsatsa.com/ 
                   or just use Alby to pay an invoice and make someone else happy
                </p>
            </div>
            
            <div className='absolute top-0 right-0'>
            <img src={SnowImage} alt="snow" className='w-[95%]'/>
            </div>
            <div className='absolute bottom-0 '>
            <img src={GiftImage} alt="gift" className='w-[70%]'/>
            </div>
            </div>
    )
}

export default Gift
