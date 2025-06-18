import axios from "axios";
import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchInput = ({ setResult, setShowResult, inputRef }) => {
  const [input, setInput] = useState("");
  const [showX, setShowX] = useState(false);

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
    inputRef.current.blur();
  };

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
