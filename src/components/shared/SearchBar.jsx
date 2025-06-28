import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import axios from "axios";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showX, setShowX] = useState(false);
  const [data, setData] = useState({});
  const [selectedItem, setSelectedItem] = useState(0);
  const searchContainerRef = useRef(null);
  const resultContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResult(false);
        setInput("");
        setShowX(false);
        setResult([]);
      }
    };

    if (showResult) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showResult]);

  useEffect(() => {
    if (resultContainerRef.current) {
      const listContainer = resultContainerRef.current.children[0];

      if (listContainer && listContainer.children[selectedItem]) {
        listContainer.children[selectedItem].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    let currentValue = e.target.value;
    setInput(currentValue);
    setShowResult(true);
    setShowX(true);
    setSelectedItem(0);

    if (currentValue.length > 2) {
      axios
        .get(`http://localhost:5000/api/search?string=${currentValue}`)
        .then((res) => {
          const data = res.data;
          console.log(data);
          setResult(data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    }
  };

  const handleClose = () => {
    setShowResult(false);
    setInput("");
    setShowX(false);
    setResult([]);
  };

  return (
    <div
      ref={searchContainerRef}
      className="relative top-1/2 -translate-y-1/3 h-full z-10"
    >
      <SearchInput
        input={input}
        setShowResult={setShowResult}
        handleChange={handleChange}
        handleClose={handleClose}
        showX={showX}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        data={data}
      />
      <div ref={resultContainerRef}>
        {showResult && (
          <SearchResult
            result={result}
            selectedItem={selectedItem}
            data={data}
            setData={setData}
          />
        )}
      </div>
    </div>
  );
};
export default SearchBar;
