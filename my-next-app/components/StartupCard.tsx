import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/sanity.types'
import { Skeleton } from './ui/skeleton'

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author}

const StartupCard = ({post}: {post: StartupTypeCard}) => {
  const {  _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description } = post;
  console.log("post", post)
  return (
    <li className='startup-card group' >
        <div className='flex justify-between items-center'>
            <p className='startup_card_date'>
                {
                    formatDate(_createdAt)
                }
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary' />
                <span>{views} </span>
            </div>
          </div>
          <div className='flex justify-between mt-5 gap-5'>
                <div className='flex-1'>
                  <Link href={`/user/${author?._id}`}>
                    <p className='text-[16px] font-medium truncate' >
                      {author?.name}
                    </p>
                  </Link>
                  <Link href={`/startup/${_id}`}>
                    <h3 className='text-[26px] font-semibold truncate' >
                      {title}
                    </h3>
                  </Link>
                  </div>
                   {author?.image && author.image.trim() !== "" ? (
                    <Link href={`/user/${author._id}`}>
                      <Image
                        src={author.image}
                        alt={author.name || "avatar"}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </Link>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">?</span>
                    </div>
                  )}
              </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>
                  {description}
                </p>
                <img src={image} alt="placeholder" className='startup-card_img' />
            </Link>

            {/* footer */}
            <div className='flex justify-between gap-3 mt-5'>
                <Link href={`/?query=${category.toLowerCase()}`} >
                  <p className='text-[16px] font-medium' >
                    {category}
                  </p>
                </Link>
                <Button className='startup-card-btn' asChild>
                  <Link href={`/startup/${_id}`} >Details</Link>
                </Button>
            </div>
    </li>
  )
}
export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard