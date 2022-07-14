import React from 'react'
import Github from '../assets/images/github.png'
import Telegram from '../assets/images/telegram.png'
import Twitter from '../assets/images/twitter.png'
import Alby from '../assets/images/Christmas_Alby_front.png'

export default function Footer() {
  return (
    <div className='py-20 mt-96 text-center mx-auto bg-white'>
      <div>
        <p className='text-[32px] font-bold w-2/4 pt-9 mx-auto font-primary leading-tight'>Alby is open source and built by the community for the community. It is currently in alpha stage. So be gentle, please.</p>
      </div>
      <div className='mt-[65px] w-[77.638%] relative mx-auto pt-[99px] rounded-[30px] bg-mandy-red'>
        <p className='font-primary w-[78.89%] mx-auto font-bold text-5xl leading-[60px] text-white'>Do you have feedback or need help?
          We love to hear from you.</p>
        <div className='mt-[45px] flex flex-row justify-center gap-[70px] pb-[83px]'>
          <div className='h-[61px] w-[61px]'>
            <img src={Github} alt='github' />
          </div>
          <div  className='h-[61px] w-[61px]'>
            <img src={Telegram} alt='telegram' />
          </div>
          <div  className='h-[61px] w-[61px]'>
            <img src={Twitter} alt='twitter' />
          </div>
        </div>
        <img src={Alby} alt='alby' className='absolute right-0 bottom-0 ' />
      </div>
    </div>
  )
}
