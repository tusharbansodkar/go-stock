import { Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context";
import { sharedSocket as socket } from "@/services/socketServices";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const Watchlist = ({ WATCHLIST_FEED_ITEM, SYMBOL_LOOKUP, TARGET_SCRIPS }) => {
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
  }, [TARGET_SCRIPS]);

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
              className="flex justify-between items-center group tracking-tight border-b-2 border-gray-300 p-2 hover:bg-gray-100"
            >
              <div className="w-[40%] truncate">
                <p className="font-semibold text-sm">{symbol}</p>
                <p className="text-gray-800 w-fit rounded-xs text-xs p-1 bg-gray-200">
                  {exchangeMap[stockData.Exch]}
                </p>
              </div>
              <span
                className="opacity-0 group-hover:opacity-100 inline ml-2 cursor-pointer"
                title="Remove from watchlist"
              >
                <Trash2 className="text-red-500" size={20} />
              </span>
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
