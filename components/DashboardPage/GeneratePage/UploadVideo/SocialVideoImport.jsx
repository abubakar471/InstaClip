import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

const SocialVideoImport = ({ socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImport }) => {
    return (
        <form key={socialExportedVideoRenderKey} onSubmit={handleSocialVideoImport} className='flex items-center gap-x-2 w-full lg:w-[50%]'>
            <input 
            type='text' 
            placeholder='Paste your YouTube link' 
            className='py-2 rounded-none indent-4 text-sm text-gray-300 grow focus:ring-0 outline-none bg-transparent border border-gray-500/40'
            onChange={e => setSocialVideoLink(e.target.value)}
             />
            <button disabled={isImportingSocialVideo} type='submit' className={`mt-4 mb-4 ${isImportingSocialVideo ? "px-6" : "px-4"} py-2 bg-[#4a2ac0] disabled:bg-[#473781] text-white text-sm rounded-lg hover:bg-[#392a6e] flex items-center gap-x-2 transition-all duration-300 ease-in-out`}>
               {
                isImportingSocialVideo ? (<><ImSpinner3 className='animate-spin text-xl' /></>) : ("Import Video")
               }
                </button>
        </form>
    )
}

export default SocialVideoImport