"use client"

import React from 'react'
import { LuClapperboard } from 'react-icons/lu'
import { DiYii } from "react-icons/di";
import { IoIosLink } from 'react-icons/io';
import { useUser } from '@clerk/nextjs';

const OverviewStats = () => {
    const {user} = useUser()
    return (
      user && (
        <div className='mt-14 flex items-center gap-x-4 gap-y-2 flex-wrap xl:flex-nowrap'>
        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-gray-500 bg-opacity-5 backdrop-blur-2xl flex items-center gap-x-3 text-neutral-300'>
            <LuClapperboard className="text-4xl" />
            <div className='flex flex-col gap-y-0'>
                <span className='text-sm'>Videos Generated</span>
                <span className='text-lg'>1 Videos</span>
            </div>
        </div>

        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-gray-500 bg-opacity-5 backdrop-blur-2xl flex items-center gap-x-3 text-neutral-300'>
            <IoIosLink className="text-4xl" />

            <div className='flex flex-col gap-y-0'>
                <span className='text-sm'>Linked Email Accounts</span>
                <span className='text-lg'>{user?.emailAddresses[0].emailAddress}</span>
            </div>
        </div>
        <div className='w-full sm:w-fit px-6 py-4 rounded-2xl bg-gray-500 bg-opacity-5 backdrop-blur-2xl flex items-center gap-x-3 text-neutral-300'>
            <DiYii className="text-4xl" />
            <div className='flex flex-col gap-y-0'>
                <span className='text-sm'>Your Plan</span>
                <span className='text-lg text-[#1aadf1]'>Free</span>
            </div>
        </div>
    </div>
      )
    )
}

export default OverviewStats