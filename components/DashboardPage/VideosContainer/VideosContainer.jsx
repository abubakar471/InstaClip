'use client'

import React, { useEffect, useState } from 'react'
import { DefaultPlayer as Video } from "react-html5video"
import 'react-html5video/dist/styles.css'
import axios from 'axios';
import { IoMdCloudDownload } from 'react-icons/io';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import VideosFilter from './VideosFilter';

const VideosContainer = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [totalVideos, setTotalVideos] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 12;

    const {toast} = useToast();

    const fetchVideos = async () => {
        try {
            setIsLoading(true);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-videos?user_id=${userId}&&limit=${limit}&&page=${page}`);

            if (response?.data?.success) {
                setVideos([...videos, ...response?.data?.videos]);
                const urls = response?.data?.videos?.map((v) => {
                    const file_location = v?.location;
                    return `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads${file_location}`;
                });
                console.log("urls : ", urls)
                setVideoUrls([...videoUrls, ...urls]);
                setTotalVideos(response?.data?.totalVideos)
                setPage(page + 1);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast({
                variant: "destructive",
                description: "Something went wrong!",
            })
        }
    }

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            // Create a temporary link to trigger the download
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Release object URL after the download
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Failed to download file:", error);
            toast({
                variant: "destructive",
                description: "Download Failed",
            })
        }
    };



    useEffect(() => {
        if (userId) {
            fetchVideos();
        }

    }, [userId])

    return (
        <div>
            <VideosFilter />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4 mb-10'>
                {
                    videoUrls?.length > 0 && (
                        videoUrls?.map((v, i) => (
                            <div key={i} className='flex flex-col gap-y-2'>
                                <Video className="h-[300px] rounded-lg">
                                    <source src={`${v}`} type='video/mp4' />
                                </Video>
                                <button
                                    onClick={() => handleDownload(v, v)}
                                    className="mt-2 bg-[#36339e] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2 transition-all duration-200"
                                >
                                    <span className='hidden md:inline-block'> Download</span>

                                    <IoMdCloudDownload className="" />
                                </button>
                            </div>
                        ))
                    )
                }

                {
                    isLoading && (
                        Array.from(new Array(12))?.map((item, index) => (
                            <div key={index} className='flex flex-col gap-y-4'>
                                <Skeleton className={`h-[300px] bg-gray-500/40 flex items-center justify-center`}>
                                    <Skeleton className={"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"} />
                                </Skeleton>
                                {/* <Skeleton className={'bg-gray-500 w-full h-[40px] py-2'} /> */}
                            </div>
                        ))
                    )
                }
            </div>

            {
                (!isLoading && videoUrls?.length < totalVideos) && (
                    <div className='pt-6 flex items-center justify-center'>
                        <button onClick={() => fetchVideos()} className='bg-[#36339E]/90 bg-blend-luminosity text-white text-sm px-4 py-2 rounded-lg'>Show More</button>
                    </div>
                )
            }

            {
                isLoading && (
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4 mt-6 mb-6'>

                    </div>
                )
            }

            <div>

            </div>
        </div>
    )
}

export default VideosContainer