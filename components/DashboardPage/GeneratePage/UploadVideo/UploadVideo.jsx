"use client"

import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ExportedVideoPreviews from '../ExportedVideoPreviews/ExportedVideoPreviews';
import { ImFilePlay, ImSpinner3 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { MdCloudUpload, MdOutlinePermMedia, MdOutlinePhotoLibrary, MdPermMedia, MdUploadFile } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import RecentCreatedVideos from '../../RecentCreatedVideos/RecentCreatedVideos';
import { DefaultPlayer as VideoPlayer } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import { useToast } from '@/hooks/use-toast';
import SocialVideoImport from './SocialVideoImport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaCheck, FaYoutube } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import PublicLibraryAssets from './PublicLibraryAssets';
import FeaturedAssets from './FeaturedAssets';
import { FaFileArrowUp } from 'react-icons/fa6';
import { PiYoutubeLogo } from 'react-icons/pi';
import { IoMdTime } from 'react-icons/io';
import { RiGalleryLine } from 'react-icons/ri';
import { LuVideo } from "react-icons/lu";
import Link from 'next/link';
import { BiError } from 'react-icons/bi';
import { Youtube, FileVideo, Loader2, Play, Clock, Video, Film, PlusCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button';
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
    const [uploadProgress, setUploadProgress] = useState(0)

    const uploadBtnRef = useRef(null);
    const fileInputRef = useRef(null);
    const router = useRouter();
    const { toast } = useToast();

    const { user } = useUser();

    const onDrop = useCallback((acceptedFiles) => {
        handleFileUpload(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi', '.mkv']
        },
        maxSize: 1024 * 1024 * 100
    })




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
                setSocialVideoLink("");
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
                setSocialVideoLink("");
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

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         toast({
    //             variant: "default",
    //             title: "Upload Failed",
    //             description: "No File Selected",
    //             action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
    //                 <BiError className='!text-[#FDFFFF]' />
    //             </div>
    //         })
    //         return;
    //     }

    //     // checking duration of selected video file


    // try {
    //     // Create a blob URL to load the video file
    //     const videoBlob = URL.createObjectURL(selectedFile);
    //     const videoElement = document.createElement("video");

    //     // Use a promise to load the video and fetch its duration
    //     const getVideoDuration = () =>
    //         new Promise((resolve, reject) => {
    //             videoElement.preload = "metadata";
    //             videoElement.src = videoBlob;

    //             videoElement.onloadedmetadata = () => {
    //                 resolve(videoElement.duration); // Duration in seconds
    //                 URL.revokeObjectURL(videoBlob); // Free up memory
    //             };

    //             videoElement.onerror = (error) => {
    //                 reject("Failed to load video metadata");
    //                 URL.revokeObjectURL(videoBlob); // Free up memory
    //             };
    //         });

    //     const duration = await getVideoDuration();

    //     console.log("Video Duration:", duration, "seconds");

    //     // Check if the video is less than 3 minutes (180 seconds)
    //     if (duration < 180) {
    //         toast({
    //             variant: "default",
    //             title: "Upload Failed",
    //             description: "Video is less than 3 minutes",
    //             action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
    //                 <BiError className='!text-[#FDFFFF]' />
    //             </div>
    //         })
    //         handleClear();
    //         return;
    //     }
    // } catch (error) {
    //     console.error("Error checking video duration:", error);
    //     toast({
    //         variant: "default",
    //         title: "Upload Failed",
    //         description: "Failed to check video duration",
    //         action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
    //             <BiError className='!text-[#FDFFFF]' />
    //         </div>
    //     })
    //     handleClear();
    //     return;
    // }


    //     // video duration check completed

    //     setIsUploading(true);

    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("user_id", user?.id);

    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/upload`, {
    //         method: "POST",
    //         headers: {
    //             // When using FormData, do not set Content-Type manually;
    //             // fetch will set it correctly for multipart form data.
    //         },
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         throw new Error("Failed to upload file");
    //     }

    //     const data = await response.json();
    //     console.log("response : ", data);
    //     if (data) {
    //         console.log("sending this for video segmenting : ", data?.details?.firebase_paths?.audio_location);

    //         sendVideoSegmentation(
    //             `${data?.details?.local_audio_filepath}`,
    //             data?.details?.local_video_filepath
    //         );
    //     } else {
    //         toast({
    //             variant: "default",
    //             description: "Failed to upload file.",
    //             action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
    //                 <BiError className='!text-[#FDFFFF]' />
    //             </div>
    //         })
    //     }
    // } catch (error) {
    //     console.error("Error uploading file:", error);
    //     toast({
    //         variant: "default",
    //         description: "An error occurred during file upload.",
    //         action: <div className='!bg-[#6760f1] p-1 flex items-center justify-center rounded-full'>
    //             <BiError className='!text-[#FDFFFF]' />
    //         </div>
    //     })
    // } finally {
    //     setIsUploading(false);
    // }
    // }


    const handleFileUpload = async (files) => {
        if (!files.length) return;
        setIsUploading(true)
        setUploadProgress(0);
        
        try {
            // Create a blob URL to load the video file
            const videoBlob = URL.createObjectURL(files[0]);
            const videoElement = document.createElement("video");

            // Use a promise to load the video and fetch its duration
            const getVideoDuration = () =>
                new Promise((resolve, reject) => {
                    videoElement.preload = "metadata";
                    videoElement.src = videoBlob;

                    videoElement.onloadedmetadata = () => {
                        console.log("video duration : ", videoElement.duration)
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

        const formData = new FormData();
        formData.append("file", files[0]);
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

        const interval = setInterval(() => {

            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 10
            })
        }, 2500)

        // setTimeout(() => {
        //     setIsUploading(false)
        //     setUploadProgress(0)
        //     toast({
        //         variant: "default",
        //         description: "Video uploaded successfully",
        //         action: <div className='!bg-[#3faa56] p-1 flex items-center justify-center rounded-full'>
        //             <FaCheck className='!text-[#FDFFFF]' />
        //         </div>
        //     })
        //     setGeneratedShorts([
        //         { duration: "0:45", thumbnail: "https://picsum.photos/seed/1/300/600" },
        //         { duration: "1:20", thumbnail: "https://picsum.photos/seed/2/300/600" },
        //         { duration: "0:30", thumbnail: "https://picsum.photos/seed/3/300/600" },
        //         { duration: "0:55", thumbnail: "https://picsum.photos/seed/4/300/600" },
        //     ])
        // }, 5500)
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

    const handleSocialVideoImport = async (e) => {
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

                const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/video/split-youtube-video`, {
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
                    sendVideoSegmentation(
                        `${data?.local_audio_filepath}`,
                        data?.local_video_filepath
                    );
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

    useEffect(() => {
        setSelectedTab("AI")
    }, [])


    return (
        <div>
            <div className='w-[100%] 2xl:w-[70%] mx-auto gap-10 mt-4 mb-10 relative'>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent flex items-center">
                    Create New Video
                </h1>
                <p className="text-gray-400">Import or create content from various platforms</p>
                <div className='min-h-screen max-h-fit col-span-0 lg:col-span-4 2xl:col-span-4 bg-transparent px-0 rounded-2xl w-full mt-9'>
                    <Tabs defaultValue="create_clips" className="w-full !bg-transparent">
                        <TabsList className="w-fit bg-[#08090C] flex items-center justify-start gap-x-2">
                            <TabsTrigger disabled={isUploading || isImportingSocialVideo || isSegmenting || isSegmentingCandidates || isExporting} value="create_clips" className="w-fit">
                                <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                                    <MdUploadFile className='text-[1.1rem]' />
                                    Upload Video
                                </div>
                            </TabsTrigger>
                            <TabsTrigger disabled={isUploading || isImportingSocialVideo || isSegmenting || isSegmentingCandidates || isExporting} value="youtube_import" className="w-fit">
                                <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                                    <PiYoutubeLogo className='text-[1.1rem]' />
                                    YouTube Import
                                </div>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="create_clips">

                            {/* <label
                                htmlFor="dropzone-file"
                                className="mt-8 flex flex-col items-center justify-center w-full min-h-64 border-dashed border-4 border-gray-300/5 rounded-lg cursor-pointer bg-[#07080A] hover:bg-[#07080A]/50 dark:border-gray-600 dark:hover:border-gray-500 relative transition-all duration-300 ease-in-out"
                            >
                                {
                                    (!isUploading && !isSegmenting && !isSegmentingCandidates && !isExporting) && (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className='bg-[#1D1B4C] p-4 rounded-xl flex items-center justify-center w-fit'>
                                                <ImFilePlay className='text-[#6770CC] text-2xl' />
                                            </div>
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
                            </label> */}

                            <div
                                {...getRootProps()}
                                className={`relative group cursor-pointer transform transition-all duration-200 mt-9 ${isDragActive ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-white/5'
                                    }`}
                            >
                                <input disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting} {...getInputProps()} />
                                <div className="p-8 bg-black/20 backdrop-blur-sm rounded-xl hover:bg-black/30 transition-all border-[3px] border-dashed border-white/10 min-h-[240px] flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto text-center">
                                        <div className="w-16 h-16 bg-indigo-600/20 rounded-xl flex items-center justify-center group-hover:bg-indigo-600/30 transition-all">
                                            {(isUploading || isSegmenting || isSegmentingCandidates || isExporting) ? (
                                                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                                            ) : (
                                                <FileVideo className="w-8 h-8 text-indigo-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-white mb-2">
                                                {isUploading && 'Uploading...'}
                                                {isSegmenting && 'Spliting Video...'}
                                                {isSegmentingCandidates && 'Making Shorts...'}
                                                {isExporting && 'Exporting Clips...'}
                                                {
                                                    (!isUploading && !isSegmenting && !isSegmentingCandidates && !isExporting) && ('Drop your video here')
                                                }
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4">
                                                {(isUploading || isSegmenting || isSegmentingCandidates || isExporting)
                                                    ? `${uploadProgress}% complete`
                                                    : 'Upload your video files to create engaging short-form content automatically'
                                                }
                                            </p>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center"><FileVideo className="w-4 h-4 mr-1" /> MP4, MOV</span>
                                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Any Duration</span>
                                                    <span className="flex items-center"><Film className="w-4 h-4 mr-1" /> Up to 100MB</span>
                                                </div>
                                                {!isUploading && (
                                                    <div className="flex gap-3 justify-center">
                                                        <Button
                                                            size="default"
                                                            variant="outline"
                                                            className="border-white/10 text-gray-400 hover:text-white bg-transparent hover:bg-white/10"
                                                        >
                                                            <FileVideo className="w-4 h-4 mr-2" />
                                                            Browse Files
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className=''>
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

                            </div> */}
                        </TabsContent>

                        <TabsContent value="youtube_import">
                            {/* social link input field */}
                            <SocialVideoImport
                                isImportingSocialVideo={isImportingSocialVideo || isSegmenting || isSegmentingCandidates || isExporting}
                                setIsImportingSocialVideo={setIsImportingSocialVideo}
                                socialVideoLink={socialVideoLink}
                                setSocialVideoLink={setSocialVideoLink}
                                handleSocialVideoImport={handleSocialVideoImport}
                                message={<div>
                                    Import videos from youtube easily by pasting your link here. <span className='font-semibold'>Note: Video should be at least 3 minutes long</span>
                                </div>}
                            />
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
                        (isExporting) && (
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