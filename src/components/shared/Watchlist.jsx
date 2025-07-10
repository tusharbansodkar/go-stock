import { Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context";
import { sharedSocket as socket } from "@/services/socketServices";
import { showToast } from "@/utils/toast";
import axios from "axios";
import "animate.css";

const exchangeMap = {
  N: "NSE",
  B: "BSE",
  M: "MCX",
};

const Watchlist = ({ watchlistData, setWatchlistData }) => {
  const {
    searchInputRef,
    fetchWatchlist,
    setSelectedStock,
    user: { watchlist },
  } = useContext(AuthContext);

  const SYMBOL_LOOKUP = new Map(
    watchlist.map((item) => [
      parseInt(item.ScripCode),
      { Name: item.Name, FullName: item.FullName, _id: item._id },
    ])
  );

  const TARGET_SCRIPS = new Set(
    watchlist.map((item) => parseInt(item.ScripCode))
  );

  const payload = watchlist.map((item) => ({
    Exch: item.Exch,
    ExchType: item.ExchType,
    ScripCode: parseInt(item.ScripCode),
  }));

  const handleClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const removeFromWatchlist = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/watchlist/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const keys = Object.keys(watchlistData);
        const newData = { ...watchlistData };
        keys.forEach((key) => {
          if (watchlistData[key]._id === _id) {
            delete newData[key];
          }
        });

        fetchWatchlist();
        setWatchlistData(newData);
        showToast.success("Removed from watchlist");
      }
    } catch (error) {
      showToast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (watchlist.length === 0) return;

    const handleConnect = () => {
      console.log("watchlist connected");
      socket.emit("subscribe", payload);
    };

    const handleMarketData = (newData) => {
      const token = newData.Token;
      const symbolData = SYMBOL_LOOKUP.get(token);

      if (!symbolData) return;
      const { Name: symbol, FullName, _id } = symbolData;
      const uniqueSymbol = `${symbol}-${newData.Exch}`;

      if (symbol && TARGET_SCRIPS.has(token)) {
        setWatchlistData((prevData) => ({
          ...prevData,
          [uniqueSymbol]: {
            ...newData,
            FullName,
            _id,
          },
        }));
      }
    };

    socket.on("connect", handleConnect);

    socket.on("marketData", handleMarketData);

    // Connect after setting up listeners
    if (socket.connected) {
      handleConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off("marketData", handleMarketData);
      socket.off("connect", handleConnect);
    };
  }, [watchlist]);

  return (
    <div className="h-full p-4 flex flex-col overflow-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-xl tracking-wide">My watchlist</h4>
        <button className="cursor-pointer" onClick={handleClick}>
          <Plus />
        </button>
      </div>
      <ul className="flex-grow">
        {Object.entries(watchlistData)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([symbol, stockData], index) => {
            let priceChange = (stockData.LastRate - stockData.PClose).toFixed(
              2
            );
            let changePcnt = ((priceChange / stockData.PClose) * 100).toFixed(
              2
            );

            return (
              <li
                key={index}
                className="flex justify-between items-center group tracking-tight border-b-2 border-gray-300 p-2 hover:bg-gray-100 animate__animated animate__fadeIn animate__faster"
              >
                <div
                  className="w-[50%] truncate cursor-pointer"
                  onClick={() => {
                    setSelectedStock(watchlistData[symbol]);
                  }}
                >
                  <p className="font-semibold text-sm">
                    {symbol.split("-")[0]}
                  </p>
                  <p className="text-gray-800 w-fit rounded-xs text-xs p-1 bg-gray-200">
                    {exchangeMap[stockData.Exch]}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 inline ml-2 cursor-pointer "
                  title="Remove from watchlist"
                >
                  <Trash2
                    className="text-red-500"
                    size={20}
                    onClick={() => removeFromWatchlist(stockData._id)}
                  />
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
