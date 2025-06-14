import { Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { WATCHLIST_FEED_ITEM } from "@/data";
import { AuthContext } from "@/context";
import { sharedSocket as socket } from "@/services/socketServices";

const SYMBOL_LOOKUP = new Map(
  WATCHLIST_FEED_ITEM.map((item) => [item.ScripCode, item.symbol])
);

const TARGET_SCRIPS = new Set(
  WATCHLIST_FEED_ITEM.map((item) => item.ScripCode)
);

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const Watchlist = () => {
  const [data, setData] = useState({});
  const { searchInputRef } = useContext(AuthContext);

  const handleClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("watchlist connected");
      socket.emit("subscribe", WATCHLIST_FEED_ITEM);
    });

    socket.on("marketData", (newData) => {
      const token = newData.Token;
      // console.log("watchlist", newData);
      const symbol = SYMBOL_LOOKUP.get(token);

      if (symbol && TARGET_SCRIPS.has(token)) {
        setData((prevData) => ({
          ...prevData,
          [symbol]: newData,
        }));
      }
    });

    // Connect after setting up listeners
    socket.connect();

    return () => {
      socket.emit("unsubscribe", WATCHLIST_FEED_ITEM);
    };
  }, []);

  return (
    <div className="h-full p-4 flex flex-col overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl tracking-wide">My watchlist</h4>
        <button className="cursor-pointer" onClick={handleClick}>
          <Plus />
        </button>
      </div>
      <ul className="flex-grow">
        {Object.entries(data).map(([symbol, stockData], index) => {
          let priceChange = (stockData.LastRate - stockData.PClose).toFixed(2);
          let changePcnt = ((priceChange / stockData.PClose) * 100).toFixed(2);

          return (
            <li
              key={index}
              className="flex justify-between items-center tracking-tight border-b-2 border-gray-300 py-2"
            >
              <div className="w-[70%] truncate ">
                <p className="font-semibold text-sm">{symbol}</p>
                <p className="text-gray-800 w-fit rounded-xs text-xs p-1 bg-gray-200">
                  {exchangeMap[stockData.Exch]}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold ">
                  {stockData.LastRate.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p
                  className={
                    priceChange > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {changePcnt > 0 ? "+" + changePcnt : "" + changePcnt}%
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Watchlist;
