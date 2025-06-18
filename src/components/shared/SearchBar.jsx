import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResult(false);
        inputRef.current.value = "";
      }
    };

    if (showResult) {
      document.addEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResult]);

  return (
    <div
      ref={searchContainerRef}
      className="relative top-1/2 -translate-y-1/3 h-full"
    >
      <SearchInput
        inputRef={inputRef}
        setResult={setResult}
        setShowResult={setShowResult}
      />

      {showResult && result.length > 0 && <SearchResult result={result} />}
    </div>
  );
};
export default SearchBar;
