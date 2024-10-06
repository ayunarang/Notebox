"use client"
import Logo from '@/app/_components/Logo'
import { OrganizationSwitcher, UserButton, useAuth, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();

  return (
    <div className='flex justify-between items-center p-3
    shadow-sm'>
      <Logo />
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={'/dashboard'}
        afterCreateOrganizationUrl={'/dashboard'} />
      <UserButton />
    </div>
  )
}

export default Header