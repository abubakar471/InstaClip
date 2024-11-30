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
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSave } from "react-icons/fa"
import { MdPublish } from "react-icons/md"

const PublishClipModal = ({ asset_url, className }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { user, isLoaded, isSignedIn } = useUser();
    const { toast } = useToast();


    const handleSave = async (e) => {
        if (!title) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/publish-asset`, {
                title: title,
                asset_url: asset_url,
                user_id: user?.id
            })

            if (res?.data?.success) {
                setTitle("");
                setIsLoading(false);
                // setIsOpen(false);
                toast({
                    variant: "success",
                    description: "Clip published",
                })

                window.location.href = "/dashboard/library"
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
    return (
        (isSignedIn && isLoaded) && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={cn("w-full grow mt-2 bg-[#36339e] !text-white !text-xs py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2 border-none", className)}>
                        <MdPublish />

                        Publish Clip
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] !bg-[#162845] border-none">
                    <DialogHeader>
                        <DialogTitle className="text-neutral-300">Create Title For Your Published Clip</DialogTitle>
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

                    </div>
                    <DialogFooter>
                        <button disabled={isLoading} onClick={() => handleSave()} className={`bg-blue-600 disabled:bg-blue-400/50 hover:bg-blue-700 !text-white py-2 ${isLoading ? "px-8" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm`}>
                            {
                                isLoading ? (<AiOutlineLoading3Quarters className="animate-spin" />) : (<div className="flex items-center gap-x-2">
                                    <MdPublish />
                                    Publish Clip
                                </div>)
                            }
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    )
}

export default PublishClipModal