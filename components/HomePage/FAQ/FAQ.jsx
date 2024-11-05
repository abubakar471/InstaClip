import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RiSparklingFill } from 'react-icons/ri'
import { FAQAccordion } from './FAQAccordion'

const FAQ = () => {
    return (
        <div className='mt-40 lg:mb-24 scroll-mt-20' id='faqs'>
            <div className='max-w-7xl mx-auto p-10 min-h-[50vh] bg-transparent'>
                <div className='flex items-center justify-between flex-wrap lg:flex-nowrap gap-y-8'>
                    <div className='w-full lg:w-4/6'>
                        <div>
                            <div className="mb-6 w-fit px-4 py-[5px] rounded-full flex items-center gap-x-2 bg-gradient-to-b from-[#76aee4]/60 via-transparent to-[#387ebe]/60 border border-white/10">
                                <RiSparklingFill className="text-[#c1dcf1] text-xs" />
                                <span className="text-[#c1dcf1] text-xs">FAQs</span>
                            </div>
                            <p className='text-5xl text-[#85c4f3]'>Frequently <span className='text-[#47bbe9]'>Asked</span></p>
                            <p className='text-[#c1dcf1] text-5xl'>Questions</p>
                        </div>
                    </div>

                    <div className='w-full lg:w-2/6 flex flex-col gap-y-4'>
                        <div className='text-[#c1dcf1]'>
                            InstaClip lets you create viral short-form videos for your audience in seconds, using AI. No more hours spent editing.
                        </div>
                        <Link href={"/"} className='w-fit bg-gradient-to-b from-[#76aee4]/60 via-transparent to-[#387ebe]/60 border border-white/10 text-[#c1dcf1] px-5 py-2 rounded-lg hidden md:flex items-center gap-x-2'>
                            Get Started Now
                            <IoIosArrowForward />
                        </Link>
                    </div>
                </div>

                <FAQAccordion />
            </div>
        </div>
    )
}

export default FAQ