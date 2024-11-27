"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton, UserProfile, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BiHome } from "react-icons/bi"
import { CiGrid42 } from "react-icons/ci";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { RiAiGenerate } from "react-icons/ri"
import { LuClapperboard, LuExternalLink } from "react-icons/lu";
import { AiOutlineDiscord } from "react-icons/ai"
import { MdOutlineContactSupport } from "react-icons/md"
import { Skeleton } from "@/components/ui/skeleton"


export function AppSidebar() {
    const { user, isLoaded } = useUser();


    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();
    const [openProfile, setOpenProfile] = useState(false);
    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname])
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                {/* <SidebarGroup /> */}
                {/* <SidebarGroup /> */}
                <div className="px-4 flex items-center justify-between">
                    <Link href={"/"} className="flex items-center gap-x-2">
                        <Image src={"/assets/images/logo3.png"} alt="InstaClip" width={120} height={120} priority className="w-[40px] h-[40px]" />
                        <span className="text-[#c1dcf1]">InstaClip</span>
                    </Link>

                    <SidebarTrigger />
                </div>

                <div className="px-4 mt-10 flex flex-col gap-y-4">
                    {
                        isLoaded ? (
                            <Link href={"/dashboard"} className={`w-full rounded-lg ${activeLink === '/dashboard' && "bg-[#2d4b7e] bg-opacity-40 border border-[#2d4b7e]"} text-neutral-200 text-xs flex items-center gap-x-2 px-4 py-2 `}>
                                <BiHome className="text-lg" />
                                Overview
                            </Link>
                        ) : (
                            <div className="px-2">
                                <Skeleton className={`w-full h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }
                    {
                        isLoaded ? (
                            <Link href={"/dashboard/generate"} className={`w-full rounded-lg ${activeLink === '/dashboard/generate' && "bg-[#2d4b7e] bg-opacity-40 border border-[#2d4b7e]"} text-neutral-200 text-xs flex items-center gap-x-2 px-4 py-2 `}>
                                <RiAiGenerate className="text-lg" />
                                Generate
                            </Link>
                        ) : (
                            <div className="px-2">
                                <Skeleton className={`w-[60%] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }

                    {
                        isLoaded ? (
                            <Link href={"/dashboard/library"} className={`w-full rounded-lg ${activeLink === '/dashboard/library' && "bg-[#2d4b7e] bg-opacity-40 border border-[#2d4b7e]"} text-neutral-200 text-xs flex items-center gap-x-2 px-4 py-2 `}>
                                <LuClapperboard className="text-lg" />
                                Library
                            </Link>
                        ) : (
                            <div className="px-2">
                                <Skeleton className={`w-[80%] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                            </div>
                        )
                    }
                </div>
            </SidebarContent>
            <SidebarFooter>
                <div className="py-4 px-4">
                    {/* <Link href={"#"} className="flex items-center justify-start gap-x-2 mb-4 rounded-lg bg-[#2d4b7e]/30 border-2 border-b-dashed border-t-0 border-[#2d4b7e]/70 text-xs text-neutral-200 px-4 py-2">
                        <AiOutlineDiscord />
                        Join our Discord
                    </Link> */}

                    <div className="mb-2 px-2">
                        <h4 className="text-[0.68rem] text-neutral-200">Resources</h4>

                        <div className="mt-3 flex flex-col gap-y-3">
                            {
                                isLoaded ? (
                                    <div onClick={() => setOpenProfile(!openProfile)} className="flex items-center gap-x-2 text-sm text-neutral-100">
                                        {/* <LuExternalLink /> */}
                                        View Profile
                                    </div>
                                ) : (
                                    <Skeleton className={`w-[150px] h-[7px] rounded-lg bg-gray-500/50 flex-grow`} />
                                )
                            }

                            {
                                isLoaded ? (
                                    <Link href={"#"} className="flex items-center gap-x-2 text-sm text-neutral-100 w-fit">
                                        {/* <MdOutlineContactSupport /> */}
                                        Support
                                    </Link>
                                ) : (
                                    <Skeleton className={`w-[120px] h-[7px] rounded-lg bg-gray-500/50 flex-grow`} />
                                )
                            }

                            {
                                isLoaded ? (
                                    <Link href={"#"} className="flex items-center gap-x-2 text-sm text-neutral-100 w-fit">
                                        {/* <AiOutlineDiscord /> */}
                                        Discord
                                    </Link>
                                ) : (
                                    <Skeleton className={`w-[135px] h-[7px] rounded-lg bg-gray-500/50 flex-grow`} />
                                )
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-500/30 pt-4">
                        <div className="flex items-center gap-x-2">
                            {
                                (isLoaded) ? (
                                    <UserButton />
                                ) : (
                                    <div className="flex items-center gap-x-2">
                                        <Skeleton className={`w-[30px] h-[30px] rounded-full bg-gray-500/50`} />
                                        <Skeleton className={`w-[150px] h-[10px] rounded-lg bg-gray-500/50 flex-grow`} />
                                    </div>
                                )
                            }
                            {
                                isLoaded && (
                                    <div className="flex items-center text-neutral-100 text-xs">
                                        <SignedIn>
                                            {user?.firstName}{" "}{user?.lastName}
                                        </SignedIn>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
