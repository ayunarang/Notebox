import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/dashboard'} className='flex items-center gap-2'>
        <Image src={'/logo.png'} alt='logo'
        width={60} height={60} 
        />
        <h2 className='font-bold text-xl hidden md:block sm:block'>Notebox</h2>
    </Link>
  )
}

export default Logo