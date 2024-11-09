"use client"

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import ExportedVideoPreviews from '../ExportedVideoPreviews/ExportedVideoPreviews';
import { ImSpinner3 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { MdCloudUpload } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSegmenting, setIsSegmenting] = useState(false);
    const [isSegmentingCandidates, setIsSegmentingCandidates] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportedVideos, setExportedVideos] = useState([]);

    const uploadBtnRef = useRef(null);
    const fileInputRef = useRef(null);
    const router = useRouter();

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
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input value
        }
    };

    const sendVideoSegmentation = async (videoFilePath) => {
        setIsSegmenting(true);

        const formData = new FormData();
        formData.append("video_filepath", videoFilePath);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/video/segmentation", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("segment response:", response?.data);

            if (response?.data) {
                sendVideSegmentCandidates(response?.data);
            }
        } catch (error) {
            console.error("Error sending video filepath:", error);
        } finally {
            setIsSegmenting(false);
        }
    };

    const sendVideSegmentCandidates = async (segments) => {
        setIsSegmentingCandidates(true);

        const formData = new FormData();
        formData.append("segments", JSON.stringify(segments));

        try {
            const response = await axios.post("http://localhost:5000/api/v1/video/segment_candidates", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("segment candidate response:", response?.data);

            if (response?.data) {
                console.log('C:/Users/AB/Downloads/Bingo Game Plan.mp4 => ', response?.data);
                // const convertedData = convertTimestamps(response?.data);
                // console.log("converted data : ", convertedData)
                exportVideos('C:/Users/AB/Downloads/Bingo Game Plan.mp4', response?.data);
            }
        } catch (error) {
            console.error("Error sending video filepath:", error);
        } finally {
            setIsSegmentingCandidates(false);
        }
    };

    const exportVideos = async (video_filepath, candidates) => {
        setIsExporting(true);

        const formData = new FormData();
        formData.append("video_filepath", video_filepath);
        formData.append("candidates", JSON.stringify(candidates));

        try {
            const response = await axios.post("http://localhost:5000/api/v1/video/export", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("export response:", response?.data);
            console.log("exported paths : ", response?.data?.details?.paths);
            setExportedVideos(response?.data?.details?.paths)
        } catch (error) {
            console.error("Error sending video filepath:", error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("No file selected.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/video/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("response : ", response.data);
            if (response?.data) {
                // alert("File uploaded successfully!");
                console.log("sending this for video segmenting : ", response?.data?.details?.paths?.audio_location);

                // this is what it supposed to do, but for firebasee cors error we are hardcoding
                // sendVideoSegmentation(response?.data?.details?.paths?.audio_location);
                sendVideoSegmentation('C:/Users/AB/Downloads/Bingo Game Plan.mp4.mp3');
            } else {
                alert("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred during file upload.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <label
                htmlFor="dropzone-file"
                className="mt-8 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 relative"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and
                        drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Video files only
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {previewUrl && (
                    <div className="mt-4">
                        <video
                            src={previewUrl}
                            controls
                            className="w-full h-full rounded-lg shadow-lg absolute top-0 left-0"
                        />
                    </div>
                )}

            </label>



            <div className=''>
                {
                    (!isUploading && !isSegmenting && !isSegmentingCandidates && !isExporting) && (
                        <div className='flex items-center gap-x-4'>
                            <button
                                ref={uploadBtnRef}
                                onClick={handleUpload}
                                className="mt-4 mb-4 px-4 py-2 bg-[#4a2ac0] text-white rounded-lg hover:bg-[#392a6e] flex items-center gap-x-2 transition-all duration-300 ease-in-out"
                                disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting}
                            >
                                {/* {
                    isUploading ? "Uploading..." : (isSegmenting ? "Video Segmenting..." : (isSegmentingCandidates ? "Segmanting Video Candidates" : (isExporting ? "Exporting..." : "Upload Video")))
                } */}
                                <MdCloudUpload />
                                Upload Video
                            </button>

                            {
                                (selectedFile && previewUrl) && (
                                    <button
                                        onClick={() => handleClear()}
                                        className="mt-4 mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-x-2 transition-all duration-300 ease-in-out"
                                        disabled={isUploading || isSegmenting || isSegmentingCandidates || isExporting}
                                    >
                                        <RxCross1 />
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    )
                }

                {
                    (isUploading || isSegmenting || isSegmentingCandidates || isExporting) && (
                        <div className='w-full flex items-center justify-center'>
                            <div className='flex items-center gap-x-2'>
                                <ImSpinner3 className='animate-spin' />
                                <span>
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
                        </div>
                    )
                }
            </div>
            {/* <button onClick={() => sendVideoSegmentation()} className='mx-4 bg-gray-500/20 rounded-lg px-4 py-2'>
                {
                    isSegmenting ? "video segmenting" : "Make Video Segment"
                }
            </button> */}

            {
                exportedVideos?.length > 0 && (
                    <div>
                        <h3 className='text-3xl mt-4'>Your Generated Short Clips:</h3>

                        <div>
                            <ExportedVideoPreviews videoPaths={exportedVideos} />
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default UploadVideo