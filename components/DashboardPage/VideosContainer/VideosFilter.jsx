"use client"

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoFilter } from 'react-icons/io5'
import { FaArrowDownWideShort, FaArrowUpWideShort } from 'react-icons/fa6'
import { MdOutlinePhotoSizeSelectLarge, MdOutlinePhotoSizeSelectSmall } from 'react-icons/md'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast';

const VideosFilter = ({ userId, filterPage, setFilterPage, totalVideos, setTotalVideos, isFiltering, setIsFiltering, selectedFilter, setSelectedFilter, filteredVideos, setFilteredVideos, filteredVideoUrls, setFilteredVideoUrls, filteringFunction }) => {
    const limit = 12;
    const { toast } = useToast();

    const handleFilterChange = (filter) => {
        setFilterPage(1);
        setSelectedFilter(filter);
    };


    // const handleFilter = async (filter) => {
    //     try {
    //         switch (filter) {
    //             case 'LATEST':
    //                 console.log("filter : ", filter)
    //                 setFilterPage(1);
    //                 setSelectedFilter(filter)
    //                 filteringFunction(filter)
    //             case 'OLDEST':
    //                 setFilterPage(1);
    //                 setSelectedFilter(filter)
    //                 filteringFunction(filter)
    //             case 'SHORTEST':
    //                 console.log("filter : ", filter)

    //             case 'LONGEST':
    //                 console.log("filter : ", filter)

    //         }
    //     } catch (err) {
    //         console.log('err in video filtering : ', err);
    //     }
    // }


    return (
        <div className='mb-8 flex justify-end'>
            <div className='flex items-center gap-x-3'>
                {/* <p className='text-neutral-300 flex items-center gap-x-2'>
                    <IoFilter />
                    Filter:
                </p> */}

                <Select onValueChange={(value) => handleFilterChange(value)}>
                    <SelectTrigger className="w-[180px] text-neutral-300 border-t-0 border-r-0 border-l-0 border-b-2 border-gray-500/40 rounded-none">
                        <div className='flex items-center gap-x-2'>
                            <IoFilter />
                            <SelectValue className='' placeholder="Filter" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="LATEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <FaArrowUpWideShort /> */}

                                Latest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="OLDEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <FaArrowDownWideShort /> */}
                                Oldest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="SHORTEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <MdOutlinePhotoSizeSelectSmall /> */}
                                Shortest
                            </div>
                        </SelectItem>
                        <SelectItem className='' value="LONGEST">
                            <div className='flex items-center gap-x-2'>
                                {/* <MdOutlinePhotoSizeSelectLarge /> */}
                                Longest
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default VideosFilter