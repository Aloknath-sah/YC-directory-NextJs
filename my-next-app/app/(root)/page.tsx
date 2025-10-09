import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;
  const posts = [{
    _createdAt: Date.now(),
    views: 55,
    author: {
      _id: 1,
      name: "david",
      description: "This is description",
      image: "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740&q=80",
      category: "Robots",
      title: "We Robots"
    }
  }]
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
              posts.map((post: StartupCardType, index: number) => (<StartupCard key={post?._id} post={post} />))
            ) : (
              <p className="no-results">No Startups found</p>
            )
          }
        </ul>
      </section>
    </>
  );
}
