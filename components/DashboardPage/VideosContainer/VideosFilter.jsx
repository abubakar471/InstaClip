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

const VideosFilter = () => {
    const [selected, setSelected] = useState('');

    useEffect(() => {
        console.log("selected filter : ", selected)
    }, [selected])

    return (
        <div className='mb-8 flex justify-end'>
            <div className='flex items-center gap-x-3'>
                {/* <p className='text-neutral-300 flex items-center gap-x-2'>
                    <IoFilter />
                    Filter:
                </p> */}

                <Select onValueChange={(value) => setSelected(value)}>
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