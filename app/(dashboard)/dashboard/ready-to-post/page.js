'use cache'

import VideosContainer from '@/components/DashboardPage/VideosContainer/VideosContainer'
import { MdCollections } from 'react-icons/md'
import { auth } from '@clerk/nextjs/server'

const PublishedPage = async () => {
    const { userId } = await auth()

    return (
        <div className=''>
            <div className='border-b border-[#162845]/50 pb-4 flex flex-col gap-y-2'>
                <h1 className='flex items-center gap-x-2 font-semibold text-[#FDFFFF] text-2xl md:text-3xl lg:text-4xl pt-6 pb-0 flex-wrap md:flex-nowrap mb-0'>
                    <MdCollections className='text-[#FDFFFF] text-3xl lg:text-3xl xl:text-4xl' />
                    Your Published Clips
                </h1>
                <p className="text-gray-400">Browse all your published clip that you can download instantly</p>

            </div>
            <div>
                <VideosContainer userId={userId} asset_status={"PUBLISHED"} />
            </div>
        </div>
    )
}

export default PublishedPage