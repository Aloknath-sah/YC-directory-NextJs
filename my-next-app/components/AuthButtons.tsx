'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthButtons({ session }: { session: any }) {
    if (session?.user) {
        return (
            <>
                <Link href="/startup/create">
                    <span>Create</span>
                </Link>
                <button onClick={() => signOut()}>
                    <span>Logout</span>
                </button>
                <Link href={`/user/${session.id}`}>
                    <span>{session.user.name}</span>
                </Link>
            </>
        );
    }

    return (
        <button onClick={() => signIn('github')}>
            <span>Login</span>
        </button>
    );
}
