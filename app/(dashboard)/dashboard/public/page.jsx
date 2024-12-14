import PublicAssetsContainer from '@/components/DashboardPage/PublicPage/PublicAssetsContainer'
import { Film } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='w-[90%] lg:w-full mx-auto'>
            <h1 className='flex items-center gap-x-2 font-semibold bg-gradient-to-r bg-clip-text from-[#728ee9] via-purple-700 to-[#30a4da] text-transparent text-2xl md:text-3xl lg:text-4xl pt-6 pb-4 border-b border-[#162845]/50 flex-wrap md:flex-nowrap mb-8 '>
                <Film size={40} className='text-[#728ee9] text-3xl lg:text-3xl xl:text-4xl' />
                Public Library
            </h1>

            <div>
                <PublicAssetsContainer />
            </div>
        </div>
    )
}

export default page