"use client";

import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src="/images/logo2.svg"
        alt="logo"
        className="hidden md:block cursor-pointer"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
