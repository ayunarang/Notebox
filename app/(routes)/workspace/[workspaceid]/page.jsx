import React from 'react'
import SideNav from '../_components/SideNav'
import { Room } from '@/app/Room'
import Image from 'next/image'

function Workspace({ params }) {
  return (
    <div>
      <Room params={params}>
        <SideNav params={params} />
        <div className='md:ml-72 flex justify-center items-center h-screen'>
          <Image
            src={'/illustration.png'}
            width={450}
            height={450}
            alt='workspace'
            className="opacity-50"
          />
        </div>
      </Room>
    </div>
  )
}

export default Workspace
