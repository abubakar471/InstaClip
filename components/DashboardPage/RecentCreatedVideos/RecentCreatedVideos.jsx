"use client"

import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'

const RecentCreatedVideos = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [video, setVideo] = useState(null);

    const fetchVideo = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-recent-created-video?user_id=${userId}`);

            if (response?.data?.success && response?.data?.video) {
                // const filename = response?.data?.video?.location?.split('/').pop();
                // setVideo(`/api/videos/${filename}`);
                // setIsLoading(false);

                const file_location = response?.data?.video?.location;
                setVideo(file_location)
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchVideo();
    }, [])
    return (
        video && (
            <div className='mt-10'>
                <div className='bg-gray-500/0 backdrop-blur-md px-0 py-8 min-h-72 rounded-2xl'>
                    <h3 className='text-neutral-200 text-xl mb-8 lg:text-2xl'>Your last generated video</h3>
                    <div className='mt-4'>
                        {
                            !isLoading && (
                                <Video className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 h-[300px] rounded-lg">
                                    <source src={`${video}`} type='video/mp4' className='' />
                                </Video>
                            )
                        }

                        {
                            isLoading && (
                                <div className='flex flex-col gap-y-4'>
                                    <Skeleton className={`w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 h-[300px] bg-gray-500/40 flex items-center justify-center`}>
                                        <Skeleton className={"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"} />
                                    </Skeleton>
                                    {/* <Skeleton className={'bg-gray-500 w-full h-[40px] py-2'} /> */}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    )
}

export default RecentCreatedVideos