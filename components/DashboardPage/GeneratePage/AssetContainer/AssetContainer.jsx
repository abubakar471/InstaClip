"use client"

import React, { useState } from 'react'
import UploadVideo from '../UploadVideo/UploadVideo'

const AssetContainer = () => {
    const [videoUrl, setVideoUrl] = useState('');

    const sendVideoForSegmentation = async () => {
        const formData = new FormData();
        formData.append("video_filepath", videoUrl); // Pass the video URL to the backend

        try {
            const response = await fetch("http://localhost:5000/api/v1/video/segmentation", {
                method: "POST",
                body: formData,
            });

            console.log('response : ', response);

            if (response.ok) {
                const segments = await response.json();
                console.log("Segments:", segments);
                // Handle segments as needed (e.g., display them)
            } else {
                console.error("Failed to fetch segmentation data");
            }
        } catch (error) {
            console.error("Error during segmentation request:", error);
        }
    };


    return (
        <div>
            <UploadVideo />

            {/* <div>
                <input type='text' onChange={e => setVideoUrl(e.target.value)} placeholder='Video URL' className='w-full border rounded-lg p-2 indent-4 ring-0 focus:ring-0 outline-none' />
                <button onClick={() => sendVideoForSegmentation()} className='bg-blue-500 text-white rounded-lg px-4 py-2 mt-4'>
                    Segment
                </button>
            </div> */}
        </div>
    )
}

export default AssetContainer