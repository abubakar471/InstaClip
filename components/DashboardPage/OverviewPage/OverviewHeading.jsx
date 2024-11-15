"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

const OverviewHeading = () => {
  const { user } = useUser();
  const [localStatus, setLocalStatus] = useState('');

  function getTimeOfDay() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      console.log("local time : ", "Morning")
      setLocalStatus("MORNING")
    } else if (hour >= 12 && hour < 17) {
      console.log("local time : ", "AFTERNOON")
      setLocalStatus("AFTERNOON")
    } else if (hour >= 17 && hour < 21) {
      console.log("local time : ", "EVENING")
      setLocalStatus("EVENING")
    } else {
      console.log("local time : ", "NIGHT")
      setLocalStatus("NIGHT")
    }
  }

  useEffect(() => {
    getTimeOfDay();
  }, [])

  return (
    <div>
      {
        user && (
          <h1 className='flex items-center flex-wrap gap-x-2 font-semibold bg-gradient-to-r bg-clip-text from-[#728ee9] via-purple-700 to-[#30a4da] text-transparent text-3xl md:text-4xl pt-6 pb-4 border-b border-[#162845]/50 '>
            <span className='text-neutral-300 leading-normal'>
              {
                localStatus === "MORNING" && (`Good Morning! Let's kickstart your day 🌅`)
              }
              {
                localStatus === "AFTERNOON" && (`Good Afternoon! Here&apos;s what&apos;s happening 🕶️`)
              }
              {
                localStatus === "EVENING" && (`Evening Overview: Here's what's left 📋`)
              }
              {
                localStatus === "NIGHT" && (`Late Night Hustle? Here's what's up 🌙`)
              }
            </span>
            {/* <span>{user?.firstName} {user?.lastName}</span>
            <span className='text-neutral-300'>!</span> */}
          </h1>
        )
      }
    </div>
  )
}

export default OverviewHeading