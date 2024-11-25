"use client"

import { useEffect, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'
import CreateTitleModal from "../CreateTitleModal/CreateTitleModal";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteClipModal from "../DeleteClipModal/DeleteClipModal";

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
        setVideoUrls(videoPaths);
    }, [videoPaths]);

    return (
        <div key={socialExportedVideoRenderKey} className="mt-4 flex items-center gap-x-4 gap-y-6 flex-wrap lg:flex-nowrap">
            {videoUrls.map((url, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full xl:w-1/2 ">
                    <Video className="w-full h-[300px] rounded-lg">
                        <source src={`${url}`} type='video/mp4' className='' />
                    </Video>

                    {/* <button
                        onClick={() => handleDownload(url, url)}
                        className="mt-2 bg-[#36339e] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2"
                    >
                        Download

                        <IoMdCloudDownload className="" />
                    </button> */}

                    <div className="flex items-center justify-between gap-x-2 w-full">
                        <CreateTitleModal asset_url={videoPaths[index]} />
                        {/* <DeleteClipModal asset_url={videoPaths[index]} videoUrls={videoUrls} setVideoUrls={setVideoUrls} /> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExportedVideoPreviews