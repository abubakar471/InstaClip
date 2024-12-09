import BuilderContainer from '@/components/DashboardPage/CopyClipsPage/BuilderContainer/BuilderContainer';
import SocialVideoLayouts from '@/components/DashboardPage/CopyClipsPage/SocialVideoLayouts/SocialVideoLayouts';
import React from 'react'


const CopyClipsPage = () => {
    return (
        <div>
            <div className='w-[90%] 2xl:w-[60%] mx-auto my-4'>
                <div className='mt-4'>
                    <BuilderContainer />
                </div>

                <SocialVideoLayouts />
            </div>
        </div>
    )
}

export default CopyClipsPage