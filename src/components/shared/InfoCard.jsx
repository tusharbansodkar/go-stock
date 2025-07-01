import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { sharedSocket as socket } from "@/services/socketServices";

const InfoCard = ({ itemWidth, watchlist, SYMBOL_LOOKUP, TARGET_SCRIPS }) => {
  const [data, setData] = useState({});
  console.log(data);
  const payload = watchlist.map((item) => ({
    Exch: item.Exch,
    ExchType: item.ExchType,
    ScripCode: parseInt(item.ScripCode),
  }));

  useEffect(() => {
    socket.emit("subscribe", payload);

    const handleMarketData = (newData) => {
      const token = newData.Token;
      const symbolData = SYMBOL_LOOKUP.get(token);
      if (!symbolData) return;
      const { Name: symbol } = symbolData;
      const uniqueSymbol = `${symbol}-${newData.Exch}`;

      if (symbol && TARGET_SCRIPS.has(token)) {
        setData((prevData) => ({
          ...prevData,
          [uniqueSymbol]: newData,
        }));
      }
    };

    socket.on("marketData", handleMarketData);

    return () => {
      socket.off("marketData", handleMarketData);
    };
  }, [watchlist]);

  return (
    <>
      {Object.entries(data)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([symbol, stockData], index) => {
          let priceChange = (stockData.LastRate - stockData.PClose).toFixed(2);

          return (
            <div
              key={index}
              className={`leading-7 h-[180px] shadow-lg/25 rounded-md`}
              style={{ minWidth: `${itemWidth - 12}px` }}
            >
              <div className="flex justify-evenly items-center w-full h-[50%]">
                <p className="w-[50%] text-center font-bold text-2xl">
                  {symbol.split("-")[0]}
                </p>
                <div className="w-[50%] h-full">
                  <LineChart
                    Exch={stockData.Exch}
                    ExchType={stockData.ExchType}
                    ScripCode={stockData.Token}
                  />
                </div>
              </div>

              <div className="flex w-full justify-around ">
                <p className="text-gray-500">Price</p>
                <p
                  className={
                    priceChange > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {stockData.LastRate.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex w-full justify-around">
                <p className="text-gray-500">High</p>
                <p className="text-green-500">
                  {stockData.High.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="flex w-full justify-around">
                <p className="text-gray-500">Low</p>
                <p className="text-red-500">
                  {stockData.Low.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default InfoCard;
