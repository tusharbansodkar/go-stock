import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { sharedSocket as socket } from "@/services/socketServices";
import { WATCHLIST_FEED_ITEM } from "@/data";
import Watchlist from "./Watchlist";

const InfoCard = ({ marketData, itemWidth }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const SYMBOL_LOOKUP = new Map(
      WATCHLIST_FEED_ITEM.map((item) => [item.ScripCode, item.symbol])
    );

    const TARGET_SCRIPS = new Set(
      WATCHLIST_FEED_ITEM.map((item) => item.ScripCode)
    );

    socket.on("marketData", (newData) => {
      // console.log("info card", newData);
      const token = newData.Token;
      const symbol = SYMBOL_LOOKUP.get(token);

      if (symbol && TARGET_SCRIPS.has(token)) {
        setData((prevData) => ({
          ...prevData,
          [symbol]: newData,
        }));
      }
    });

    socket.connect();

    return () => {
      // socket.off();
    };
  }, [marketData]);

  return (
    <>
      {console.log(data)}
      {Object.entries(data).map(([symbol, stockData], index) => {
        let priceChange = (stockData.LastRate - stockData.PClose).toFixed(2);

        return (
          <div
            key={index}
            className={`leading-7 h-[180px] shadow-lg/25 rounded-md p-2`}
            style={{ minWidth: `${itemWidth - 12}px` }}
          >
            <div className="flex justify-evenly items-center  w-full h-[50%]">
              <p className="font-bold text-2xl">{symbol}</p>
              <div className="w-[50%] h-full">
                <LineChart />
              </div>
            </div>

            <div className="flex w-full justify-around ">
              <p className="text-gray-500">Price</p>
              <p
                className={priceChange > 0 ? "text-green-500" : "text-red-500"}
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
