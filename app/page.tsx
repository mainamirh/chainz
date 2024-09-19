import Button from "./ui/common/Button";
import Ranking from "./ui/home/Ranking";
import PriceConverter from "./ui/PriceConverter";

export default function Home() {
  return (
    <div className="px-[4%] py-[80px] md:py-[10%]">
      <div className="bg-gradient absolute inset-x-0 top-[80px] -z-10 h-[400px] opacity-50" />

      <div className="grid grid-cols-1 gap-10 px-[2%] text-base md:text-lg lg:grid-cols-12 lg:gap-7">
        <div className="flex flex-col items-start gap-4 text-sm md:text-base lg:col-span-7">
          <h1 className="text-3xl font-semibold md:text-5xl">
            Crypto for Everyone
          </h1>
          <p>Find the best places to buy and sell crypto</p>
          <Button className="px-6 py-3 md:px-8 md:py-4">Get Started</Button>
        </div>
        <div className="lg:col-span-5">
          <PriceConverter />
        </div>
      </div>
      <Ranking />
    </div>
  );
}
