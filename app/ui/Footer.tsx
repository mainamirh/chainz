import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center px-[4%] py-10 md:px-[3%]">
      <p className="text-center text-sm text-content/70">
        Built by
        <Link
          href="https://twitter.com/mainamirh"
          target="_blank"
          className="ml-1 underline underline-offset-2"
        >
          mainamirh
        </Link>
        . The source code is available on
        <Link
          href="https://github.com/mainamirh/chainz"
          target="_blank"
          className="ml-1 underline underline-offset-2"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
