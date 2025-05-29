import { TargetIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const TickerTape = () => {
  const [data, setData] = useState({});
  const marketFeedData = [
    { Exch: "B", ExchType: "C", ScripCode: 999901, Symbol: "SENSEX" },
    { Exch: "N", ExchType: "C", ScripCode: 999920000, Symbol: "NIFTY" },
    { Exch: "N", ExchType: "C", ScripCode: 999920005, Symbol: "BANKNIFTY" },
  ];

  const TARGET_SCRIP_CODES = [
    999901, 999920000, 999920005
  ];

  useEffect(() => {
    socket.connect();

    // socket.on("connect", () => {
    //   socket.emit("subscribe", marketFeedData);
    // });

    socket.on("marketData", (newData) => {
      
      const {Token} = newData;

      const symbol = marketFeedData.find(item => item.ScripCode === Token)?.Symbol;

        if (TARGET_SCRIP_CODES.includes(Token)) {
          setData(prevData => {
            return {
              ...prevData,
              [symbol]: newData,
            };
          })
        }
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-around py-2 bg-gray-700 text-white">
      {/* <div className="  gap-5  whitespace-nowrap "> */}
        
        {Object.entries(data)
          .map(([key, data]) => {
            let change = Number(data.LastRate - data.PClose).toFixed(2);
            let changePcnt = Number(change/ data.PClose * 100).toFixed(2);
        
            return (
              <div
                // key={idx}
                className="flex items-center text-sm md:text-base gap-x-2"
              >
                <span className="font-semibold">{key}</span>
                <span>{Number(data.LastRate).toFixed(2)}</span>
                <span className={
                    change > 0 ? "text-green-500" : "text-red-500"
                  }>
                 {change > 0 ? "+" + change : "-" + change}
                </span>
                <span
                  className={
                    changePcnt > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {(changePcnt > 0 ? '+' + changePcnt : '-' + changePcnt)}%
                 
                </span>
              </div>
            );
          })}
      {/* </div> */}
    </div>
  );
};
export default TickerTape;
