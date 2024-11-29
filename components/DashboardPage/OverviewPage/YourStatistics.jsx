"use client"

import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Orbitron, Poppins } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaSquarePollVertical } from 'react-icons/fa6'

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})

const YourStatistics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, isLoaded } = useUser();
    const [stats, setStats] = useState(null);

    const fetchUserStats = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/users/get-user-stats?user_id=${user?.id}`);

            if (response?.data?.success) {
                setStats({
                    totalVideos: response?.data?.totalVideos
                })
                setIsLoading(false);
            }
        } catch (err) {
            console.log("erorr fetching stats : ", err)
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserStats();
        }
    }, [user])

    return (
        <div className={`mt-4 bg-transparent relative flex px-4 py-4 min-h-[150px] xl:min-h-[340px] ${font.className}`}>
            <div className='flex flex-col items-start gap-y-3 w-full'>
                <div className='w-full flex items-center justify-center '>
                    <div className='flex items-center justify-center flex-col bg-gray-500/20 rounded-full w-[100px] 2xl:w-[130px] h-[100px] 2xl:h-[130px]'>
                        {
                            (isLoaded && !isLoading) && (
                                // <Image src={`${user?.imageUrl}`} width={200} height={200} alt={`${user?.firstName}`} className='rounded-full w-[120px] h-[120px]' />
                                <FaSquarePollVertical className='text-5xl text-[#603ce2]' />
                            )
                        }
                    </div>
                </div>


                {
                    isLoading ? (
                        <div className='flex items-center justify-center flex-wrap gap-4 w-full'>
                            <div className='flex items-center justify-center flex-col gap-y-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>
                            <div className='flex items-center justify-center flex-col gap-y-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>
                            <div className='flex items-center justify-center flex-col gap-y-2'>
                                <Skeleton className={`w-[20px] h-[20px] rounded-full bg-gray-500/50`} />
                                <Skeleton className={`w-[150px] h-[20px] rounded-lg bg-gray-500/50`} />
                            </div>

                        </div>
                    ) : (
                        <div className='flex items-center justify-center flex-wrap gap-4 w-full'>
                            <div className='flex items-center justify-center flex-col'>
                                <p className='text-[#603ce2] text-xl xl:text-3xl text-center'>{stats?.totalVideos}</p>
                                <p className='text-sm text-neutral-300 text-center'>Assets Created</p>
                            </div>
                            <div className='flex items-center justify-center flex-col'>
                                <p className='text-[#603ce2] text-xl xl:text-3xl text-center'>1</p>
                                <p className='text-sm text-neutral-300 text-center'>Connected Accounts</p>
                            </div>
                            <div className='flex items-center justify-center flex-col'>
                                <p className='text-[#603ce2] text-xl xl:text-3xl text-center'>Free</p>
                                <p className='text-sm text-neutral-300 text-center'>Your Plan</p>
                            </div>

                        </div >
                    )
                }
            </div >

            <div className='absolute top-0 left-0 right-0 bottom-0 rounded-xl blur-0 bg-gray-400/10'>

            </div>
        </div >
    )
}

export default YourStatistics