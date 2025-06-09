import { ChevronLeft } from "lucide-react";

const ButtonLeft = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-1 hover:p-2 curson-pointer transition-all duration-200 ease-in-out cursor-pointer "
    >
      <ChevronLeft />
    </button>
  );
};

export default ButtonLeft;
