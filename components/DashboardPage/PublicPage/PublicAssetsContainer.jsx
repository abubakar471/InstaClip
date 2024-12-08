"use client"

import { useUser } from '@clerk/nextjs';
import React from 'react'
import { assets } from '@/data/community_creations'
import ImportAssetModal from '../GeneratePage/UploadVideo/ImportAssetModal';

const PublicAssetsContainer = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-4 mt-6 mb-6'>
            {
                (assets?.length > 0 && isLoaded) ? assets?.map((item, index) => (
                    <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id} />
                )) : (
                    Array.from(new Array(18))?.map((item, i) => (
                        <div key={i} className='h-[350px] bg-[#0F1117] rounded-2xl'>
                        </div>
                    ))
                )
            }


        </div>
    )
}

export default PublicAssetsContainer