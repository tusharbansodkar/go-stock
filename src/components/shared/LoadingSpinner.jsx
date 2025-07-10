import { LoaderPinwheel } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-svh w-full">
      <LoaderPinwheel className="animate-spin text-[#7C444F]" size={40} />
    </div>
  );
};
export default LoadingSpinner;
