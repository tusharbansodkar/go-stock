import { useEffect, useState, useRef, useContext } from "react";
import ButtonRight from "./ButtonRight";
import ButtonLeft from "./ButtonLeft";
import LoadingSpinner from "./LoadingSpinner";
import InfoCard from "./InfoCard";
import Watchlist from "./Watchlist";
import CandlestickChart from "./CandlestickChart";
import { AuthContext } from "@/context";

const Container = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [watchlistData, setWatchlistData] = useState({});
  const [watchlistKeys, setWatchlistKeys] = useState([]);
  const { selectedStock, setSelectedStock } = useContext(AuthContext);
  const containerRef = useRef(null);
  const visibleCards = 3;

  // Define item width and gap for slide calculation
  let itemWidth = Math.ceil(containerWidth / visibleCards);
  const gap = 12; // Corresponds to gap-3 (0.75rem = 12px assuming 1rem = 16px)

  const showNext = () => {
    if (watchlistKeys.length <= visibleCards) return;

    setCurrentIndex((prevIndex) =>
      prevIndex === watchlistKeys.length - visibleCards
        ? prevIndex
        : prevIndex + 1
    );
  };

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  useEffect(() => {
    setWatchlistKeys(Object.keys(watchlistData));
  }, [watchlistData]);

  useEffect(() => {
    const resizedObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizedObserver.observe(containerRef.current);
    return () => {
      resizedObserver.disconnect(containerRef.current);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] p-3 overflow-y-auto">
      <div className=" grid grid-cols-3 gap-4 overflow-auto">
        <div
          ref={containerRef}
          className="col-span-full rounded-md relative drop-shadow-sm/20 bg-white p-4 overflow-hidden"
        >
          <div
            className="flex gap-3 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {/* {loading ? (
              <div className="h-[150px] w-full">
                <LoadingSpinner />
              </div>
            ) : (
              
            )} */}
            <InfoCard
              itemWidth={itemWidth}
              watchlistData={watchlistData}
              setSelectedStock={setSelectedStock}
            />
          </div>
          <div className="absolute top-1/2 left-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonLeft handleClick={showPrevious} />
          </div>

          <div className="absolute top-1/2 right-0 bg-gray-300 hover:bg-gray-400 text-white tranform -translate-y-1/2 rounded-sm">
            <ButtonRight handleClick={showNext} />
          </div>
        </div>

        <div className="drop-shadow-sm/30 h-100 bg-white col-span-2 rounded-md">
          {selectedStock ? (
            <CandlestickChart selectedStock={selectedStock} />
          ) : null}
        </div>

        <div className="drop-shadow-sm/30 h-100 bg-white col-span-1 rounded-md overflow-hidden">
          <Watchlist
            watchlistData={watchlistData}
            setWatchlistData={setWatchlistData}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
