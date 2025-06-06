import { ChevronRight } from "lucide-react";

const ButtonRight = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="p-1 hover:p-2 curson-pointer transition-all duration-200 ease-in-out cursor-pointer"
    >
      <ChevronRight />
    </button>
  );
};

export default ButtonRight;
