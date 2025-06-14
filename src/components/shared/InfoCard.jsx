import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { sharedSocket as socket } from "@/services/socketServices";

const InfoCard = ({ marketData, itemWidth }) => {
  const [data, setData] = useState({});

  // console.log(TARGET_SCRIPS);

  useEffect(() => {
    const SYMBOL_LOOKUP = new Map(
      marketData.map((item) => [item.Token, item.Symbol])
    );

    const TARGET_SCRIPS = new Set(marketData.map((item) => item.Token));

    socket.on("marketData", (newData) => {
      console.log("info card", newData);
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
      {marketData.map((item, index) => (
        <div
          key={index}
          className={`leading-7 h-[180px] shadow-lg/25 rounded-md p-2`}
          style={{ minWidth: `${itemWidth - 12}px` }}
        >
          <div className="flex justify-evenly items-center  w-full h-[50%]">
            <p className="font-bold text-2xl">{item.Symbol}</p>
            <div className="w-[50%] h-full">
              <LineChart />
            </div>
          </div>

          <div className="flex w-full justify-around ">
            <p className="text-gray-500">Price</p>
            <p className="text-red-500">
              {item.LastRate.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex w-full justify-around">
            <p className="text-gray-500">High</p>
            <p className="text-green-500">
              {item.High.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex w-full justify-around">
            <p className="text-gray-500">Low</p>
            <p className="text-red-500">
              {item.Low.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default InfoCard;
