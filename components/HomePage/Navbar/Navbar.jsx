import Link from 'next/link'
import React from 'react'
import { RiFolderVideoLine } from "react-icons/ri";
import { MdSlowMotionVideo } from "react-icons/md";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MobileNav } from './MobileNav';
import Image from 'next/image';

const Navbar = () => {
    return (
        <div className='mt-10 w-[90%] lg:w-full mx-auto'>
            <nav className='w-full lg:w-[70%] xl:w-[60%] mx-auto flex items-center justify-between'>
                <Link href={"/"} className='flex items-start text-[#c1dcf1] gap-x-2'>
                    <Image src={"/assets/images/logo3.png"} alt='InstaClip' width={120} height={120} className='w-[30px] h-[30px]' />

                    <div className='flex flex-col gap-y-0'>
                        <span className='text-2xl lg:text-xl'>InstaClip</span>
                        {/* <span className='text-xs text-gray-500'>Make Clips EZ</span> */}
                    </div>
                </Link>
                <div className='hidden md:flex items-center justify-between gap-x-6 border-r-2 border-l-2 border-white/10 px-8 mx-2 '>
                    <Link href={"#"} className='text-[#c1dcf1] text-sm'>Home</Link>
                    <Link href={"#"} className='text-[#c1dcf1] text-sm'>Features</Link>
                    <Link href={"/#pricing"} className='text-[#c1dcf1] text-sm'>Pricing</Link>
                    <Link href={"#faqs"} className='text-[#c1dcf1] text-sm'>FAQs</Link>
                </div>

                <div className='flex items-center gap-x-4'>
                    <Link href={"/sign-in"} class="hidden lg:inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 rounded-2xl border border-white/30 text-sm bg-white/10 text-white h-8 hover:bg-white/30">Sign in</Link>

                    <Link href={"/sign-up"} class="hidden md:inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 rounded-2xl border border-violet-300/30 text-sm bg-[#1D1A34] text-violet-300 h-8 hover:bg-violet-300/30">Get Started</Link>
                    {/* <Link href={"/"} className='bg-gradient-to-b from-[#445c73] via-[#1E1F40] to-[#445c73] text-white px-5 py-3 rounded-full flex md:hidden items-center gap-x-2'>
                        <HiOutlineMenuAlt3 />
                    </Link> */}

                    <MobileNav />
                </div>
            </nav>
        </div>
    )
}

export default Navbar