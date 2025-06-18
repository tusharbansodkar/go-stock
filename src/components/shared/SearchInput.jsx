import { Search, X } from "lucide-react";

const SearchInput = ({
  input,
  setResult,
  setShowResult,
  inputRef,
  handleChange,
  handleClose,
  showX,
}) => {
  return (
    <div>
      <div className="relative flex justify-around items-center w-90 shadow-md/20 rounded-md bg-gray-50">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search any stock or commodity"
          className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none border-none text-gray-600"
          onChange={handleChange}
          value={input}
        />
        {showX ? (
          <X
            size={20}
            className="absolute right-1 text-gray-400 cursor-pointer"
            onClick={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchInput;
