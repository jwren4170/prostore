import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="border-b w-full">
      <div className="flex-between wrapper">
        <div className="flex-start">
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden lg:block ml-3 font-bold text-2xl">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
