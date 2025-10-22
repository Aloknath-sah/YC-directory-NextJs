import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/sanity.types'

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
                  <Link href={`/user/${author?._id}`} >
                    <Image src={author?.image!} alt="placeholder" width={48} height={48} className="rounded-full" />
                  </Link>
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

export default StartupCard