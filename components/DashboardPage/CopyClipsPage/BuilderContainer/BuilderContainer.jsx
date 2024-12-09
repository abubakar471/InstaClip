"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa6'
import { ImFilePlay } from 'react-icons/im'
import SocialVideoImport from '../../GeneratePage/UploadVideo/SocialVideoImport'
import { useToast } from '@/hooks/use-toast'
import { BiError } from 'react-icons/bi'
import ExportedVideoPreviews from '../../GeneratePage/ExportedVideoPreviews/ExportedVideoPreviews'
import { useUser } from '@clerk/nextjs'
import InstagramVideoImport from '../../GeneratePage/UploadVideo/InstagramVideoImport'


const BuilderContainer = () => {
    const router = useRouter();
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [socialExportedVideoRenderKey, setSocialExportedVideoRenderKey] = useState(1);
    const [isImportingSocialVideo, setIsImportingSocialVideo] = useState(false);
    const [socialVideoLink, setSocialVideoLink] = useState('');
    const [exportedVideos, setExportedVideos] = useState([]);

    const { toast } = useToast();
    const { user } = useUser();

    const urlOriginYouTube = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

        if (youtubeRegex.test(url)) {
            return "youtube";
        } else {
            return null; // Not a recognized video link
        }
    }

    const urlOriginInstagram = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

        if (instagramRegex.test(url)) {
            return "instagram";
        } else {
            return null; // Not a recognized video link
        }
    }

    function simplifyYouTubeURL(url) {
        try {
            // Create a URL object to parse the URL
            const parsedURL = new URL(url);

            // Extract the 'v' parameter
            const videoId = parsedURL.searchParams.get('v');

            // If 'v' exists, construct the simplified URL
            if (videoId) {
                return `https://www.youtube.com/watch?v=${videoId}`;
            } else {
                throw new Error("The URL does not contain a 'v' parameter.");
            }
        } catch (error) {
            console.error("Invalid URL:", error.message);
            return null; // Return null if the URL is invalid or 'v' is missing
        }
    }

    const handleSocialVideoImportYouTube = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOriginYouTube(socialVideoLink);

            if (!origin) {
                toast({
                    variant: "default",
                    description: "Please paste a youtube url",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsImportingSocialVideo(false);
                return;
            }

            if (origin === "youtube") {
                const formData = new FormData();
                const simpleurl = simplifyYouTubeURL(socialVideoLink);

                if (!simpleurl) {
                    toast({
                        variant: "default",
                        description: "Failed to import video",
                        action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                            <BiError className='!text-[#FDFFFF]' />
                        </div>
                    })
                    return;
                }

                formData.append("url", simplifyYouTubeURL(socialVideoLink));
                formData.append("user_id", user?.id);

                const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-youtube-video`, {
                    method: "POST",
                    headers: {
                        // When using FormData, do not set Content-Type manually;
                        // fetch will set it correctly for multipart form data.
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                const data = await response.json();
                console.log("response : ", data);
                if (data?.success) {
                    console.log("video uploaded");
                    setSocialVideoLink("");
                    setExportedVideos(data?.data);
                    setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                    setIsImportingSocialVideo(false);
                } else {
                    toast({
                        variant: "default",
                        description: "Upload Failed",
                        action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                            <BiError className='!text-[#FDFFFF]' />
                        </div>
                    })
                }
            }

        } catch (err) {
            console.error("Error checking video duration:", err);
            toast({
                variant: "default",
                description: "Upload Failed",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    const handleSocialVideoImportInstagram = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOriginInstagram(socialVideoLink);

            if (!origin) {
                toast({
                    variant: "default",
                    description: "Please paste a instagram url",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                setIsImportingSocialVideo(false);
                return;
            }

            if (origin === "instagram") {
                const formData = new FormData();
                // const simpleurl = simplifyYouTubeURL(socialVideoLink);

                // if (!simpleurl) {
                //     toast({
                //         variant: "default",
                //         description: "Failed to import video",
                //         action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                //             <BiError className='!text-[#FDFFFF]' />
                //         </div>
                //     })
                //     return;
                // }

                formData.append("url", socialVideoLink);
                formData.append("user_id", user?.id);

                const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-instagram-video`, {
                    method: "POST",
                    headers: {
                        // When using FormData, do not set Content-Type manually;
                        // fetch will set it correctly for multipart form data.
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Failed to upload file");
                }

                const data = await response.json();
                console.log("response : ", data);
                if (data?.success) {
                    console.log("video uploaded");
                    setSocialVideoLink("");
                    setExportedVideos(data?.data);
                    setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                    setIsImportingSocialVideo(false);
                } else {
                    toast({
                        variant: "default",
                        description: "Upload Failed",
                        action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                            <BiError className='!text-[#FDFFFF]' />
                        </div>
                    })
                }
            }

        } catch (err) {
            console.error("Error checking video duration:", err);
            toast({
                variant: "default",
                description: "Upload Failed",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    return (

        user && (
            <div className='w-full'>
   <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4 w-full mt-8'>
                    <Link href={"/dashboard/generate"}
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-[#080A0B] hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <ImFilePlay className='text-[#8F92F3] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Drop video files here
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>MP4, MOV up to 100MB</p>

                        </div>
                    </Link>

                    <label
                        htmlFor="dropzone-file"
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                        onClick={() => setSelectedPlatform("YOUTUBE")}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1E0E11] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <AiOutlineYoutube className='text-[#633B42] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Import from YouTube
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>Paste a youtbe URL</p>

                        </div>
                    </label>

                    <label
                        htmlFor="dropzone-file"
                        className="mt-0 flex flex-col items-center justify-center w-full min-h-44 border-dashed border-4 border-gray-300/5 rounded-2xl cursor-pointer bg-transparent hover:bg-[#07080A] relative transition-all duration-300 ease-in-out"
                        onClick={() => setSelectedPlatform("INSTAGRAM")}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className='bg-[#1D0D1A] p-4 rounded-xl flex items-center justify-center w-fit'>
                                <FaInstagram className='text-[#614456] text-2xl' />
                            </div>
                            <h4 className='text-md text-neutral-400 mt-4 text-center px-4'>
                                Import from instagram
                            </h4>
                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>Paste an instagram URL</p>

                        </div>
                    </label>
                </div>

                <div className='w-full mx-auto'>
                    {
                        selectedPlatform === "YOUTUBE" && (
                            <div className='w-fullflex items-center justify-center'>
                                <SocialVideoImport
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImport={handleSocialVideoImportYouTube}
                                />
                            </div>
                        )
                    }

                    {
                        selectedPlatform === "INSTAGRAM" && (
                            <div className='w-fullflex items-center justify-center'>
                                <InstagramVideoImport
                                    socialExportedVideoRenderKey={socialExportedVideoRenderKey}
                                    isImportingSocialVideo={isImportingSocialVideo}
                                    setIsImportingSocialVideo={setIsImportingSocialVideo}
                                    socialVideoLink={socialVideoLink}
                                    setSocialVideoLink={setSocialVideoLink}
                                    handleSocialVideoImport={handleSocialVideoImportInstagram}
                                />
                            </div>
                        )
                    }

                    {
                        (!isImportingSocialVideo && exportedVideos?.length > 0) && (
                            <ExportedVideoPreviews key={socialExportedVideoRenderKey} socialExportedVideoRenderKey={socialExportedVideoRenderKey} videoPaths={exportedVideos} />
                        )
                    }
                </div>

             




            </div>
        )
    )
}

export default BuilderContainer