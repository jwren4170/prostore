import Image from "next/image";
import loader from "./loader.gif";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Image
        src={loader}
        height={150}
        width={150}
        alt="Loading..."
        priority={true}
      />
    </div>
  );
};

export default LoadingPage;
