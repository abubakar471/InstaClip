import React from 'react'
import ImportAssetModal from './ImportAssetModal'

const PublicLibraryAssets = () => {


    const assets = [
        {
            id: "p-df9f9e0f-a3b1-4d0a-92b7-6c655a85bd9f",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "TENZ teach a way to play good in valorant",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/1.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/1.jpg`
        },
        {
            id: "p-31853b92-1fa8-409c-a552-0ece4f2c939f",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Encounter with a smurf reyna",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/2.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/2.jpg`
        },
        {
            id: "p-f28d1faa-5d49-4d73-a865-9b63f8498765",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Sunset Map new changes | Lighting is just perfect now",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/3.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/3.jpg`
        },
        {
            id: "p-ca1bc359-0d7f-4503-80eb-56748d7c8560",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Valorant has a problem",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/4.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/4.jpg`
        },
        {
            id: "p-38085d61-120a-4664-aef6-36715f9e1b12",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Who clutches here?",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/5.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/5.jpg`
        },
        {
            id: "p-5fbc343d-75e2-48b6-9a27-c520be9e482d",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Pulled this variants out of the drafts",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/6.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/6.jpg`
        },
        {
            id: "p-847614dd-93d9-4b52-ae19-a10f2343d1d5",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "This is why valorant is a horror game",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/7.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/7.jpg`
        },
        {
            id: "p-488b55c8-d18f-490e-927a-11ebd754c57b",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Bro is cooked for this game",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/8.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/8.jpg`
        },
        {
            id: "p-36d3c912-f476-4ec3-bc1f-09202c8a47a6",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "IShowSpeed Minecraft chase",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/9.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/9.jpg`
        },
        {
            id: "p-36f1a3ed-3961-4293-a3a4-f839ad3da5dd",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "I found temple of notch",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/10.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/10.jpg`
        },
        {
            id: "p-5109709e-ac84-4db3-98ff-a9e99b1cced1",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Minecraft Meme",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/11.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/11.jpg`
        },
        {
            id: "p-544e212f-7542-4332-acaa-5dcf3a68de37",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Minecraft Oddly Satisfying",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/12.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/12.jpg`
        },
        {
            id: "p-151c0ea9-bcdc-4f2e-ae4a-d536ba5ac5f0",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "Would you win?",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/13.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/13.jpg`
        },
        {
            id: "p-407400dd-bfef-477a-99d1-1de06cbf0911",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "The Architect",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/14.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/14.jpg`
        },
        {
            id: "p-254b081c-63b2-45b1-813b-4514adfe85a4",
            category: "minecraft",
            source: "PUBLIC_ASSETS",
            title: "In hardcore playing 14 hours",
            url: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/public/15.mp4`,
            cover: `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads/covers/15.jpg`
        },

    ]

    return (
        <div className='grid grid-rows-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2 mt-6'>
            {
                assets?.map((item, index) => (
                    <ImportAssetModal key={index} title={item?.title} url={item?.url} cover={item?.cover} category={item?.category} source={item?.source} id={item?.id}
                        className={`
                            ${index === 0 && "h-full row-span-1 xl:row-span-3"} 
                            ${index === 1 && "h-full row-span-1 xl:row-span-2"} 
                            ${index === 2 && "h-full row-span-1 xl:row-span-3"} 
                            ${index === 3 && "h-full row-span-1 xl:row-span-1"}
                            ${index === 4 && "h-full row-span-1 xl:row-span-4"}
                            ${index === 5 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 6 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 7 && "h-full row-span-1 xl:row-span-1"}  
                            ${index === 8 && "h-full col-span-1 xl:col-span-2"}  
                            ${index === 9 && "h-full row-span-1 xl:row-span-1"}  
                            ${index === 10 && "h-full row-span-1 xl:row-span-2"}  
                            ${index === 11 && "h-full col-span-1 xl:col-span-2"}  
                            ${index === 11 && "h-full col-span-1 xl:col-span-2"}  
                            `} />
                ))
            }
        </div>
    )
}

export default PublicLibraryAssets