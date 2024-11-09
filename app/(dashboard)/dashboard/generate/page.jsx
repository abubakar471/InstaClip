import AssetContainer from '@/components/DashboardPage/GeneratePage/AssetContainer/AssetContainer'
import React from 'react'

const GeneratePage = () => {
    return (
        <div>
            <h1 className='font-semibold bg-gradient-to-r bg-clip-text from-[#162845] via-purple-700 to-[#30a4da] text-transparent text-4xl pt-6 pb-4 border-b border-[#162845]/50 '>
                Generate Clips
            </h1>

            <AssetContainer />
        </div>
    )
}

export default GeneratePage