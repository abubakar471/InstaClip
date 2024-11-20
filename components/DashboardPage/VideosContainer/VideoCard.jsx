import React from 'react'
import DeleteClipModal from '../GeneratePage/DeleteClipModal/DeleteClipModal'
import { DefaultPlayer as Video } from "react-html5video"
import 'react-html5video/dist/styles.css'
import { IoMdCloudDownload } from 'react-icons/io'

const VideoCard = ({v, isDeleting, setIsDeleting, isOpen, setIsOpen, handleDownload, handleDelete}) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <div className='text-neutral-400'>
                {v?.title}
            </div>
            <Video className="h-[300px] rounded-lg">
                <source src={`${v?.location}`} type='video/mp4' />
            </Video>

            <div className='flex items-center gap-x-2'>
                <button
                    onClick={() => handleDownload(v?.location, v?.filename)}
                    className="grow mt-2 bg-[#36339e] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2 transition-all duration-200"
                >
                    <span className='hidden md:inline-block'>Download</span>

                    <IoMdCloudDownload className="" />
                </button>

                <DeleteClipModal
                    title={v?.title}
                    asset_url={v?.location}
                    isDeleting={isDeleting}
                    setIsDeleting={setIsDeleting}
                    handleDelete={handleDelete}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
        </div>
    )
}

export default VideoCard