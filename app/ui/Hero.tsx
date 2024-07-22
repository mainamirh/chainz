import Button from "./common/Button";

const Hero = () => {
  return (
    <div className="flex flex-wrap text-base md:text-lg px-[5%]">
      <div className="flex flex-col gap-5 items-start">
        <h1 className="font-semibold text-4xl md:text-6xl">
          Crypto for Everyone
        </h1>
        <p className="">Find the best places to buy and sell crypto</p>
        <Button className="px-8 py-4">Get Started</Button>
      </div>
      <div></div>
    </div>
  );
};

export default Hero;
