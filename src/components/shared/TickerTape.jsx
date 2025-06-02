import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const MARKET_FEED_ITEMS = [
  { Exch: "B", ExchType: "C", ScripCode: 999901, Symbol: "SENSEX" },
  { Exch: "N", ExchType: "C", ScripCode: 999920000, Symbol: "NIFTY" },
  { Exch: "N", ExchType: "C", ScripCode: 999920005, Symbol: "BANKNIFTY" },
];

const TARGET_SCRIPS = new Set(MARKET_FEED_ITEMS.map(item => item.ScripCode));

const SYMBOL_LOOKUP = new Map(MARKET_FEED_ITEMS.map(item => [item.ScripCode, item.Symbol]));

const TickerTape = () => {
  const [data, setData] = useState({});

  useEffect(() => {

    const handleMarketData = (newData) => {
      const token = newData.Token;
      const symbol = SYMBOL_LOOKUP.get(token);

      if(symbol && TARGET_SCRIPS.has(token)) {
        setData(prevData => ({
          ...prevData,
          [symbol]: newData,
        }));
      }
    }

    socket.on('connect', () => {
      console.log('Socket connected, subscribing...')
      socket.emit("subscribe", MARKET_FEED_ITEMS);
    })

    socket.on("marketData", handleMarketData);

    // Connect after setting up listeners
    socket.connect();

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-around py-2 bg-gray-700 text-white">

      {Object.entries(data)
        .map(([symbol, stockData]) => {
          let priceChange = (stockData.LastRate - stockData.PClose).toFixed(2);
          let changePcnt = (priceChange / stockData.PClose * 100).toFixed(2);

          return (
            <div
              className="flex items-center text-sm md:text-base gap-x-2"
              key={symbol}
            >
              <span className="font-semibold">{symbol}</span>
              <span>{(stockData.LastRate).toFixed(2)}</span>
              <span className={
                priceChange > 0 ? "text-green-500" : "text-red-500"
              }>
                {priceChange > 0 ? "+" + priceChange : "" + priceChange}
              </span>
              <span
                className={
                  changePcnt > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {(changePcnt > 0 ? '+' + changePcnt : '' + changePcnt)}%
              </span>
            </div>
          );
        })}
    </div>
  );
};
export default TickerTape;
