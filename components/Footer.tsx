import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="flex-center p-5">
        {currentYear} &copy;&#160;{" "}
        <Link href="/" className="mb-0.5 text-primary underline">
          {" "}
          {APP_NAME}
        </Link>
        &#160;&#124;&#160;All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
