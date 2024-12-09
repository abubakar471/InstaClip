import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

const SocialVideoImport = ({ socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImport }) => {
    return (
        <form key={socialExportedVideoRenderKey} onSubmit={handleSocialVideoImport} className='flex items-start gap-x-2 w-full flex-col mt-10'>

            <input
                type='text'
                placeholder='Paste your YouTube link'
                className='py-2 indent-4 text-sm text-gray-300 grow focus:ring-0 outline-none bg-transparent border border-gray-500/40 w-full rounded-lg'
                onChange={e => setSocialVideoLink(e.target.value)}
            />

            <p className='text-neutral-400 text-xs mb-2 mt-4'>
                Import videos from youtube easily by pasting your link here and save to library for later.
            </p>

            <button disabled={isImportingSocialVideo} type='submit' className={`mt-4 mb-4 ${isImportingSocialVideo ? "px-6" : "px-4"} py-2 bg-[#4F46E5] disabled:bg-[#4F46E5]/20 text-white text-sm rounded-lg hover:bg-[#4F46E5]/80 flex items-center justify-center gap-x-2 transition-all duration-300 ease-in-out w-full `}>
                {
                    isImportingSocialVideo ? (<><ImSpinner3 className='animate-spin text-xl' /></>) : ("Import Video")
                }
            </button>
        </form>
    )
}

export default SocialVideoImport