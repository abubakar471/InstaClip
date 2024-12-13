import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Clock, Film, Loader2, Play, Youtube } from 'lucide-react'
import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

const SocialVideoImport = ({ socialExportedVideoRenderKey, isImportingSocialVideo, setIsImportingSocialVideo, socialVideoLink, setSocialVideoLink, handleSocialVideoImport, message }) => {
    return (
        // <form key={socialExportedVideoRenderKey} onSubmit={handleSocialVideoImport} className='flex items-start gap-x-2 w-full flex-col mt-10'>

        //     <input
        //         type='text'
        //         placeholder='Paste your YouTube URL'
        //         className='py-2 indent-4 text-sm text-gray-300 grow focus:ring-0 outline-none bg-transparent border border-gray-500/40 w-full rounded-lg'
        //         onChange={e => setSocialVideoLink(e.target.value)}
        //     />

        //     <p className='text-neutral-400 text-xs mb-2 mt-4'>
        //         {
        //             message ? message : "Import videos from youtube easily by pasting your link here and save to library for later."
        //         }

        //     </p>

        //     <button disabled={isImportingSocialVideo} type='submit' className={`mt-4 mb-4 ${isImportingSocialVideo ? "px-6" : "px-4"} py-2 bg-[#4F46E5] disabled:bg-[#4F46E5]/20 text-white text-sm rounded-lg hover:bg-[#4F46E5]/80 flex items-center justify-center gap-x-2 transition-all duration-300 ease-in-out w-full `}>
        //         {
        //             isImportingSocialVideo ? (<><ImSpinner3 className='animate-spin text-xl' /></>) : ("Import Video")
        //         }
        //     </button>
        // </form>

        <div className="w-full mt-9">
            <div className={cn(
                "p-6 bg-black/20 backdrop-blur-sm rounded-xl border-[3px] border-dashed border-white/10 transition-all min-h-[160px] flex items-center justify-center",
                socialVideoLink ? "border-2" : "border-white/5"
            )}>
                <div className="flex flex-col items-center gap-6 max-w-xl mx-auto w-full">
                    <div className="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center">
                        {isImportingSocialVideo ? (
                            <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
                        ) : (
                            <Youtube className="w-8 h-8 text-red-400" />
                        )}
                    </div>
                    <div className="text-center w-full space-y-6">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-2">
                                {isImportingSocialVideo ? 'Importing...' : 'Import from YouTube'}
                            </h3>
                            <p className="text-sm text-gray-400">
                                Transform your YouTube content into engaging short-form videos
                            </p>
                        </div>

                        <div className="space-y-4">
                            <form onSubmit={handleSocialVideoImport} className="flex gap-2">
                                <Input
                                    type="url"
                                    placeholder="Paste YouTube URL here"
                                    className="bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                                    value={socialVideoLink}
                                    onChange={(e) => setSocialVideoLink(e.target.value)}
                                    disabled={isImportingSocialVideo}
                                />
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white whitespace-nowrap"
                                    disabled={isImportingSocialVideo || !socialVideoLink}
                                >
                                    {isImportingSocialVideo ? 'Importing...' : 'Import'}
                                </Button>
                            </form>

                            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <Play className="w-4 h-4 mr-1" /> Any YouTube Video
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" /> Auto-trimming
                                </span>
                                <span className="flex items-center">
                                    <Film className="w-4 h-4 mr-1" /> Multiple Shorts
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialVideoImport