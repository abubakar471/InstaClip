"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton, useAuth, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BiHome } from "react-icons/bi"
import { CiGrid42 } from "react-icons/ci";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { RiAiGenerate } from "react-icons/ri"


export function AppSidebar() {
    const { user } = useUser();

    const [activeLink, setActiveLink] = useState('');
    const pathname = usePathname();


    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname])
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                {/* <SidebarGroup /> */}
                {/* <SidebarGroup /> */}
                <div className="px-4">
                    <div className="flex items-center gap-x-2">
                        <Image src={"/assets/images/logo3.png"} alt="InstaClip" width={120} height={120} priority className="w-[40px] h-[40px]" />
                        <span className="text-[#c1dcf1]">InstaClip</span>
                    </div>
                </div>

                <div className="px-4 mt-10 flex flex-col gap-y-4">
                    <Link href={"/dashboard"} className={`w-full rounded-lg ${activeLink === '/dashboard' && "bg-[#2d4b7e] bg-opacity-40 border border-[#2d4b7e]"} text-neutral-200 text-sm flex items-center gap-x-2 px-4 py-2 `}>
                        <BiHome />
                        Overview
                    </Link>
                    <Link href={"/dashboard/generate"} className={`w-full rounded-lg ${activeLink === '/dashboard/generate' && "bg-[#2d4b7e] bg-opacity-40 border border-[#2d4b7e]"} text-neutral-200 text-sm flex items-center gap-x-2 px-4 py-2 `}>
                        <RiAiGenerate />
                        Generate
                    </Link>
                </div>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center justify-between py-4 px-4">
                    <div className="flex items-center gap-x-2">
                        <UserButton />
                        <div className="flex items-center text-neutral-100 text-xs">
                            <SignedIn>
                                {user?.firstName}{" "}{user?.lastName}
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}