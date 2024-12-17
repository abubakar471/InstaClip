import React from 'react'
import { UserProfile } from '@clerk/nextjs'
import { CiSettings } from 'react-icons/ci'

const SettingsPage = () => {
    return (
        <div>
            <div className='w-[90%] lg:w-full mx-auto'>
                <h1 className='flex items-center gap-x-2 font-semibold text-white text-2xl md:text-3xl lg:text-4xl pt-6 pb-4 border-b border-[#162845]/50 flex-wrap md:flex-nowrap mb-8 '>
                    <CiSettings className='text-white text-3xl lg:text-3xl xl:text-4xl' /> 
                    Settings
                </h1>

                <div className='w-full xl:w-full'>
                    <UserProfile className="w-full" />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage