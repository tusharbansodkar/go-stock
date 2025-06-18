import React from "react";

const SearchResult = ({ result, setShowResult }) => {
  return (
    <div className="absolute w-[150%] h-50 bg-gray-50 rounded-md mt-3 p-3 z-10 shadow-md/20 overflow-y-auto ">
      {console.log(result)}
      {result.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};

export default SearchResult;
