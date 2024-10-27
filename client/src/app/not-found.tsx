import React from "react";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen ">
      <div className="h-full w-1/2 flex justify-center items-center">
        <Image src="/assets/images/404.png" alt="" width={500} height={500} />
      </div>
      <div className="h-full w-1/2 flex flex-col justify-center items-center gap-y-4">
        <h2 className="text-3xl">
          <span className="text-appcolor">404</span> | Not Found Page
        </h2>
        <Button>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
