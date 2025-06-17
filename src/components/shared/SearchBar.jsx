import { useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SearchBar = () => {
  const [result, setResult] = useState([]);
  // const [showResult, setShowResult] = useState(false);

  return (
    <div className="relative top-1/2 -translate-y-1/3 h-full">
      <SearchInput setResult={setResult} />
      {/* <SearchResult result={result} /> */}
      {/* {showResult ? <SearchResult result={result} /> : null} */}
      {result.length > 0 ? <SearchResult result={result} /> : null}
    </div>
  );
};
export default SearchBar;
