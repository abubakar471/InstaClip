'use cache'

import OverviewHeading from '@/components/DashboardPage/OverviewPage/OverviewHeading'
import OverviewStats from '@/components/DashboardPage/OverviewPage/OverviewStats'
import RecentCreatedVideos from '@/components/DashboardPage/RecentCreatedVideos/RecentCreatedVideos'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const DashboardPage = async () => {
  const { userId } = await auth();

  return (
    <div>
      <OverviewHeading />
      <OverviewStats />
     

    </div>
  )
}

export default DashboardPage