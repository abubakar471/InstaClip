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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSave } from "react-icons/fa"

const CreateTitleModal = ({ asset_url, thumbnails, public_thumbnail, className }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();


    const handleSave = async (e) => {
        if (!title) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/save-asset`, {
                title: title,
                asset_url: asset_url,
                thumbnail: thumbnail,
                user_id: user?.id
            })

            if (res?.data?.success) {
                setTitle("");
                setIsLoading(false);
                setIsOpen(false);
                toast({
                    variant: "success",
                    description: "Saved clip to library",
                })
            }
        } catch (err) {
            console.log(err);
            toast({
                variant: "destructive",
                description: `${err?.response?.data?.message}`,
            })
            setIsLoading(false);
        }


    }

    const handleSelect = (url) => {
        setThumbnail(url);
    }

    useEffect(() => {
        setThumbnail(public_thumbnail)
    }, [public_thumbnail])
    return (
        (isSignedIn && isLoaded) && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={`${cn("grow mt-2 border-2 border-white/20 !text-white !text-xs py-2 px-3 rounded hover:bg-[#4F46E5]/80 flex items-center justify-center gap-x-2 border-none relative glassy-btn", className)}`}>
                        <div className="flex items-center gap-x-2 z-50">
                            <FaSave />

                            Save to library
                        </div>

                        <div className="bg-gray-100/10 backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0 w-full rounded">

                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] md:max-w-5xl !bg-[#0F1117] border-none">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-300">Create Title For Your Video</DialogTitle>
                        {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <input

                                placeholder="Create your title"
                                className="col-span-4 indent-3 bg-transparent border-b py-2 rounded-none border-neutral-400 focus:ring-0 outline-none text-neutral-300"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        {
                            !public_thumbnail && (
                                <div className="grid grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-3 h-[230px]">
                                    {
                                        thumbnails?.length > 0 && thumbnails?.map((item, index) => (
                                            <Image src={`${item}`} width={800} height={800} alt={`${item}`} className={`${thumbnail === item ? "border-2 border-[#4F46E5]/90 rounded-3xl cursor-pointer h-[100px] lg:h-[150px] w-full object-cover" : "h-[100px] lg:h-[150px] w-full object-cover rounded-3xl cursor-pointer border-none"}`} onClick={() => handleSelect(item)} />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <DialogFooter>
                        <button disabled={isLoading} onClick={() => handleSave()} className={`bg-[#4F46E5] disabled:bg-blue-400/50 hover:bg-[#4F46E5]/80 !text-white py-2 ${isLoading ? "px-8" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm transition-all duration-300 ease-in-out`}>
                            {
                                isLoading ? (<AiOutlineLoading3Quarters className="animate-spin" />) : (<div className="flex items-center gap-x-2">
                                    <FaSave />
                                    Save to library
                                </div>)
                            }
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default CreateTitleModal