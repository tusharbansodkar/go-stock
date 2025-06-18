import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchInput = ({ setResult, setShowResult, inputRef }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    let currentValue = e.target.value;
    setInput(currentValue);

    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data;
      const result = data.filter((item) => {
        return item.name.toLowerCase().includes(currentValue.toLowerCase());
      });

      if (result.length > 0) {
        setShowResult(true);
      } else {
        setShowResult(false);
      }

      setResult(result);
    });
  };

  return (
    <div>
      <div className="relative flex justify-around items-center w-80 shadow-md/20 rounded-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search any stock or commodity"
          className="w-full h-10 pl-10 pr-4 border rounded-md focus:outline-none  focus:ring-blue-300 bg-gray-50 border-none text-gray-600"
          onChange={handleChange}
          value={input}
        />
      </div>
    </div>
  );
};

export default SearchInput;
