import { STARTUP_BY_ID_QUERY } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();
export const dynamic = 'force-dynamic';

const page = async ({ params }: { params: Promise<{id: string}> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, {id})
    if(!post) return notFound();
    console.log("post", post)
    const parsedContent = md.render(post?.pitch || '')

    return (
    <div>
        <section className='pink_container pattern' >
            <p className='tag'> {formatDate(post?._createdAt)} </p>
            <h1 className='heading'>{post.title} </h1>
            <p className='sub-heading'>{post.description} </p>
        </section>
        <section className='section_container'>
            <img src={post?.image} alt="thumbnail" className='w-full h-88 object-cover rounded-xl' />
            <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                <div className='flex justify-between items-center gap-5'>
                    <div>
                        <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                        <div className='w-16 h-16 overflow-hidden rounded-full'>
                            <Image src={post?.author?.image} alt="avatar" width={64} height={64} className='object-cover w-full h-full drop-shadow-lg' /> 
                        </div>
                    </Link>
                    <div>
                        <p className='text-20-medium'> {post?.author?.name} </p>
                        <p className='text-16-medium !text-black-300'> @{post?.author?.username} </p>
                    </div>
                </div>
                <p className='category-tag'>{post.category}</p>
                </div>
                <h3 className='text-30-bold'>Pitch Details</h3>
                    {
                        parsedContent ? (<article dangerouslySetInnerHTML={{ __html: parsedContent }} />) : (<p className='no-result' >No Details Provided</p>)
                    }
            </div>
            <hr className='divider' />

            <Suspense fallback={<Skeleton className='view_skeleton' />} >
                <View id={id} />
            </Suspense>

        </section>
        
    </div>
  )
}

export default page