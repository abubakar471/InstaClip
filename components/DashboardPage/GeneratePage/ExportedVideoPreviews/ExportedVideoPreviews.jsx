"use client"

import { useEffect, useState } from "react";
import { IoMdCloudDownload } from "react-icons/io";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css'

const ExportedVideoPreviews = ({ videoPaths }) => {
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
        // Convert file paths to API URLs
        const urls = videoPaths.map((path) => {
            const filename = path.split('/').pop();
            return `/api/videos/${filename}`;
        });
        setVideoUrls(urls);
    }, [videoPaths]);

    return (
        <div className="mt-4 flex items-center gap-x-10 gap-y-6 flex-wrap lg:flex-nowrap">
            {videoUrls.map((url, index) => (
                <div key={index} className="flex flex-col gap-y-2 w-full lg:w-1/5 ">
                    <Video className="h-[300px] rounded-lg">
                        <source src={`${url}`} type='video/mp4' className='' />
                    </Video>

                    <button
                        onClick={() => handleDownload(url, url)}
                        className="mt-2 bg-[#36339e] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center justify-center gap-x-2"
                    >
                        Download

                        <IoMdCloudDownload className="" />
                    </button>

                </div>
            ))}
        </div>
    );
};

export default ExportedVideoPreviews