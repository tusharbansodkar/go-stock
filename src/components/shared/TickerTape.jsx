import { useEffect, useState } from "react";
import { sharedSocket as socket } from "@/services/socketServices";
import { symbolLookup } from "@/utils/functions";
import "animate.css";

const TickerTape = ({ marketData }) => {
  const [data, setData] = useState({});

  const MARKET_FEED_ITEMS = marketData.slice(0, 3);

  const SYMBOL_LOOKUP = symbolLookup(MARKET_FEED_ITEMS);

  useEffect(() => {
    const handleMarketData = (newData) => {
      const token = newData.Token;
      const symbolData = SYMBOL_LOOKUP.get(token);

      if (!symbolData) return;
      const { symbol } = symbolData;

      if (symbol) {
        setData((prevData) => ({
          ...prevData,
          [symbol]: newData,
        }));
      }
    };

    socket.on("connect", () => {
      console.log("Socket connected, subscribing...");
      socket.emit("subscribe", MARKET_FEED_ITEMS);
    });

    socket.on("marketData", handleMarketData);

    // Connect after setting up listeners
    socket.connect();

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-around h-5 py-4 bg-gray-700 text-white animate__animated animate__fadeIn">
      {Object.entries(data).map(([symbol, stockData]) => {
        let priceChange = (stockData.LastRate - stockData.PClose).toFixed(2);
        let changePcnt = ((priceChange / stockData.PClose) * 100).toFixed(2);

        return (
          <div
            className="flex items-center text-sm md:text-base gap-x-2"
            key={symbol}
          >
            <span className="font-semibold">{symbol}</span>
            <span>{stockData.LastRate.toFixed(2)}</span>
            <span
              className={priceChange > 0 ? "text-green-500" : "text-red-500"}
            >
              {priceChange > 0 ? "+" + priceChange : "" + priceChange}
            </span>
            <span
              className={changePcnt > 0 ? "text-green-500" : "text-red-500"}
            >
              {changePcnt > 0 ? "+" + changePcnt : "" + changePcnt}%
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default TickerTape;
