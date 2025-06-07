import { LoaderPinwheel } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className=" flex items-center justify-center h-full w-full">
      <LoaderPinwheel className="animate-spin text-[#7C444F]" size={40} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default LoadingSpinner;
