import VideosContainer from '@/components/DashboardPage/VideosContainer/VideosContainer'
import { MdCollections } from 'react-icons/md'
import { auth } from '@clerk/nextjs/server'

const VideosPage = async() => {
    const { userId } = await auth()

    return (
        <div className='mt-8'>
            <h1 className='flex items-center gap-x-2 font-semibold bg-gradient-to-r bg-clip-text from-[#728ee9] via-purple-700 to-[#30a4da] text-transparent text-2xl md:text-3xl lg:text-4xl pt-6 pb-4 border-b border-[#162845]/50 flex-wrap md:flex-nowrap mb-8 '>
                <MdCollections className='text-[#728ee9] text-3xl lg:text-3xl xl:text-4xl' />
                Your Videos Collection
            </h1>

            <div>
                <VideosContainer userId={userId} />
            </div>
        </div>
    )
}

export default VideosPage