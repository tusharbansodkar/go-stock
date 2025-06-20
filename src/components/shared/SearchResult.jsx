import { ShoppingBasket } from "lucide-react";
import { useState } from "react";

const SearchResult = ({ setShowResult }) => {
  const [selectedOption, setSelectedOption] = useState("All");

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className=" w-[150%] h-60 bg-gray-50 rounded-md mt-3 p-2 shadow-md/20 overflow-y-auto custom-scrollbar">
      {/* {console.log(result)}
      {result.map((item) => (
        <p>{item.name}</p>
      ))} */}
      <div className="grid grid-cols-3 border-b-2 border-gray-300 pb-2 text-gray-500 text-center text-md">
        <p
          className={`border-r-2 border-gray-300 cursor-pointer ${
            selectedOption === "All" ? "text-amber-800" : ""
          }`}
          onClick={() => handleClick("All")}
        >
          All
        </p>
        <p
          className={`border-r-2 border-gray-300 cursor-pointer ${
            selectedOption === "Equity" ? "text-amber-800" : ""
          }`}
          onClick={() => handleClick("Equity")}
        >
          Equity
        </p>
        <p
          className={`cursor-pointer ${
            selectedOption === "Commodity" ? "text-amber-800" : ""
          }`}
          onClick={() => handleClick("Commodity")}
        >
          Commodity
        </p>
      </div>

      <div className="flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300">
        <div>
          <div className=" items-center">
            <span>ADANIENT</span>
            <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
              NSE
            </span>
          </div>
          <p>Adani India Pvt Ltd</p>
        </div>
        <span
          className="opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Add to watchlist"
        >
          <ShoppingBasket className="text-green-500" />
        </span>
        <div className="text-right">
          <p className="font-semibold ">2,448.40</p>
          <p className="text-green-500">2.25%</p>
        </div>
      </div>

      <div className="flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300">
        <div>
          <div className=" items-center">
            <span>ADANIENT</span>
            <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
              NSE
            </span>
          </div>
          <p>Adani India Pvt Ltd</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
          <ShoppingBasket className="text-green-500" />
        </span>
        <div className="text-right">
          <p className="font-semibold ">2,448.40</p>
          <p className="text-green-500">2.25%</p>
        </div>
      </div>
      <div className="flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300">
        <div>
          <div className=" items-center">
            <span>ADANIENT</span>
            <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
              NSE
            </span>
          </div>
          <p>Adani India Pvt Ltd</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
          <ShoppingBasket className="text-green-500" />
        </span>
        <div className="text-right">
          <p className="font-semibold ">2,448.40</p>
          <p className="text-green-500">2.25%</p>
        </div>
      </div>
      <div className="flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300">
        <div>
          <div className=" items-center">
            <span>ADANIENT</span>
            <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
              NSE
            </span>
          </div>
          <p>Adani India Pvt Ltd</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 cursor-pointer">
          <ShoppingBasket className="text-green-500" />
        </span>
        <div className="text-right">
          <p className="font-semibold ">2,448.40</p>
          <p className="text-green-500">2.25%</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
