import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav className='flex justify-between items-center' >
            <Link href="/" >
                <Image src="/next.svg" alt="logo" width={144} height={30} />
            </Link>
        </nav>
    </header>
  )
}

export default Navbar