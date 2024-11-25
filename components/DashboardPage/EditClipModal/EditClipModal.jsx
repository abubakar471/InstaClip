"use client"

import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdOutlineSplitscreen } from "react-icons/md";
import { DefaultPlayer as Video } from "react-html5video"
import 'react-html5video/dist/styles.css'

const EditClipModal = ({ clip_url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();

    return (
        (isSignedIn && isLoaded) && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="grow mt-2 bg-[#348546] !text-white py-2 px-3 rounded hover:bg-[#2a6e39] flex items-center justify-center gap-x-2 border-none">
                        <FaVideo />
                        Edit Clip
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] md:max-w-6xl lg::max-w-7xl h-[80vh] mx-auto !bg-[#162845] border-none flex flex-col gap-y-0 items-start justify-start">
                    <DialogHeader>
                        {/* <DialogTitle className="text-neutral-300">Are you sure you want to delete this clip?</DialogTitle> */}
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>

                    <div className="flex w-full mt-10 gap-x-6 relative">
                        <div className="w-4/12 border-r border-[#4385c2]/20 flex-grow min-h-full">
                            <div className="w-full">
                                <div className="bg-[#235a8d]/40 backdrop-blur-2xl w-[70%] mx-auto text-center py-2 rounded-lg relative cursor-pointer">
                                    <div className="text-[#61a6e7] text-center text-sm flex items-center gap-x-2 px-4">
                                        <MdOutlineSplitscreen />

                                        Split Screen Effect
                                    </div>
                                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-cyan-500/20 w-full rounded-lg blur-md">

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-8/12 h-full">
                            <div className="w-full">
                                <div className="">
                                    <Video className="h-[300px] rounded-lg">
                                        <source src={`${clip_url}`} type='video/mp4' />
                                    </Video>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default EditClipModal