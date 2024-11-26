"use client"

import React from 'react'
import ImportAssetModal from './ImportAssetModal'

const FeaturedAssets = () => {


    const assets = [
        {
            id: "p-2cdbb438-10f1-40d4-9774-982b73504f34",
            category: "minecraft",
            source: "FEATURED_ASSETS",
            title: "Minecraft Gaming -969 IQ | Hot shot | Brain Dead Moment",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/p-2cdbb438-10f1-40d4-9774-982b73504f34.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/p-478e616f-ed25-40a9-8ad9-4a56fa01d348.png`
        },
        {
            id: "p-13e5439d-4d6f-4318-9f46-2bbdad52e19f",
            category: "minecraft",
            source: "FEATURED_ASSETS",
            title: "Noob VS Pro | Funny Moments 101 | Caught live | 4k Live",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/p-13e5439d-4d6f-4318-9f46-2bbdad52e19f.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/p-cf525eee-03bd-4deb-a4ec-98d158be7911.jpg`
        },
        {
            id: "p-544e212f-7542-4332-acaa-5dcf3a68de37",
            category: "minecraft",
            source: "FEATURED_ASSETS",
            title: "How to build a indestructible house in minecraft | Watch live 2024",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/p-544e212f-7542-4332-acaa-5dcf3a68de37.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/p-6bb07356-be55-425d-851a-26fa12d37269.jpg`
        }
    ]

    return (
        <div className='grid grid-cols-3 gap-x-4 mt-6'>
            {
                assets?.map((item, index) => (
                    <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id} />
                ))
            }
        </div>
    )
}

export default FeaturedAssets