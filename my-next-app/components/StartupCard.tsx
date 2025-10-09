import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const StartupCard = ({post}: {post: StartupTypeCard}) => {
  const { _createdAt, views, author } = post;
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
                  <Link href={`/startup/${author?._id}`}>
                    <h3 className='text-[26px] font-semibold truncate' >
                      {author?.title}
                    </h3>
                  </Link>
                  </div>
                  <Link href={`/user/${author?._id}`} >
                    <Image src="https://placehold.co/48x48" alt="placeholder" width={48} height={48} className="rounded-full" />
                  </Link>
              </div>
            <Link href={`/startup/${author?._id}`}>
                <p className='startup-card_desc'>
                  {author?.description}
                </p>
                <img src={author?.image} alt="placeholder" className='startup-card_img' />
            </Link>

            {/* footer */}
            <div className='flex justify-between gap-3 mt-5'>
                <Link href={`/?query=${author?.category.toLowerCase()}`} >
                  <p className='text-[16px] font-medium' >
                    {author?.category}
                  </p>
                </Link>
                <Button className='startup-card-btn' asChild>
                  <Link href={`/startup/${author?._id}`} >Details</Link>
                </Button>
            </div>
    </li>
  )
}

export default StartupCard