import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="pink_container pattern">
      <h1 className="heading">PITCH YOUR STARTUP, CONNECT WITH ENTERPRENEURS</h1>
      <p className="sub-heading" >Submit Ideas, Vote on pitches, and Get Noticed in Virtual Competition.</p>
      <SearchForm/>
    </div>
  );
}
