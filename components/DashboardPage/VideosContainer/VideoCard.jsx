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
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import VideoPlayerModal from '../GeneratePage/VideoPlayerModal/VideoPlayerModal';

const VideoCard = ({v, isDeleting, setIsDeleting, isOpen, setIsOpen, handleDownload, handleDelete}) => {
    return (
        <div>
            <div className="flex flex-col gap-y-2 w-full relative h-[400px] rounded-2xl group">
                    {/* <Image src={`${v?.thumbnails[2]}`} alt={`${v?.location}`} width={600} height={600} className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 rounded-2xl"  /> */}
                    {/* <Video className="w-full h-[350px] rounded-2xl" controls={false}>
                        <source src={`${v?.location}`} type='video/mp4' className='' />
                    </Video> */}

                    <div className="z-50 absolute  top-[45%] left-1/2 right-1/3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out">
                        <VideoPlayerModal v={v} />
                    </div>
                    <div style={{
                        background: `url("${v?.thumbnail}") rgba(0,0,0,0.4)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundBlendMode: 'darken'
                    }} className="bg-neutral-500/10 absolute top-0 left-0 bottom-0 w-full h-full rounded-2xl" >
                    </div>
                </div>
        </div>
    )
}

export default VideoCard