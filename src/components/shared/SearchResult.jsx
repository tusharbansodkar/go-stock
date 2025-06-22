import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { sharedSocket as socket } from "@/services/socketServices";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const SearchResult = ({ result }) => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [data, setData] = useState({});
  const SYMBOL_LOOKUP = new Map(
    result.map((item) => [item.ScripCode, item.Name])
  );

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (result.length > 0) {
      const payload = result.map(({ Exch, ExchType, ScripCode }) => {
        return {
          Exch,
          ExchType,
          ScripCode,
        };
      });

      console.log(payload);

      socket.on("connect", () => {
        console.log("getting results");
        // socket.emit("subscribe", payload);
      });

      socket.connect();
    }
  }, [result]);

  return (
    <div className=" w-[150%] h-60 bg-gray-50 rounded-md mt-3 p-2 shadow-md/20 overflow-y-auto custom-scrollbar">
      {/* {console.log(data)} */}
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

      {result.length > 0 ? (
        result.map((item) => {
          return (
            <div className="flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300">
              <div>
                <div className=" items-center">
                  <span>{item.Name}</span>
                  <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
                    {exchangeMap[item.Exch]}
                  </span>
                </div>
                <p className="truncate text-xs">{item.FullName}</p>
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
          );
        })
      ) : (
        <div className="h-full relative">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500">
            No results found...
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
