"use client"

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ExportedVideoPreviews from '../ExportedVideoPreviews/ExportedVideoPreviews';
import { ImFilePlay, ImSpinner3 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { MdCloudUpload, MdOutlinePermMedia, MdOutlinePhotoLibrary, MdPermMedia, MdUploadFile } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import RecentCreatedVideos from '../../RecentCreatedVideos/RecentCreatedVideos';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { useToast } from '@/hooks/use-toast';
import SocialVideoImport from './SocialVideoImport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaYoutube } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import PublicLibraryAssets from './PublicLibraryAssets';
import FeaturedAssets from './FeaturedAssets';
import { FaFileArrowUp } from 'react-icons/fa6';
import { PiYoutubeLogo } from 'react-icons/pi';
import { IoMdTime } from 'react-icons/io';
import { RiGalleryLine } from 'react-icons/ri';
import { Film } from 'lucide-react';
import { LuVideo } from "react-icons/lu";
import Link from 'next/link';
import { BiError } from 'react-icons/bi';

// import {GiFairyWand} from "react-icons/gi"

const UploadVideo = ({ userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSegmenting, setIsSegmenting] = useState(false);
    const [isSegmentingCandidates, setIsSegmentingCandidates] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportedVideos, setExportedVideos] = useState([]);
    const [uploadedData, setUploadedData] = useState(null);
    const [isImportingSocialVideo, setIsImportingSocialVideo] = useState(false);
    const [socialVideoLink, setSocialVideoLink] = useState('');
    const [socialExportedVideoRenderKey, setSocialExportedVideoRenderKey] = useState(1);
    const [selectedTab, setSelectedTab] = useState('')

    const uploadBtnRef = useRef(null);
    const fileInputRef = useRef(null);
    const router = useRouter();
    const { toast } = useToast();

    const { user } = useUser();

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

    const handleClear = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
        setExportedVideos([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input value
        }
    };

    const sendVideoSegmentation = async (videoFilePath, local_video_filepath) => {
        setIsSegmenting(true);

        const formData = new FormData();
        formData.append("video_filepath", videoFilePath);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/segmentation`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("segment response:", response?.data);

            if (response?.data) {
                sendVideSegmentCandidates(response?.data, local_video_filepath);
            }
        } catch (error) {
            console.error("Error sending video filepath:", error);
            toast({
                variant: "destructive",
                description: "Segmenting Video File Failed!",
            })
        } finally {
            setIsSegmenting(false);
        }
    };

    const sendVideSegmentCandidates = async (segments, local_video_filepath) => {
        setIsSegmentingCandidates(true);

        const formData = new FormData();
        formData.append("segments", JSON.stringify(segments));

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/segment_candidates`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("segment candidate response:", response?.data);

            if (response?.data) {
                // console.log('C:/Users/AB/Downloads/Bingo Game Plan.mp4 => ', response?.data);
                // const convertedData = convertTimestamps(response?.data);
                // console.log("converted data : ", convertedData)

                console.log("uploadedData?.local_video_filepath : ", local_video_filepath);
                exportVideos(local_video_filepath, response?.data);
            }
        } catch (error) {
            console.error("Error sending video filepath:", error);
            toast({
                variant: "destructive",
                description: "Segmenting Candidates Failed!",
            })
        } finally {
            setIsSegmentingCandidates(false);
        }
    };

    const exportVideos = async (video_filepath, candidates) => {
        setExportedVideos([]);
        setIsExporting(true);

        const formData = new FormData();
        formData.append("video_filepath", video_filepath);
        formData.append("candidates", JSON.stringify(candidates));
        formData.append("user_id", user?.id);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/export`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("export response:", response?.data);
            console.log("exported paths : ", response?.data?.details?.paths);


            if (response?.data?.details?.paths?.length > 0) {
                // const res = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/create-asset`, {
                //     user_id: userId,
                //     paths: response?.data?.details?.paths
                // })

                setExportedVideos(response?.data?.details?.paths);
                setIsExporting(false);
                setIsSegmenting(false);
                setIsSegmentingCandidates(false);
                setPreviewUrl(null);
                setSelectedFile(null);
                setUploadedData(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Reset the file input value
                }

            }

            if (response?.data?.details?.paths?.length === 0) {
                setExportedVideos([]);
                setIsExporting(false);
                setIsSegmenting(false);
                setIsSegmentingCandidates(false);
                setPreviewUrl(null);
                setSelectedFile(null);
                setUploadedData(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Reset the file input value
                }

                toast({
                    variant: "destructive",
                    title: "Exporting Clips Failed!",
                    description: "Try uploading again",
                })
            }
        } catch (error) {
            console.error("Error sending video filepath:", error);
            setIsExporting(false);
            setIsSegmenting(false);
            setIsSegmentingCandidates(false);
            setPreviewUrl(null);
            setSelectedFile(null);
            setUploadedData(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Reset the file input value
            }

            toast({
                variant: "destructive",
                description: "Exporting Clips Failed!",
            })
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast({
                variant: "default",
                title: "Upload Failed",
                description: "No File Selected",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            return;
        }

        // checking duration of selected video file


        try {
            // Create a blob URL to load the video file
            const videoBlob = URL.createObjectURL(selectedFile);
            const videoElement = document.createElement("video");

            // Use a promise to load the video and fetch its duration
            const getVideoDuration = () =>
                new Promise((resolve, reject) => {
                    videoElement.preload = "metadata";
                    videoElement.src = videoBlob;

                    videoElement.onloadedmetadata = () => {
                        resolve(videoElement.duration); // Duration in seconds
                        URL.revokeObjectURL(videoBlob); // Free up memory
                    };

                    videoElement.onerror = (error) => {
                        reject("Failed to load video metadata");
                        URL.revokeObjectURL(videoBlob); // Free up memory
                    };
                });

            const duration = await getVideoDuration();

            console.log("Video Duration:", duration, "seconds");

            // Check if the video is less than 3 minutes (180 seconds)
            if (duration < 180) {
                toast({
                    variant: "default",
                    title: "Upload Failed",
                    description: "Video is less than 3 minutes",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
                handleClear();
                return;
            }
        } catch (error) {
            console.error("Error checking video duration:", error);
            toast({
                variant: "default",
                title: "Upload Failed",
                description: "Failed to check video duration",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            handleClear();
            return;
        }


        // video duration check completed

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("user_id", user?.id);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/upload`, {
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
            if (data) {
                console.log("sending this for video segmenting : ", data?.details?.firebase_paths?.audio_location);

                sendVideoSegmentation(
                    `${data?.details?.local_audio_filepath}`,
                    data?.details?.local_video_filepath
                );
            } else {
                toast({
                    variant: "default",
                    description: "Failed to upload file.",
                    action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                        <BiError className='!text-[#FDFFFF]' />
                    </div>
                })
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast({
                variant: "default",
                description: "An error occurred during file upload.",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
        } finally {
            setIsUploading(false);
        }
    }

    const urlOrigin = (url) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/;
        const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+/;

        if (youtubeRegex.test(url)) {
            return "youtube";
        } else if (instagramRegex.test(url)) {
            return "instagram";
        } else if (tiktokRegex.test(url)) {
            return "tiktok";
        } else {
            return null; // Not a recognized video link
        }
    }

    const handleSocialVideoImport = async (e) => {
        e.preventDefault();

        if (socialVideoLink?.length === 0) {
            return;
        }

        setIsImportingSocialVideo(true);

        try {
            const origin = urlOrigin(socialVideoLink);

            if (origin === "youtube") {
                const formData = new FormData();
                formData.append("url", socialVideoLink);
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
                    setExportedVideos([data?.file_path]);
                    setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                    setIsImportingSocialVideo(false);
                } else {
                    toast({
                        variant: "default",
                        title: "Upload Failed",
                        description: "Importing Video Failed",
                        action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                            <BiError className='!text-[#FDFFFF]' />
                        </div>
                    })
                }
            }

            if (origin === 'tiktok') {
                const formData = new FormData();
                formData.append("url", socialVideoLink);
                formData.append("user_id", user?.id);

                const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/import-tiktok-video`, {
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
                    console.log("video uploaded: ", data);
                    setSocialVideoLink("");
                    setExportedVideos([data?.file_path]);
                    setSocialExportedVideoRenderKey(socialExportedVideoRenderKey + 1)
                    setIsImportingSocialVideo(false);
                } else {
                    toast({
                        variant: "default",
                        title: "Upload Failed",
                        description: "Importing Video Failed",
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
                title: "Upload Failed",
                description: "Failed to check video duration",
                action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
                    <BiError className='!text-[#FDFFFF]' />
                </div>
            })
            setIsImportingSocialVideo(false);
        }
    }

    useEffect(() => {
        setSelectedTab("AI")
    }, [])


    return (
        <div>
            <div className='w-[90%] xl:w-[70%] 2xl:w-[60%] mx-auto gap-10 mt-4 mb-10 relative'>
                <h1 className='text-3xl text-[#FDFFFF] font-semibold'>Create New Video</h1>
                <p className='text-neutral-500 text-sm mt-2'>Import or create content from various platforms</p>
                <div className='min-h-screen max-h-fit col-span-0 lg:col-span-4 2xl:col-span-4 bg-transparent px-0 rounded-2xl w-full mt-6'>
                    <Tabs defaultValue="create_clips" className="w-full !bg-transparent">
                        <TabsList className="w-fit bg-[#08090C] flex items-center justify-start gap-x-2">
                            <TabsTrigger value="create_clips" className="w-fit">
                                <div className='flex items-center gap-x-2 text-xs py-1'>
                                    <MdUploadFile className='text-[1rem]' />
                                    Upload Video
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="youtube_import" className="w-fit">
                                <div className='flex items-center gap-x-2 text-xs py-1'>
                                    <PiYoutubeLogo className='text-[1rem]' />
                                    YouTube Import
                                </div>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="create_clips">

                            <label
                                htmlFor="dropzone-file"
                                className="mt-8 flex flex-col items-center justify-center w-full min-h-64 border-dashed border-4 border-gray-300/5 rounded-lg cursor-pointer bg-[#07080A] hover:bg-[#07080A]/50 dark:border-gray-600 dark:hover:border-gray-500 relative transition-all duration-300 ease-in-out"
                            >
                                {
                                    (!isUploading && !isSegmenting && !isSegmentingCandidates && !isExporting) && (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                                <ImFilePlay className='text-[#6770CC] text-2xl' />
                                            </div>
                                            {/* <p className="mb-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center text-center flex-col 2xl:flex-row">
                                                <span className="font-semibold">Click to upload</span> <span className='ml-0 2xl:ml-2'>or drag and
                                                    drop</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                Video files only
                                            </p> */}
                                            <h4 className='text-lg text-[#FDFFFF] mt-4 text-center'>Drop your video here</h4>
                                            <p className='text-[#4E545A] text-sm mt-1 text-center px-10 lg:px-0'>Upload your video files to create engaging short-form content automatically</p>
                                            <div className='flex items-center gap-x-4 gap-y-2 mt-4 px-4 justify-center flex-wrap md:flex-nowrap'>
                                                <div className='flex items-center gap-x-1 text-[#343943] text-sm text-center'>
                                                    <MdUploadFile className='text-[1rem]' />
                                                    MP4, MOV
                                                </div>

                                                <div className='flex items-center gap-x-1 text-[#343943] text-sm text-center'>
                                                    <IoMdTime className='text-[1rem]' />
                                                    Any Duration
                                                </div>

                                                <div className='flex items-center gap-x-1 text-[#343943] text-sm text-center'>
                                                    <RiGalleryLine className='text-[1rem]' />
                                                    Up to 100MB
                                                </div>
                                            </div>

                                            <div className='mt-4'>
                                                <div className='bg-transparent border-2 border-neutral-500/20 flex items-center gap-x-2 px-4 py-1 rounded-md text-[#4E545A] text-sm '>
                                                    <MdUploadFile className='text-[1rem]' />
                                                    Browse Files
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    (isUploading || isSegmenting || isSegmentingCandidates || isExporting) && (
                                        <div className='w-full flex flex-col items-center justify-center mt-4'>
                                            <div className='flex flex-col items-center gap-x-2 text-neutral-500 text-sm'>
                                                <ImSpinner3 className='animate-spin text-3xl' />
                                                <span className='font-semibold mt-2'>
                                                    {
                                                        isUploading && ("Uploding")
                                                    }

                                                    {
                                                        isSegmenting && ("Segmenting Video")
                                                    }

                                                    {
                                                        isSegmentingCandidates && ("Segmenting Candidates")
                                                    }

                                                    {
                                                        isExporting && ("Exporting Clips")
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
                                    disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting}
                                    required
                                />
                            </label>


                            <div className=''>
                                {
                                    previewUrl && (
                                        <div className='bg-green-600/40 text-white py-2 rounded-lg px-4 text-xs mt-2 w-fit'>
                                            * File Selected *
                                        </div>
                                    )
                                }

                                <p className='text-neutral-400 text-xs mt-4 px-2'>
                                    Generate Short Clip from your uploded videos and create your own asset library.
                                </p>

                                {
                                    (!isUploading && !isSegmenting && !isSegmentingCandidates && !isExporting) && (
                                        <div className='flex items-center gap-x-4 flex-nowrap'>
                                            <button
                                                ref={uploadBtnRef}
                                                onClick={handleUpload}
                                                className="mt-4 mb-4 px-4 py-2 bg-[#4F46E5] text-white text-sm rounded-lg hover:bg-[#4F46E5]/80 flex items-center justify-center gap-x-2 transition-all duration-300 ease-in-out w-full"
                                                disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting}
                                            >
                                                <MdCloudUpload />
                                                Upload Video
                                            </button>

                                            {
                                                (selectedFile && previewUrl) && (
                                                    <button
                                                        onClick={() => handleClear()}
                                                        className="mt-4 mb-4 px-4 py-3 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center gap-x-2 transition-all duration-300 ease-in-out"
                                                        disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting}
                                                    >
                                                        <RxCross1 />

                                                    </button>
                                                )
                                            }
                                        </div>
                                    )
                                }

                            </div>
                        </TabsContent>

                        <TabsContent value="youtube_import">
                            {/* social link input field */}
                            <SocialVideoImport isImportingSocialVideo={isImportingSocialVideo} setIsImportingSocialVideo={setIsImportingSocialVideo} socialVideoLink={socialVideoLink} setSocialVideoLink={setSocialVideoLink} handleSocialVideoImport={handleSocialVideoImport} />
                        </TabsContent>
                    </Tabs>

                    {/* <div className=''>
                        <div className="flex items-center gap-x-2 w-full">
                            <div onClick={() => setSelectedTab("AI")} className={`w-fit ${selectedTab === "AI" && ("!bg-[#4a2ac0]")} bg-transparent
        hover:bg-[#4a2ac0]/30 flex items-center text-white mt-6 px-2 rounded-lg cursor-pointer transition-all ease-in-out`}>
                                <div className={`flex items-center gap-x-2 text-xs py-2 px-2 `}>
                                    <MdOutlinePermMedia />
                                    Create Clips
                                </div>
                            </div>

                            <div onClick={() => setSelectedTab("YOUTUBE")} className={`w-fit ${selectedTab === "YOUTUBE" && ("!bg-[#4a2ac0]")} bg-transparent
        hover:bg-[#4a2ac0]/30 flex items-center text-white mt-6 px-2 rounded-lg cursor-pointer transition-all ease-in-out`}>
                                <div className={`flex items-center gap-x-2 text-xs py-2 px-2 `}>
                                    <FaYoutube />

                                    Import from YouTube
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {
                        (exportedVideos?.length > 0 && !isImportingSocialVideo && !isExporting) && (
                            <div className='mt-6 mb-10'>
                                <div className='w-full flex items-center justify-between'>
                                    <div className='flex items-center gap-x-2 text-[#FDFFFF]/80 text-lg font-semibold'>
                                        <LuVideo className='text-[1.3rem]' />
                                        Generated Shorts
                                    </div>

                                    <button onClick={() => handleClear()} className='border-2 border-neutral-500/20 text-[#676d74] text-xs px-2 py-1 rounded-lg'>Generate More</button>
                                </div>

                                <div>
                                    <ExportedVideoPreviews socialExportedVideoRenderKey={socialExportedVideoRenderKey} videoPaths={exportedVideos} />
                                </div>
                            </div>
                        )
                    }

                    {
                        (isExporting || isImportingSocialVideo) && (
                            <div className='w-full mx-auto grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-4 gap-x-4 gap-y-4 mt-2'>
                                <Skeleton className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}>
                                    <Skeleton className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"} />
                                </Skeleton>
                                <Skeleton className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}>
                                    <Skeleton className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"} />
                                </Skeleton>
                                <Skeleton className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}>
                                    <Skeleton className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"} />
                                </Skeleton>
                                <Skeleton className={`w-full h-[300px] bg-gray-500/10 flex items-center justify-center`}>
                                    <Skeleton className={"bg-gray-400/20 w-[50px] h-[50px] rounded-lg"} />
                                </Skeleton>
                            </div>
                        )
                    }

                    {/* {
                        (exportedVideos?.length == 0 && !isExporting && !isImportingSocialVideo) && (
                            <RecentCreatedVideos userId={userId} limit={1} />
                        )
                    } */}

                    <div className='mt-4'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex items-center gap-x-2 text-[#FDFFFF]/80 text-lg font-semibold'>
                                <Film />
                                Community Creations
                            </div>

                            <Link href={"/dashboard/public"} className='border-2 border-neutral-500/20 text-[#676d74] text-xs px-2 py-1 rounded-lg'>View All</Link>
                        </div>

                        <FeaturedAssets />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UploadVideo