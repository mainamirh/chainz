import Hero from "./ui/Hero";
import Ranking from "./ui/home/Ranking";

export default function Home() {
  return (
    <div className="px-[4%] py-[10%]">
      <div className="bg-gradient absolute inset-x-0 top-[80px] -z-10 h-[400px] opacity-50" />
      <Hero />
      <Ranking />
    </div>
  );
}
