"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { FaRegClipboard } from 'react-icons/fa6';
import { useToast } from '@/hooks/use-toast';
import { BiImport } from 'react-icons/bi';
import CreateTitleModal from '../CreateTitleModal/CreateTitleModal';
import { cn } from '@/lib/utils';
import { FaCheck } from 'react-icons/fa';

const ImportAssetModal = ({ title, url, cover, category, source, id, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const copyToClipboard = async (text) => {
        console.log("clipboard : ", text);
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Copied to clipboard",
                variant: "default",
                action: <div className='!bg-[#3faa56] p-1 flex items-center justify-center rounded-full'>
                    <FaCheck className='!text-[#FDFFFF]' />
                </div>
            })
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    }

    return (
        <div className={cn("h-[350px]", className)}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className={`w-full h-full rounded-2xl cursor-pointer relative`} style={{
                        background: `url("${cover}") rgba(0,0,0,0.3)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundBlendMode: "darken"
                    }}>
                        {/* <Image src={`${cover}`} width={800} height={800} alt={`${title}`} className='rounded-2xl' /> */}

                        <div className='absolute bottom-0 left-0 w-full z-50 bg-gray-500/20 backdrop-blur-lg rounded-b-2xl py-4'>
                            <p className='text-white text-xs px-4'>{title}</p>
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent className="max-w-[90%] sm:max-w-[90%] md:max-w-3xl lg::max-w-7xl h-[80vh] mx-auto rounded-3xl !bg-[#0F1117] border-none flex flex-col gap-y-0 items-start justify-start overflow-y-auto pb-10">
                    <DialogHeader>
                        {/* <DialogTitle className="text-neutral-300">Are you sure you want to delete this clip?</DialogTitle> */}
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>


                    <div className='w-full'>
                        <Video className="w-full h-[400px] rounded-3xl mt-4">
                            <source src={`${url}`} type='video/mp4' className='' />
                        </Video>
                    </div>

                    <div className='w-full flex items-end justify-end mt-2'>
                        <div className='flex items-center gap-x-2 flex-wrap sm:flex-nowrap justify-end'>
                            {/* <button className='flex items-center gap-x-2 w-fit bg-[#4A2AC0] text-xs text-white px-4 py-2 rounded-lg'>
                                <BiImport />
                                Import to library
                            </button> */}



                            <div className='flex items-center gap-x-2 text-sm text-neutral-200 pt-2'>
                                <div onClick={() => copyToClipboard(id)} className='cursor-pointer bg-gray-500/40 hover:bg-gray-500/30 rounded-md flex items-center justify-center p-2'>
                                    <FaRegClipboard />
                                </div>

                                {id?.length > 10 ? id?.slice(0, 10) + "..." : id}

                            </div>
                            <CreateTitleModal asset_url={url} public_thumbnail={cover} className={"!bg-[#4F46E5] hover:!bg-[#4F46E5]/30"} />
                        </div>
                    </div>

                    <div className='mt-4 px-2'>
                        <div className='mt-4'>
                            <h4 className='text-xs text-neutral-500'>Title</h4>
                            <p className='text-neutral-200 text-sm mt-2'>
                                {
                                    title
                                }
                            </p>
                        </div>

                        <div className='mt-4'>
                            <h4 className='text-xs text-neutral-500'>Source</h4>
                            <p className='text-neutral-200 text-sm mt-2'>
                                {
                                    source === "FEATURED_ASSETS" && ("#featured-assets")
                                }

                                {
                                    source === "PUBLIC_ASSETS" && ("#community-creations")
                                }
                            </p>
                        </div>

                        {/* <div className='mt-4'>
                            <h4 className='text-xs text-neutral-500'>Description</h4>
                            <p className='text-neutral-200 text-sm mt-2'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi odit magni eius ad vel excepturi qui ipsa. Laudantium cupiditate, accusantium adipisci architecto pariatur voluptas repellendus libero expedita esse tenetur fugit.
                            </p>
                        </div> */}
                    </div>
                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ImportAssetModal