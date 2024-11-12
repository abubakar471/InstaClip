import AssetContainer from '@/components/DashboardPage/GeneratePage/AssetContainer/AssetContainer'
import RecentCreatedVideos from '@/components/DashboardPage/RecentCreatedVideos/RecentCreatedVideos'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const GeneratePage = async() => {
    const { userId } = await auth();

    return (
        <div>
            <h1 className='font-semibold bg-gradient-to-r bg-clip-text from-[#728ee9] via-purple-700 to-[#30a4da] text-transparent text-4xl pt-6 pb-4 border-b border-[#162845]/50 '>
                Generate Clips
            </h1>

            <AssetContainer userId={userId} />

        
        </div>
    )
}

export default GeneratePage