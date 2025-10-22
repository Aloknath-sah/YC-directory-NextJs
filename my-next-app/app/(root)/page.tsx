import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/lib/queries";

import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log("sessionId", session?.id)
  const {data: posts} = await sanityFetch({ query: STARTUPS_QUERY, params, options: { 
    useCdn: false // always fetch fresh data from Sanity
  } } )
  console.log(JSON.stringify(posts, null, 2))
  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">PITCH YOUR STARTUP, CONNECT WITH ENTERPRENEURS</h1>
        <p className="sub-heading" >Submit Ideas, Vote on pitches, and Get Noticed in Virtual Competition.</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `search results for ${query}`: 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {
            posts?.length > 0 ? (
              posts.map((post: StartupTypeCard, index: number) => (<StartupCard key={post?._id} post={post} />))
            ) : (
              <p className="no-results">No Startups found</p>
            )
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
