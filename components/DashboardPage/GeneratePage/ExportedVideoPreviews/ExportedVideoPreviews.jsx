"use client"

import { useEffect, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import CreateTitleModal from "../CreateTitleModal/CreateTitleModal";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteClipModal from "../DeleteClipModal/DeleteClipModal";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const ExportedVideoPreviews = ({ socialExportedVideoRenderKey, videoPaths }) => {
    const [videoUrls, setVideoUrls] = useState([]);

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
        }
    };


    useEffect(() => {
        console.log("videoPaths : ", videoPaths)
        setVideoUrls(videoPaths);
    }, [videoPaths]);

    return (
        <div key={socialExportedVideoRenderKey} className="w-full mx-auto mt-4 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4">
            {videoUrls.map((v, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full relative">
                    <Video className="w-full h-[350px] rounded-2xl" controls={false}>
                        <source src={`${v?.location}`} type='video/mp4' className='' />
                    </Video>

                    {/* <button
               onClick={() => handleDownload(url, url)}
               className="mt-2 bg-[#36339e] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2"
           >
               Download

               <IoMdCloudDownload className="" />
           </button> */}
                    <div className="flex items-center justify-center gap-x-2 w-full mx-auto px-4 absolute bottom-4">
                        <CreateTitleModal asset_url={videoPaths[index]?.location} thumbnails={v?.thumbnails} />
                        {/* <DeleteClipModal asset_url={videoPaths[index]} videoUrls={videoUrls} setVideoUrls={setVideoUrls} /> */}
                    </div>
                </div>
            ))}
        </div>
        // <div key={socialExportedVideoRenderKey} className="mt-4 flex items-center gap-x-4 gap-y-6 flex-wrap lg:flex-nowrap">

        // </div>
    );
};

export default ExportedVideoPreviews