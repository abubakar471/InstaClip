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
import { useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdOutlineSplitscreen } from "react-icons/md";
import { DefaultPlayer as Video } from "react-html5video"
import 'react-html5video/dist/styles.css'
import { ImSpinner3 } from "react-icons/im";

const EditClipModal = ({ clip_url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const uploadBtnRef = useRef(null);
    const fileInputRef = useRef(null);

    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setTimeout(() => {
                uploadBtnRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
            }, 100);
        } else {
            alert("Please upload a valid video file.");
        }
    };

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
                                <label
                                    htmlFor="dropzone-file"
                                    className="mt-8 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300/5 rounded-lg cursor-pointer bg-gray-50/5 hover:bg-gray-100/10 dark:border-gray-600 dark:hover:border-gray-500 relative transition-all duration-150 ease-in-out"
                                >
                                    {
                                        (!isUploading) && (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center text-center flex-col 2xl:flex-row">
                                                    <span className="font-semibold">Click to upload</span> <span className='ml-0 2xl:ml-2'>or drag and
                                                        drop</span>
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                    Video files only
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        (isUploading) && (
                                            <div className='w-full flex flex-col items-center justify-center mt-4'>
                                                <div className='flex flex-col items-center gap-x-2 text-neutral-500 text-sm'>
                                                    <ImSpinner3 className='animate-spin text-3xl' />
                                                    <span className='font-semibold mt-2'>
                                                        {
                                                            isUploading && ("Uploding")
                                                        }
                                                    </span>
                                                </div>

                                                <div className='flex gap-x-2 gap-y-1 items-center justify-center text-xs mt-2 text-white bg-purple-600 rounded-lg px-4 py-1'>
                                                    <span>ETA:</span>
                                                    <span>2-3 Minutes</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        accept="video/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        disabled={isUploading}
                                        required
                                    />
                                </label>

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