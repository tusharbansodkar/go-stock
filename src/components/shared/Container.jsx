import { useEffect, useState, useRef } from "react";
import LineChart from "./LineChart";
import axios from "axios";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import LoadingSpinner from "./LoadingSpinner";
import InfoCard from "./InfoCard";
import Watchlist from "./Watchlist";

const Container = ({ MARKET_FEED_ITEMS }) => {
  const payload = MARKET_FEED_ITEMS.map(({ Exch, ExchType, ScripCode }) => ({
    Exch,
    ExchType,
    ScripCode,
  }));

  const [marketData, setMarketData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const visibleCards = 4;

  // Define item width and gap for slide calculation
  let itemWidth = Math.ceil(containerWidth.toFixed(0) / visibleCards);
  const gap = 12; // Corresponds to gap-3 (0.75rem = 12px assuming 1rem = 16px)

  const showNext = () => {
    if (marketData.length === 0) return;

    setCurrentIndex((prevIndex) =>
      prevIndex === marketData.length - visibleCards ? prevIndex : prevIndex + 1
    );
  };

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const resizedObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizedObserver.observe(containerRef.current);

    axios
      .post("http://localhost:5000/api/market-data/market-feed", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMarketData(response.data);
      })
      .catch((error) => console.log("error fetching market data", error));

    return () => {
      resizedObserver.disconnect(containerRef.current);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] p-3 overflow-y-auto">
      <div className=" grid grid-cols-5 grid-rows-5 gap-4 overflow-auto">
        <div
          ref={containerRef}
          className="col-span-full row-span-2 rounded-md relative drop-shadow-sm/20 bg-white p-4 overflow-hidden"
        >
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {marketData.length === 0 ? (
              <div className="h-[200px] w-full">
                <LoadingSpinner />
              </div>
            ) : (
              <InfoCard marketData={marketData} itemWidth={itemWidth} />
            )}
          </div>
          <div className="absolute top-1/2 left-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonLeft handleClick={showPrevious} />
          </div>

          <div className="absolute top-1/2 right-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonRight handleClick={showNext} />
          </div>
        </div>

        <div className="bg-amber-600  col-span-3 row-span-3 rounded-md"></div>

        <div className="bg-amber-600  col-span-2  row-span-3 rounded-md">
          <Watchlist />
        </div>
      </div>
    </div>
  );
};

export default Container;
