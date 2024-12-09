import BuilderContainer from '@/components/DashboardPage/CopyClipsPage/BuilderContainer/BuilderContainer';
import React from 'react'
import { GoPlusCircle } from "react-icons/go";

const CopyClipsPage = () => {
    return (
        <div>
            <div className='w-[90%] mx-auto my-4'>
                <h1 className='text-3xl text-[#FDFFFF] font-semibold'>Create New Video</h1>
                <p className='text-neutral-500 text-sm mt-2'>Import or create content from various platforms</p>
                <div className='flex items-center gap-x-2 text-[#FDFFFF] mt-6'>
                    <GoPlusCircle className='text-[#7171BB] text-[1.3rem]' />
                    Import Content
                </div>

                <div className='mt-4'>
                    <BuilderContainer />
                </div>
            </div>
        </div>
    )
}

export default CopyClipsPage