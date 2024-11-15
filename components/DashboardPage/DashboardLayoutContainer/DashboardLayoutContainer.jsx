"use client"

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import React from 'react'

const DashboardLayoutContainer = ({children}) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
    return (
        <div>
           {state === "collapsed" && <SidebarTrigger className="hidden md:flex" />}
           {
            isMobile && <SidebarTrigger />
           }
            {children}
        </div>
    )
}

export default DashboardLayoutContainer