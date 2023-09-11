import React from 'react'
import { logo } from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt='logo'
            className='w-28 object-contain'/>
            <button
            type='nutton'
            onClick={() =>window.open("")}
            className='black_btn mt-3'
            
            >

                GitHub

            </button>

        </nav>
        <h1 className='head_text'>
            Summarize Articles with <br className='max-md:hidden'/>
            <span className='orange_gradient'>OpenAI GPT-4</span>
        </h1>
        <h2 className='desc'> Simplify your reading with Summarize, an open source summarizer which
        tranforms long articles into clear and coincise summaries</h2>
    </header> 
  )
}

export default Hero