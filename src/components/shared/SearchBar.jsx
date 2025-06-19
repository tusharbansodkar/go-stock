import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import axios from "axios";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showX, setShowX] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResult(false);
        setInput("");
        setShowX(false);
      }
    };

    if (showResult) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showResult]);

  const handleChange = (e) => {
    let currentValue = e.target.value;
    setInput(currentValue);
    setShowX(true);

    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data;
      const result = data.filter((item) => {
        return item.name.toLowerCase().includes(currentValue.toLowerCase());
      });

      if (result.length > 0) {
        setShowResult(true);
      }

      setResult(result);
    });
  };

  const handleClose = () => {
    setShowResult(false);
    setInput("");
    setShowX(false);
  };

  return (
    <div
      ref={searchContainerRef}
      className="relative top-1/2 -translate-y-1/3 h-full z-10"
    >
      <SearchInput
        input={input}
        setResult={setResult}
        setShowResult={setShowResult}
        handleChange={handleChange}
        handleClose={handleClose}
        showX={showX}
      />
      {showResult && result.length > 0 && <SearchResult result={result} />}
    </div>
  );
};
export default SearchBar;
