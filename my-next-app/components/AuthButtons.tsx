'use client';

import { BadgePlus, LogOut } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function AuthButtons({ session }: { session: any }) {
    if (session?.user) {
        return (
            <>
                <Link href="/startup/create">
                    <span className="max-sm:hidden">Create</span>
                    <BadgePlus className="size-6 sm:hidden" />
                </Link>
                <button onClick={() => signOut()} className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
                <Link href={`/user/${session.id}`}>
                    <Avatar className="size-10">
                    <AvatarImage
                        src={session?.user?.image || ""}
                        alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    
                </Link>
            </>
        );
    }

    return (
        <button onClick={() => signIn('github')} className="cursor-pointer hover:text-primary transition">
            <span>Login</span>
        </button>
    );
}
