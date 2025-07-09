import { ShoppingBasket } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { sharedSocket as socket } from "@/services/socketServices";
import { AuthContext } from "@/context";
import { showToast } from "@/utils/toast";
import axios from "axios";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const SearchResult = ({ result, selectedItem, data, setData }) => {
  const [selectedOption, setSelectedOption] = useState("All");
  const { fetchWatchlist } = useContext(AuthContext);
  const { setSelectedStock } = useContext(AuthContext);

  const payload = result.map(({ Exch, ExchType, ScripCode }) => {
    return {
      Exch,
      ExchType,
      ScripCode,
    };
  });

  const SYMBOL_LOOKUP = new Map(
    result.map((item) => [
      item.ScripCode,
      { Name: item.Name, FullName: item.FullName, _id: item._id },
    ])
  );

  const addToWatchlist = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/watchlist",
        {
          scripId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchWatchlist();
        showToast.success("Added to watchlist");
      }
    } catch (error) {
      showToast.error("Something went wrong");
    }
  };

  const handleClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (result.length === 0) return;

    setData({});

    const handleMarketData = (newData) => {
      const token = newData.Token.toString();
      const symbolData = SYMBOL_LOOKUP.get(token);

      if (!symbolData) return;

      const { Name: symbol, FullName: fullName, _id } = symbolData;
      const uniqueSymbol = `${symbol}-${newData.Exch}`;

      if (uniqueSymbol) {
        setData((prevData) => ({
          ...prevData,
          [uniqueSymbol]: {
            ...newData,
            FullName: fullName,
            _id,
          },
        }));
      }
    };

    socket.emit("subscribe", payload);
    socket.on("marketData", handleMarketData);

    return () => {
      socket.off("marketData", handleMarketData);
    };
  }, [result]);

  return (
    <div className="w-[150%] h-60 bg-gray-50 rounded-md mt-3 p-2 shadow-md/20 overflow-y-auto custom-scrollbar">
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
        Object.entries(data).map(([key, stockData], index) => {
          const [name, exch] = key.split("-");
          return (
            <div
              key={index}
              className={`flex justify-between items-center group hover:bg-gray-200 px-2 py-2 text-sm border-b-2 border-gray-300 ${
                selectedItem === index ? "bg-gray-200" : ""
              }`}
            >
              <div className="w-[50%]">
                <div
                  className="w-fit items-center cursor-pointer"
                  onClick={() => setSelectedStock(stockData)}
                >
                  <span>{name}</span>
                  <span className="text-gray-800 w-fit ml-1 rounded-xs text-xs py-0.5 px-1 bg-gray-300">
                    {exchangeMap[exch]}
                  </span>
                </div>
                <p className="truncate text-xs">{stockData.FullName}</p>
              </div>
              <span
                className="opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Add to watchlist"
              >
                <ShoppingBasket
                  className="text-green-500"
                  onClick={() => addToWatchlist(stockData._id)}
                />
              </span>
              <div className="w-[30%] text-right">
                <p className="font-semibold ">
                  {stockData.LastRate.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-green-500">
                  {stockData.ChgPcnt.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </p>
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
