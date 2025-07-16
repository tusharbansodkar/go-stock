import { AuthContext } from "@/context";
import { Search, X } from "lucide-react";
import { useContext, useEffect } from "react";

const SearchInput = ({
  input,
  setShowResult,
  handleChange,
  handleClose,
  showX,
  selectedItem,
  setSelectedItem,
  data,
}) => {
  const { searchInputRef } = useContext(AuthContext);
  const keys = Object.keys(data);
  const resultCount = keys.length;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }

    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem(selectedItem - 1);
    } else if (e.key === "ArrowDown" && selectedItem < resultCount - 1) {
      setSelectedItem(selectedItem + 1);
    } else if (e.key === "Enter") {
      console.log(data[keys[selectedItem]]);
    }
  };

  return (
    <div>
      <div className="relative flex justify-around items-center w-90 shadow-md/20 rounded-md bg-gray-50 dark:bg-gray-600 dark:ring-1 dark:ring-gray-400">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800 dark:text-amber-600" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search any stock or commodity"
          className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none border-none text-gray-600 dark:text-gray-300"
          onChange={handleChange}
          onFocus={() => setShowResult(true)}
          value={input}
          onKeyDown={handleKeyDown}
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
