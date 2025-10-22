
import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AuthButtons from './AuthButtons';

const Navbar = async () => {
    const session = await auth();
    console.log("session", session)
  return (
    <header className='p-5' >
        <nav className='flex justify-between items-center' >
            <Link href="/" >
                <Image src="/YC_Directory_m.png" alt="logo" width={75} height={10} />
            </Link>
            <div className='flex items-center gap-5 text-black'>
                <AuthButtons session={session} />
            </div>
        </nav>
    </header>
  )
}

export default Navbar