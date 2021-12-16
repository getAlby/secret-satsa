import React from 'react'
import GiftImage from "../assets/images/gift.png";
import SnowImage from "../assets/images/snow.png";

function Gift() {
    return (
        <div className='w-full about-background'>
            <div className='py-80 text-center mx-auto'>
                <p className='w-2/4 2xl:w-2/5 text-[32px] mx-auto'>
                   This website aggregates tweets with QR codes of Lightning invoices using the #SecretSatsa hashtag.<br/><br/>
                   To see how you can receive or send a gift yourself check out https://secretsatsa.com/ 
                   or just use Alby to pay an invoice and make someone else happy
                </p>
            </div>
            <div className='absolute bottom-0'>
            <img src={GiftImage} alt="header" className='w-[70%]'/>
            </div>
            <div className='absolute top-5 right-0'>
            <img src={SnowImage} alt="header" className='w-[90%]'/>
            </div>
            </div>
    )
}

export default Gift
