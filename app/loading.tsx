import Image from "next/image";
import loader from "./loader.gif";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center w-auto h-auto">
      <Image src={loader} alt="Loading..." priority={true} />
    </div>
  );
};

export default LoadingPage;
