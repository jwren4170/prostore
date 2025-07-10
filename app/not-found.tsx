"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen wrapper">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="shadow-md mt-4 p-6 rounded-lg w-full max-w-md text-center">
        <h1 className="mb-4 font-bold text-3xl">Not Found</h1>
        <p className="text-destructive text-2xl">
          Could not find requested page
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
