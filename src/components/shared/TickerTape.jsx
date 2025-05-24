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
    { Exch: "N", ExchType: "C", ScripCode: 999920008, Symbol: "NIFTYIT" },
    { Exch: "N", ExchType: "C", ScripCode: 999920041, Symbol: "FINNIFTY" },
  ];

  const TARGET_SCRIP_CODES = [
    999901, 999920000, 999920005, 999920008, 999920041,
  ];

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("subscribe", marketFeedData);
    });

    socket.on("marketData", (newData) => {
      const { Token } = newData;
      const Symbol = marketFeedData.find(
        (item) => item.ScripCode === Token
      )?.Symbol;

      if (TARGET_SCRIP_CODES.includes(Token)) {
        setData((prevData) => ({
          ...prevData,
          [Symbol]: newData,
        }));
      }
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className=" mt-4 py-2 ">
      <div className=" flex gap-5 justify-between  animate-scroll-left whitespace-nowrap ">
        {Object.entries(data)
          .concat(Object.entries(data))
          .map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center text-sm md:text-base gap-x-2"
              >
                <span className="font-semibold">{item[0]}</span>
                <span>{item[1].LastRate}</span>
                <span
                  className={
                    item[1].ChgPcnt > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {item[1].ChgPcnt}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TickerTape;
